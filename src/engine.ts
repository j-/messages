import { v4 as uuid } from 'uuid';

import {
	IAction,
	ActionCreateNode,
	ActionCreateMessage,
} from './actions';

import {
	INode,
} from './node';

import {
	IMessage,
} from './message';

export async function execute (action: ActionCreateNode): Promise<INode>;
export async function execute (action: ActionCreateMessage): Promise<IMessage>;
export async function execute (action: IAction): Promise<any> {
	if (action instanceof ActionCreateNode) {
		const node: INode = {
			...action.node,
			id: uuid(),
			dateCreated: Date.now(),
		};
		return node;
	} else if (action instanceof ActionCreateMessage) {
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
