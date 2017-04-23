import { ActionCreateNode } from './actions';
import { INode } from './node';
import { execute } from './engine';

async function main () {
	const node: Partial<INode> = {};
	const action = new ActionCreateNode(node);
	const result = await execute(action);
	console.log(result);
}

main();
