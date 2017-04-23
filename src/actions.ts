import {
	INode,
} from './node';

import {
	IMessage,
} from './message';

export interface IAction {}

export class ActionCreateNode implements IAction {
	constructor (
		public readonly node: Partial<INode>,
	) {}
}

export class ActionCreateMessage implements IAction {
	constructor (
		public readonly message: Partial<IMessage>,
	) {}
}
