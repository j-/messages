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

/**
 * Get details about a given set of nodes.
 */
export async function executeGetNodes (action: IActionGetNodes): Promise<INode[]> {
	const { nodeIds } = action;
	const result = await db.transaction((tx) => Promise.all([
		getNodeData(tx, action.nodeIds),
		getNodeConcatMap(tx, action.nodeIds),
	]));
	const nodes: INode[] = result[0];
	const concatMap: NodeConcatMap = result[1];
	nodes.filter(isCatNode).forEach((node: ICatNode) => {
		node.concatenates = concatMap[node.id] || null;
	});
	return nodes;
}

/**
 * Get information that is common to all nodes -- ID, type etc.
 */
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

/**
 * Maps input node IDs against a single output node ID.
 */
export interface NodeConcatMap {
	/**
	 * Key is an output node ID. Value is an array of input node IDs.
	 *
	 * The node with the ID in the key concatenates all the nodes with the IDs
	 * in the value.
	 *
	 * @example
	 *
	 *     {
	 *       "99e0c2cb-0d46-49aa-afe2-898f0f5af337": [
	 *         "ccf90446-3267-4c59-9472-0f2043f3501c",
	 *         "10eb2385-c8e5-4bea-be09-dc26cae237af",
	 *         "e92d26e5-d10a-41c7-9439-dbc7d01161e4"
	 *     }
	 */
	[outputId: string]: string[];
}

/**
 * Returns a map of output node IDs (as keys) and the input node IDs they
 * concatenate (as an array). Used to quickly look up all the nodes that a
 * particular CatNode concatenates.
 */
export async function getNodeConcatMap (db: QueryBuilder, nodeIds: UUID[]): Promise<NodeConcatMap> {
	const rows = await db.table('node_cat')
		.whereIn('node_cat.output_node_id', nodeIds)
		.select([
			'node_cat.output_node_id as outputId',
			'node_cat.input_node_id as inputId',
		]);
	// Map of inputs (as an array) that correspond to an output (index)
	const map: NodeConcatMap = {};
	for (const { inputId, outputId } of rows) {
		const concatenates: UUID[] = map[outputId] || [];
		concatenates.push(inputId);
		map[outputId] = concatenates;
	}
	return map;
}
