import * as express from 'express';
import { json } from 'body-parser';
import { execute } from '../engine';
import { parseIds } from './id-utils';
import { send } from './send';

import {
	STATUS_OK,
	STATUS_CREATED,
	STATUS_BAD_REQUEST,
	STATUS_INTERNAL_SERVER_ERROR,
} from './http-response';

import {
	IActionCatMessages,
	IActionCreateMessage,
	IActionCreateNode,
} from '../actions';

import {
	IMessage,
} from '../message';

import {
	INode,
} from '../node';

const app: express.Express = express();
app.use(json());

app.use('/:ids', (req, res, next) => {
	try {
		(<any>req).context = {
			ids: parseIds(req.params.ids),
		};
		next();
	} catch (err) {
		send(res, STATUS_BAD_REQUEST, {
			error: {
				name: 'SyntaxError',
				message: err.message,
			},
		});
	}
});

app.get('/:ids/messages', async (req, res) => {
	const action: IActionCatMessages = {
		type: 'CatMessages',
		nodeIds: (<any>req).context.ids,
	};
	try {
		const messages = await execute(action);
		if (messages) {
			send<IMessage[]>(res, STATUS_OK, {
				result: messages,
			});
		} else {
			send<IMessage[]>(res, STATUS_OK, {
				result: [],
			});
		}
	} catch (err) {
		if (err.code === 'SQLITE_ERROR') {
			send(res, STATUS_INTERNAL_SERVER_ERROR, {
				error: {
					name: 'DatabaseError',
					message: 'Error communicating with database',
				},
			});
		} else {
			send(res, STATUS_INTERNAL_SERVER_ERROR, {
				error: {
					name: 'UnknownError',
					message: 'An unknown error occurred',
				},
			});
			console.error(err);
			process.exit(1);
		}
	}
});

app.post('/:ids/messages', async (req, res) => {
	const nodeIds: string[] = (<any>req).context.ids;
	if (nodeIds.length > 1) {
		send(res, STATUS_BAD_REQUEST, {
			error: {
				name: 'InvalidRequestError',
				message: 'Can only create a message on one node at a time',
			},
		});
		return;
	} else if (!req.body) {
		send(res, STATUS_BAD_REQUEST, {
			error: {
				name: 'MissingPayloadError',
				message: 'Request body is required',
			},
		});
		return;
	}
	const action: IActionCreateMessage = {
		type: 'CreateMessage',
		message: req.body,
		nodeId: nodeIds[0],
	};
	try {
		const message = await execute(action);
		if (message) {
			send<IMessage>(res, STATUS_OK, {
				result: message,
			});
		} else {
			send<IMessage>(res, STATUS_OK, {
				result: null,
			});
		}
	} catch (err) {
		if (err.name === 'TypeError') {
			send(res, STATUS_BAD_REQUEST, {
				error: {
					name: 'TypeError',
					message: err.message,
				},
			});
		} else if (err.code === 'SQLITE_ERROR') {
			send(res, STATUS_INTERNAL_SERVER_ERROR, {
				error: {
					name: 'DatabaseError',
					message: 'Error communicating with database',
				},
			});
		} else {
			send(res, STATUS_INTERNAL_SERVER_ERROR, {
				error: {
					name: 'UnknownError',
					message: 'An unknown error occurred',
				},
			});
			console.error(err);
			process.exit(1);
		}
	}
});

app.post('/', async (req, res) => {
	if (!req.body) {
		send(res, STATUS_BAD_REQUEST, {
			error: {
				name: 'MissingPayloadError',
				message: 'Request body is required',
			},
		});
		return;
	}
	const action: IActionCreateNode = {
		type: 'CreateNode',
		node: req.body,
	};
	try {
		const node = await execute(action);
		if (node) {
			send<INode>(res, STATUS_CREATED, {
				result: node,
			});
		} else {
			send<INode>(res, STATUS_OK, {
				result: null,
			});
		}
	} catch (err) {
		if (err.name === 'UnrecognizedNodeTypeError') {
			send(res, STATUS_BAD_REQUEST, {
				error: {
					name: err.name,
					message: err.message,
				},
			});
		} else if (err.name === 'InvalidPropertyError') {
			send(res, STATUS_BAD_REQUEST, {
				error: {
					name: err.name,
					message: err.message,
				},
			});
		} else if (err.code === 'SQLITE_ERROR') {
			send(res, STATUS_INTERNAL_SERVER_ERROR, {
				error: {
					name: 'DatabaseError',
					message: 'Error communicating with database',
				},
			});
		} else {
			send(res, STATUS_INTERNAL_SERVER_ERROR, {
				error: {
					name: 'UnknownError',
					message: 'An unknown error occurred',
				},
			});
			console.error(err);
			process.exit(1);
		}
	}
});

export default app;
