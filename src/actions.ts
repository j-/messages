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

export interface IActionCreateMessage extends IAction {
	type: 'CreateMessage';
	message: Partial<IMessage>;
}
