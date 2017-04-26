import { v4 as uuid } from 'uuid';

import {
	IAction,
	IActionCreateNode,
	isCreateNodeAction,
	IActionCreateMessage,
	isCreateMessageAction,
	IActionGetNodes,
	isGetNodesAction,
} from '../actions';

import {
	INode,
} from '../node';

import {
	IMessage,
} from '../message';

import { executeCreateNode } from './create-node';
import { executeCreateMessage } from './create-message';
import { executeGetNodes } from './get-nodes';

export async function execute (action: IActionCreateNode): Promise<INode>;
export async function execute (action: IActionCreateMessage): Promise<IMessage>;
export async function execute (action: IActionGetNodes): Promise<INode[]>;
export async function execute (action: IAction): Promise<any> {
	if (isCreateNodeAction(action)) {
		return executeCreateNode(action);
	} else if (isCreateMessageAction(action)) {
		return executeCreateMessage(action);
	} else if (isGetNodesAction(action)) {
		return executeGetNodes(action);
	} else {
		throw new Error('Unrecognised action');
	}
}
