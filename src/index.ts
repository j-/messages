import { ActionCreateMessage } from './actions';
import { IMessage } from './message';
import { execute } from './engine';

async function main () {
	const message: Partial<IMessage> = {
		title: 'Hello world',
		body: 'This is an example message',
	};
	const action = new ActionCreateMessage(message);
	const result = await execute(action);
	console.log(result);
}

main();
