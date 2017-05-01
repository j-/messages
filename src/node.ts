import {
	UUID,
	IIndexed,
	ITimestamps,
} from './types';

export type NodeType = (
	'ReadNode' |
	'CatNode'
);

export interface INode extends IIndexed, ITimestamps {
	type: NodeType;
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

export function isNodeTypeValid (type: string): type is NodeType {
	switch (type) {
		case 'ReadNode':
		case 'CatNode':
			return true;
		default:
			return false;
	}
}
