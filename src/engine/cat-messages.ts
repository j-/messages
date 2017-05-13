import { db } from '../connection';

import {
	IActionCatMessages,
} from '../actions';

import {
	IMessage,
} from '../message';

/**
 * Fetches all messages that belong to nodes which are concatenated by the
 * CatNode IDs provided.
 */
export async function executeCatMessages (action: IActionCatMessages): Promise<IMessage[]> {
	// Query DB
	const rows: IMessage[] = await db('message')
		.join('node_messages', 'message.id', '=', 'node_messages.message_id')
		.join('node_cat', 'node_cat.input_node_id', '=', 'node_messages.node_id')
		.where('node_cat.output_node_id', 'in', action.nodeIds)
		.orderBy('message.date_created', 'desc')
		.orderBy('message.timestamp', 'desc')
		.groupByRaw('ifnull(message.tag, message.id)')
		.distinct('message.id')
		.select([
			'message.id',
			'message.title',
			'message.body',
			'message.tag',
			'message.icon',
			'message.data',
			'message.url',
			'message.timestamp',
		])
		.min('message.date_created as dateCreated')
		.max('message.date_created as dateModified');
	// Deserialize JSON data
	return rows.map((row) => ({
		...row,
		data: JSON.parse(<string>row.data),
		// Can do this in a raw query but would complicate the above
		// when written using the query builder
		dateModified: row.dateModified === row.dateCreated ? null : row.dateModified,
	}));
}
