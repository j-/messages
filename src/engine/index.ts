import { v4 as uuid } from 'uuid';

import {
	IAction,
	IActionCreateNode,
	isCreateNodeAction,
	IActionCreateMessage,
	isCreateMessageAction,
	IActionGetNodes,
	isGetNodesAction,
	IActionCatMessages,
	isCatMessagesAction,
	IActionExpandNodes,
	isExpandNodesAction,
} from '../actions';

import {
	INode,
} from '../node';

import {
	IMessage,
} from '../message';

import {
	UUID,
} from '../types';

import { executeCreateNode } from './create-node';
import { executeCreateMessage } from './create-message';
import { executeGetNodes } from './get-nodes';
import { executeCatMessages } from './cat-messages';
import { executeExpandNodes } from './expand-nodes';

export async function execute (action: IActionCreateNode): Promise<INode>;
export async function execute (action: IActionCreateMessage): Promise<IMessage>;
export async function execute (action: IActionGetNodes): Promise<INode[]>;
export async function execute (action: IActionCatMessages): Promise<IMessage[]>;
export async function execute (action: IActionExpandNodes): Promise<UUID[]>;
export async function execute (action: IAction): Promise<any> {
	if (isCreateNodeAction(action)) {
		return executeCreateNode(action);
	} else if (isCreateMessageAction(action)) {
		return executeCreateMessage(action);
	} else if (isGetNodesAction(action)) {
		return executeGetNodes(action);
	} else if (isCatMessagesAction(action)) {
		return executeCatMessages(action);
	} else if (isExpandNodesAction(action)) {
		return executeExpandNodes(action);
	} else {
		throw new Error('Unrecognised action');
	}
}
