import { v4 as uuid } from 'uuid';

import {
	IAction,
	IActionCreateNode,
	IActionCreateMessage,
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
	if (action.type ===  'CreateNode') {
		const partialNode = (<IActionCreateNode>action).node;
		const node: INode = {
			type: partialNode.type,
			id: uuid(),
			dateCreated: Date.now(),
			...partialNode,
		};
		return node;
	} else if (action.type ===  'CreateMessage') {
		const message: IMessage = {
			...(<IActionCreateMessage>action).message,
			id: uuid(),
			dateCreated: Date.now(),
		};
		return message;
	} else {
		throw new Error('Unrecognised action');
	}
}
