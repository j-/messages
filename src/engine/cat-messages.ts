import { db } from '../connection';

import {
	IActionCatMessages,
} from '../actions';

import {
	IMessage,
} from '../message';

export async function executeCatMessages (action: IActionCatMessages): Promise<IMessage[]> {
	return db('messages')
		.join('node_messages', 'messages.id', '=', 'node_messages.message_id')
		.join('node_cat', 'node_cat.input_node_id', '=', 'node_messages.node_id')
		.where('node_cat.output_node_id', '=', action.nodeId)
		.select([
			'messages.id',
			'messages.title',
			'messages.body',
			'messages.tag',
			'messages.icon',
			'messages.data',
			'messages.url',
			'messages.timestamp',
			'messages.date_created as dateCreated',
			'messages.date_modified as dateModified',
		]);
}
