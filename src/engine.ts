import { v4 as uuid } from 'uuid';

import {
	IAction,
	ActionCreateNode,
} from './actions';

import {
	INode,
} from './node';

export async function execute (action: ActionCreateNode): Promise<INode>;
export async function execute (action: IAction): Promise<any> {
	if (action instanceof ActionCreateNode) {
		const partialNode = action.node;
		const node: INode = {
			...partialNode,
			id: uuid(),
		}
		return node;
	} else {
		throw new Error('Unrecognised action');
	}
}
