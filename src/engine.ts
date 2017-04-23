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
			id: '5bc70a70-3315-46b9-a280-30144087eaca',
		}
		return node;
	} else {
		throw new Error('Unrecognised action');
	}
}
