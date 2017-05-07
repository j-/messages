import {
	UUID,
	IIndexed,
	ITimestamps,
} from './types';

/**
 * Union of all the recognized node types.
 */
export type NodeType = (
	'ReadNode' |
	'CatNode'
);

/**
 * [[IReadNode]] type.
 */
export const NODE_TYPE_READ: NodeType = 'ReadNode';

/**
 * [[ICatNode]] type.
 */
export const NODE_TYPE_CAT: NodeType = 'CatNode';

/**
 * Nodes are the simple building blocks of a message stream. They can be entry
 * or exit points to the system, or they can be complex and apply mutations to
 * messages as they pass through the pipeline.
 */
export interface INode extends IIndexed, ITimestamps {
	/**
	 * Describes the type of the node. All nodes must have a unique type.
	 */
	type: NodeType;
}

/**
 * Reads a single message into the system. This is the only mechanism by which a
 * message can enter the system. ReadNodes cannot be subscribed to. Their only
 * purpose is for message origination.
 */
export interface IReadNode extends INode {
	type: 'ReadNode';
}

/**
 * Type guard. `true` if the given node is of type [[IReadNode]].
 */
export function isReadNode (node: INode): node is IReadNode {
	return node.type === NODE_TYPE_READ;
}

/**
 * Concatenates any number of other nodes. Returns their contents unmodified.
 * This is the simple way of getting messages out of the system.
 */
export interface ICatNode extends INode {
	type: 'CatNode';

	/**
	 * The IDs of the nodes whose messages this node concatenates.
	 */
	concatenates: UUID[];
}

/**
 * Type guard. `true` if the given node is of type [[ICatNode]].
 */
export function isCatNode (node: INode): node is ICatNode {
	return node.type === NODE_TYPE_CAT;
}

/**
 * Type guard. Is the given string a node type that is recognised by the system?
 */
export function isNodeTypeValid (type: string): type is NodeType {
	switch (type) {
		case NODE_TYPE_READ:
		case NODE_TYPE_CAT:
			return true;
		default:
			return false;
	}
}
