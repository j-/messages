import { db } from '../connection';

import {
	IActionExpandNodes,
} from '../actions';

import {
	UUID,
} from '../types';

import {
	INode,
} from '../node';

export async function executeExpandNodes (action: IActionExpandNodes): Promise<UUID[]> {
	const result: UUID[] = [];
	let parentNodeIds: UUID[] = action.nodeIds;
	while (true) {
		const ids = await getChildNodeIds(parentNodeIds, result);
		if (ids.length > 0) {
			result.push(...ids);
			parentNodeIds = ids;
		} else {
			break;
		}
	}
	return [...result, ...action.nodeIds];
}

export async function getChildNodeIds (parentIds: UUID[], blackListIds: UUID[] = []): Promise<UUID[]> {
	const rows: Partial<INode>[] = await db('node_cat')
		.column('input_node_id as id')
		.where('output_node_id', 'in', parentIds)
		.andWhere('output_node_id', 'not in', blackListIds);
	return rows.map((row) => row.id);
}
