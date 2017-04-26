import { db } from '../connection';

import {
	IActionGetNodes,
} from '../actions';

import {
	INode,
} from '../node';

export async function executeGetNodes (action: IActionGetNodes): Promise<INode[]> {
	return db.select('id').table('nodes');
}
