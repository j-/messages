import { db } from '../connection';

import {
	IActionCatMessages,
} from '../actions';

import {
	IMessage,
} from '../message';

import { executeExpandNodes } from './expand-nodes';

/**
 * Fetches all messages that belong to nodes which are concatenated by the
 * CatNode IDs provided.
 */
export async function executeCatMessages (action: IActionCatMessages): Promise<IMessage[]> {
	const nodeIds = await executeExpandNodes({
		type: 'ExpandNodes',
		nodeIds: action.nodeIds,
	});
	// Query DB
	const rows: IMessage[] = await db('message')
		.join('node_messages', 'message.id', '=', 'node_messages.message_id')
		.join('node_cat', 'node_cat.input_node_id', '=', 'node_messages.node_id')
		.where('node_cat.output_node_id', 'in', nodeIds)
		.orderBy('message.date_created', 'desc')
		.orderBy('message.timestamp', 'desc')
		.groupBy('message.tag')
		.groupBy('message.id')
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
	return rows.map((row) => ({
		...row,
		// Can do this in a raw query but would complicate the above
		// when written using the query builder
		dateModified: row.dateModified === row.dateCreated ? null : row.dateModified,
	}));
}
