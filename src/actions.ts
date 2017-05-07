import {
	UUID,
} from './types';

import {
	INode,
} from './node';

import {
	IMessage,
} from './message';

/**
 * Describes a single unit of work to be performed by the system. Actions should
 * be atomic. They either access data in the system or modify the system's
 * state. They are dispatched to the application engine for asynchronous
 * evaluation. See [["engine/index"]].
 */
export interface IAction {
	/**
	 * Describes the type of the action. All actions must have a unique type.
	 */
	type: string;
}

/**
 * Create a new node in the system.
 */
export interface IActionCreateNode extends IAction {
	type: 'CreateNode';

	/**
	 * Describes the node to register in the system.
	 */
	node: Partial<INode>;
}

/**
 * Type guard. `true` if the given action is of type [[IActionCreateNode]].
 */
export function isCreateNodeAction (action: IAction): action is IActionCreateNode {
	return action.type === 'CreateNode';
}

/**
 * Create a single message in the system and associate it with a node. Messages
 * can only be associated with a single node.
 */
export interface IActionCreateMessage extends IAction {
	type: 'CreateMessage';

	/**
	 * Describes the message to register in the system.
	 */
	message: Partial<IMessage>;

	/**
	 * The identifier of a ReadNode to attach this message to.
	 */
	nodeId: UUID;
}

/**
 * Type guard. `true` if the given action is of type [[IActionCreateMessage]].
 */
export function isCreateMessageAction (action: IAction): action is IActionCreateMessage {
	return action.type === 'CreateMessage';
}

/**
 * Get details about particular nodes.
 */
export interface IActionGetNodes extends IAction {
	type: 'GetNodes';
}

/**
 * Type guard. `true` if the given action is of type [[IActionGetNodes]].
 */
export function isGetNodesAction (action: IAction): action is IActionGetNodes {
	return action.type === 'GetNodes';
}

/**
 * Concatenates the messages of any number of nodes when given their IDs. This
 * is the basic mechanism for fetching messages out of the system.
 */
export interface IActionCatMessages extends IAction {
	type: 'CatMessages';

	/**
	 * The IDs of the nodes to concatenate.
	 */
	nodeIds: UUID[];
}

/**
 * Type guard. `true` if the given action is of type [[IActionCatMessages]].
 */
export function isCatMessagesAction (action: IAction): action is IActionCatMessages {
	return action.type === 'CatMessages';
}
