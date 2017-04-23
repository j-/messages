import {
	INode,
} from './node';

export interface IAction {}

export class ActionCreateNode implements IAction {
	constructor (
		public readonly node: Partial<INode>,
	) {}
}
