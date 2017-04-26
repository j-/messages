import {
	UUID,
	IIndexed,
	ITimestamps,
} from './types';

export interface INode extends IIndexed, ITimestamps {
	type: string;
}

export interface IReadNode extends INode {
	type: 'ReadNode';
}

export function isReadNode (node: INode): node is IReadNode {
	return node.type === 'ReadNode';
}

export interface ICatNode extends INode {
	type: 'CatNode';
	concatenates: UUID[];
}

export function isCatNode (node: INode): node is ICatNode {
	return node.type === 'CatNode';
}
