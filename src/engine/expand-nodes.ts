import { db } from '../connection';

import {
	IActionExpandNodes,
} from '../actions';

import {
	UUID,
} from '../types';

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
	return result;
}

export async function getChildNodeIds (parentIds: UUID[], blackListIds: UUID[] = []): Promise<UUID[]> {
	const result: UUID[] = await db('node_cat')
		.column('input_node_id')
		.where('output_node_id', 'in', parentIds)
		.andWhereNot('output_node_id', 'in', blackListIds);
	return result;
}
