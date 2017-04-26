import {
	UUID,
} from './types';

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

export interface IActionGetNodes extends IAction {
	type: 'GetNodes';
}

export function isGetNodesAction (action: IAction): action is IActionGetNodes {
	return action.type === 'GetNodes';
}

export interface IActionCatMessages extends IAction {
	type: 'CatMessages';
	nodeIds: UUID[];
}

export function isCatMessagesAction (action: IAction): action is IActionCatMessages {
	return action.type === 'CatMessages';
}
