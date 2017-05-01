import { v4 as uuid } from 'uuid';

import {
	IActionCreateNode,
} from '../actions';

import {
	INode,
	isNodeTypeValid,
} from '../node';

export async function executeCreateNode (action: IActionCreateNode): Promise<INode> {
	const partialNode = action.node;
	if (partialNode.id) {
		throw new Error('Cannot create a node that already has an ID');
	} else if (partialNode.dateCreated) {
		throw new Error('Cannot create a node that already has a created date');
	} else if (!isNodeTypeValid(partialNode.type)) {
		throw new TypeError(`Did not recognize node type "${partialNode.type}"`);
	}
	const node: INode = {
		...partialNode,
		type: partialNode.type,
		id: uuid(),
		dateCreated: Date.now(),
	};
	return node;
}
