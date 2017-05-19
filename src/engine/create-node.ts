import { v4 as uuid } from 'uuid';
import { QueryBuilder } from 'knex';
import { db } from '../connection';

import {
	IActionCreateNode,
} from '../actions';

import {
	INode,
	isNodeTypeValid,
} from '../node';

/**
 * Gets thrown when a property of an object is of an invalid type or value.
 */
export class InvalidPropertyError extends Error {
	constructor (message: string) {
		super(message);
		this.name = 'InvalidPropertyError';
	}
}

/**
 * Gets thrown when attempting to initialize a node with a type that is not
 * recognized by the system.
 */
export class UnrecognizedNodeTypeError extends Error {
	constructor (message: string) {
		super(message);
		this.name = 'UnrecognizedNodeTypeError';
	}
}

/**
 * Creates a new node in the system.
 */
export async function executeCreateNode (action: IActionCreateNode): Promise<INode> {
	const partialNode = action.node;
	validatePartialNode(partialNode);
	const node = createNodeFromPartial(partialNode);
	await db.transaction((tx) => Promise.all([
		// Create node record
		insertNode(tx, node),
	]));
	return node;
}

/**
 * Throws an exception if the given partial node contains invalid properties.
 */
export function validatePartialNode (partialNode: Partial<INode>): void {
	if (!partialNode.type) {
		throw new InvalidPropertyError('Node must be created with a type');
	}
	const keys = Object.keys(partialNode);
	for (const key of keys) {
		switch (key) {
			case 'id':
				throw new InvalidPropertyError('Cannot create a node that already has an ID');
			case 'dateCreated':
				throw new InvalidPropertyError('Cannot create a node that already has a created date');
			case 'type':
				if (!isNodeTypeValid(partialNode.type)) {
					throw new UnrecognizedNodeTypeError(`Did not recognize node type "${partialNode.type}"`);
				} else {
					break;
				}
			default:
				throw new InvalidPropertyError(`Did not recognize property with name "${key}"`);
		}
	}
}

/**
 * Creates a node object when given a partial node object.
 */
export function createNodeFromPartial (partialNode: Partial<INode>): INode {
	const node: INode = {
		...partialNode,
		type: partialNode.type,
		id: uuid(),
		dateCreated: new Date().toISOString(),
	};
	return node;
}

/**
 * Inserts a given node into the database.
 */
export async function insertNode (db: QueryBuilder, node: INode): Promise<void> {
	await db.table('node').insert({
		id: node.id,
		node_type: await getNodeTypeId(db, node.type),
	});
}

/**
 * When given a node type string (e.g. 'CatNode') returns the corresponding ID.
 */
export async function getNodeTypeId (db: QueryBuilder, nodeType: string): Promise<number> {
	const rows = await db.table('node_types').select('id').where('type_name', '=', nodeType);
	if (rows.length === 0) {
		throw new UnrecognizedNodeTypeError(`Did not recognize node type "${nodeType}"`);
	} else {
		return Number(rows[0].id);
	}
}
