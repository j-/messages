import { v4 as uuid } from 'uuid';

import {
	IAction,
	IActionCreateNode,
	isCreateNodeAction,
	IActionCreateMessage,
	isCreateMessageAction,
} from './actions';

import {
	INode,
} from './node';

import {
	IMessage,
} from './message';

export async function execute (action: IActionCreateNode): Promise<INode>;
export async function execute (action: IActionCreateMessage): Promise<IMessage>;
export async function execute (action: IAction): Promise<any> {
	if (isCreateNodeAction(action)) {
		return executeCreateNode(action);
	} else if (isCreateMessageAction(action)) {
		return executeCreateMessage(action);
	} else {
		throw new Error('Unrecognised action');
	}
}

export async function executeCreateNode (action: IActionCreateNode): Promise<INode> {
	const partialNode = action.node;
	if (partialNode.id) {
		throw new Error('Cannot create a node that already has an ID');
	} else if (partialNode.dateCreated) {
		throw new Error('Cannot create a node that already has a created date');
	}
	const node: INode = {
		...partialNode,
		type: partialNode.type,
		id: uuid(),
		dateCreated: Date.now(),
	};
	return node;
}

export async function executeCreateMessage (action: IActionCreateMessage): Promise<IMessage> {
	const partialMessage = action.message;
	if (partialMessage.id) {
		throw new Error('Cannot create a message that already has an ID');
	} else if (partialMessage.dateCreated) {
		throw new Error('Cannot create a message that already has a created date');
	}
	const message: IMessage = {
		...partialMessage,
		id: uuid(),
		dateCreated: Date.now(),
	};
	return message;
}
