import { db } from '../connection';
import { QueryBuilder } from 'knex';

import {
	IActionGetNodes,
} from '../actions';

import {
	INode,
	ICatNode,
	isCatNode,
} from '../node';

import {
	UUID,
} from '../types';

export async function executeGetNodes (action: IActionGetNodes): Promise<INode[]> {
	const { nodeIds } = action;
	const result = await db.transaction((tx) => Promise.all([
		getNodeData(tx, action.nodeIds),
		getNodeConcatMap(tx, action.nodeIds),
	]));
	const nodes: INode[] = result[0];
	const concatMap: NodeConcatMap = result[1];
	nodes.filter(isCatNode).forEach((node: ICatNode) => {
		node.concatenates = concatMap[node.id];
	});
	return nodes;
}

export async function getNodeData (db: QueryBuilder, nodeIds: UUID[]): Promise<INode[]> {
	const rows: INode[] = await db.table('node')
		.join('node_types', 'node_types.id', 'node.node_type')
		.whereIn('node.id', nodeIds)
		.select([
			'node.id',
			'node_types.type_name as type',
		]);
	return rows;
}

export interface NodeConcatMap {
	[outputId: string]: string[];
}

export async function getNodeConcatMap (db: QueryBuilder, nodeIds: UUID[]): Promise<NodeConcatMap> {
	const rows = await db.table('node_cat')
		.whereIn('node_cat.output_node_id', nodeIds)
		.select([
			'node_cat.output_node_id as outputId',
			'node_cat.input_node_id as inputId',
		]);
	// Map of inputs (as an array) that correspond to an output (index)
	const map: NodeConcatMap = {};
	for (const row of rows) {
		const { inputId, outputId } = row;
		const concatenates: UUID[] = map[outputId] || [];
		concatenates.push(inputId);
		map[outputId] = concatenates;
	}
	return map;
}
