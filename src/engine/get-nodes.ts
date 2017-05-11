import { db } from '../connection';

import {
	IActionGetNodes,
} from '../actions';

import {
	INode,
} from '../node';

export async function executeGetNodes (action: IActionGetNodes): Promise<INode[]> {
	const rows: INode[] = await db('node')
		.join('node_types', 'node_types.id', '=', 'node.node_type')
		.where('node.id', 'in', action.nodeIds)
		.select([
			'node.id',
			'node_types.type_name as type',
		]);
	return rows;
}
