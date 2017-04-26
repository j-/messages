import { destroy } from './connection';
import { IActionGetNodes } from './actions';
import { IMessage } from './message';
import { execute } from './engine';

async function main () {
	const action: IActionGetNodes = {
		type: 'GetNodes',
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
