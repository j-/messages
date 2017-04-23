import { ActionHelloWorld } from './actions';
import { execute } from './engine';

async function main () {
	const action = new ActionHelloWorld();
	const result = await execute(action);
	console.log(result);
}

main();
