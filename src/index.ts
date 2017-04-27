import { destroy } from './connection';
import { IActionCreateMessage } from './actions';
import { IMessage } from './message';
import { execute } from './engine';

async function main () {
	const action: IActionCreateMessage = {
		type: 'CreateMessage',
		message: {
			title: 'Second message',
			body: 'Being inserted into database',
		},
		nodeId: '8c5c1e89-b523-4e2d-93c4-274f1c4baa6f',
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
