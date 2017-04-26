import { destroy } from './connection';
import { IActionCatMessages } from './actions';
import { IMessage } from './message';
import { execute } from './engine';

async function main () {
	const action: IActionCatMessages = {
		type: 'CatMessages',
		nodeIds: ['99e0c2cb-0d46-49aa-afe2-898f0f5af337'],
	};
	try {
		const result = await execute(action);
		console.log(result);
		await destroy();
	} catch (err) {
		console.error(err.message);
		process.exit(1);
	}
}

main();
