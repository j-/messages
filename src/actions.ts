import {
	INode,
} from './node';

import {
	IMessage,
} from './message';

export interface IAction {
	type: string;
}

export interface IActionCreateNode extends IAction {
	type: 'CreateNode';
	node: Partial<INode>;
}

export function isCreateNodeAction (action: IAction): action is IActionCreateNode {
	return action.type === 'CreateNode';
}

export interface IActionCreateMessage extends IAction {
	type: 'CreateMessage';
	message: Partial<IMessage>;
}

export function isCreateMessageAction (action: IAction): action is IActionCreateMessage {
	return action.type === 'CreateMessage';
}
