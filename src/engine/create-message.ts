import { v4 as uuid } from 'uuid';
import { QueryBuilder } from 'knex';
import { db } from '../connection';

import {
	UUID,
} from '../types';

import {
	IActionCreateMessage,
} from '../actions';

import {
	IMessage,
} from '../message';

import {
	NODE_TYPE_READ,
} from '../node';

/**
 * Initializes a database transaction, creates a message record, and links it to
 * the right ReadNode. Returns the new message object on success.
 */
export async function executeCreateMessage (action: IActionCreateMessage): Promise<IMessage> {
	const partialMessage = action.message;
	validatePartialMessage(partialMessage);
	const message = createMessageFromPartial(partialMessage);
	const nodeId = action.nodeId;
	const messageId = message.id;
	await db.transaction((tx) => Promise.all([
		// Create message record
		insertMessage(tx, message),
		// Link message to node
		insertNodeMessage(tx, nodeId, messageId),
		// Ensure node is type ReadNode
		checkNodeType(tx, nodeId),
	]));
	return message;
}

/**
 * Throws an exception if the given partial message contains invalid properties.
 */
export function validatePartialMessage (partialMessage: Partial<IMessage>) {
	if (partialMessage.id) {
		throw new Error('Cannot create a message that already has an ID');
	} else if (partialMessage.dateCreated) {
		throw new Error('Cannot create a message that already has a created date');
	}
}

/**
 * Creates a message object when given a partial message object.
 */
export function createMessageFromPartial (partialMessage: Partial<IMessage>) {
	const message: IMessage = {
		...partialMessage,
		id: uuid(),
		dateCreated: Date.now(),
	};
	return message;
}

/**
 * Inserts a given message into the database.
 */
export async function insertMessage (db: QueryBuilder, message: IMessage): Promise<void> {
	return db.table('message').insert({
		id: message.id,
		title: message.title,
		body: message.body,
		tag: message.tag,
		icon: message.icon,
		data: JSON.stringify(message.data),
		url: message.url,
		timestamp: message.timestamp,
		date_created: message.dateCreated,
		date_modified: message.dateModified,
	});
}

/**
 * Links a given node ID to a given message ID in the database.
 */
export async function insertNodeMessage (db: QueryBuilder, nodeId: UUID, messageId: UUID): Promise<void> {
	return db.table('node_messages').insert({
		node_id: nodeId,
		message_id: messageId,
	});
}

/**
 * Resolves if the given node ID exists and is of type ReadNode. Rejects
 * otherwise.
 */
export async function checkNodeType (db: QueryBuilder, nodeId: UUID): Promise<void> {
	const rows = await db.table('node')
		.join('node_types', 'node.node_type', '=', 'node_types.id')
		.count('node.id as count')
		.where('node_types.type_name', '=', NODE_TYPE_READ)
		.andWhere('node.id', '=', nodeId);
	const { count } = rows[0];
	if (count <= 0) {
		throw new Error(`Could not find a ReadNode with ID "${nodeId}"`);
	}
}
