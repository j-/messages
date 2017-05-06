import * as express from 'express';
import { json } from 'body-parser';
import { execute } from '../engine';
import { parseIds } from './id-utils';

import {
	IActionCatMessages,
	IActionCreateNode,
} from '../actions';

const app: express.Express = express();
app.use(json());

app.get('/:ids/messages', async (req, res) => {
	let nodeIds: string[];
	try {
		nodeIds = parseIds(req.params.ids);
	} catch (err) {
		const status = 400;
		const response = {
			error: {
				name: 'SyntaxError',
				message: err.message,
			},
		};
		res.status(status).send(response);
		return;
	}
	const action: IActionCatMessages = {
		type: 'CatMessages',
		nodeIds,
	};
	try {
		const messages = await execute(action);
		if (messages) {
			const status = 200;
			const response = {
				result: messages,
			};
			res.status(status).send(response);
		} else {
			const status = 200;
			const response = {
				result: new Array(),
			};
			res.status(status).send(response);
		}
	} catch (err) {
		if (err.code === 'SQLITE_ERROR') {
			const status = 500;
			const response = {
				error: {
					name: 'DatabaseError',
					message: 'Error communicating with database',
				},
			};
			res.status(status).send(response);
		} else {
			const status = 500;
			const response = {
				error: {
					name: 'UnknownError',
					message: 'An unknown error occurred',
				},
			};
			res.status(status).send(response);
			console.error(err);
			process.exit(1);
		}
	}
});

app.post('/', async (req, res) => {
	if (!req.body) {
		const status = 400;
		const response = {
			error: {
				name: 'MissingPayloadError',
				message: 'Request body is required',
			},
		};
		res.status(status).send(response);
		return;
	}
	const action: IActionCreateNode = {
		type: 'CreateNode',
		node: req.body,
	};
	try {
		const node = await execute(action);
		if (node) {
			const status = 201;
			const response = {
				result: node,
			};
			res.status(status).send(response);
		} else {
			const status = 200;
			const response = {
				result: <any>null,
			};
			res.status(status).send(response);
		}
	} catch (err) {
		if (err.name === 'UnrecognizedNodeTypeError') {
			const status = 400;
			const response = {
				error: {
					name: err.name,
					message: err.message,
				},
			};
			res.status(status).send(response);
		} else if (err.name === 'InvalidPropertyError') {
			const status = 400;
			const response = {
				error: {
					name: err.name,
					message: err.message,
				},
			};
			res.status(status).send(response);
		} else if (err.code === 'SQLITE_ERROR') {
			const status = 500;
			const response = {
				error: {
					name: 'DatabaseError',
					message: 'Error communicating with database',
				},
			};
			res.status(status).send(response);
		} else {
			const status = 500;
			const response = {
				error: {
					name: 'UnknownError',
					message: 'An unknown error occurred',
				},
			};
			res.status(status).send(response);
			console.error(err);
			process.exit(1);
		}
	}
});

export default app;
