import { IActionCreateMessage } from './actions';
import { IMessage } from './message';
import { execute } from './engine';

async function main () {
	const message: Partial<IMessage> = {
		title: 'Hello world',
		body: 'This is an example message',
	};
	const action: IActionCreateMessage = {
		type: 'CreateMessage',
		message,
	};
	const result = await execute(action);
	console.log(result);
}

main();
