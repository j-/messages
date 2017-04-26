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
		const partialNode = action.node;
		const node: INode = {
			type: partialNode.type,
			id: uuid(),
			dateCreated: Date.now(),
			...partialNode,
		};
		return node;
	} else if (isCreateMessageAction(action)) {
		const message: IMessage = {
			...action.message,
			id: uuid(),
			dateCreated: Date.now(),
		};
		return message;
	} else {
		throw new Error('Unrecognised action');
	}
}
