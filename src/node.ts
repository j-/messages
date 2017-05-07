import {
	UUID,
	IIndexed,
	ITimestamps,
} from './types';

export type NodeType = (
	'ReadNode' |
	'CatNode'
);

export const NODE_TYPE_READ: NodeType = 'ReadNode';
export const NODE_TYPE_CAT: NodeType = 'CatNode';

export interface INode extends IIndexed, ITimestamps {
	type: NodeType;
}

export interface IReadNode extends INode {
	type: 'ReadNode';
}

export function isReadNode (node: INode): node is IReadNode {
	return node.type === NODE_TYPE_READ;
}

export interface ICatNode extends INode {
	type: 'CatNode';
	concatenates: UUID[];
}

export function isCatNode (node: INode): node is ICatNode {
	return node.type === NODE_TYPE_CAT;
}

export function isNodeTypeValid (type: string): type is NodeType {
	switch (type) {
		case NODE_TYPE_READ:
		case NODE_TYPE_CAT:
			return true;
		default:
			return false;
	}
}
