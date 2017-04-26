import { v4 as uuid } from 'uuid';

import {
	IActionCreateMessage,
} from '../actions';

import {
	IMessage,
} from '../message';

export async function executeCreateMessage (action: IActionCreateMessage): Promise<IMessage> {
	const partialMessage = action.message;
	if (partialMessage.id) {
		throw new Error('Cannot create a message that already has an ID');
	} else if (partialMessage.dateCreated) {
		throw new Error('Cannot create a message that already has a created date');
	}
	const message: IMessage = {
		...partialMessage,
		id: uuid(),
		dateCreated: Date.now(),
	};
	return message;
}
