import * as express from 'express';
import { execute } from '../engine';

import {
	IActionCatMessages,
	IActionCreateNode,
} from '../actions';

const app: express.Express = express();

app.get('/:ids/messages', async (req, res) => {
	const ids: string = req.params.ids;
	const action: IActionCatMessages = {
		type: 'CatMessages',
		nodeIds: ids.split('+'),
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
			const status = 204;
			const response = {
				result: new Array(),
			};
			res.status(status).send(response);
		}
	} catch (err) {
		if (err.code === 'SQLITE_ERROR') {
			const status = 500;
			const response = {
				error: true,
				message: 'Error communicating with database',
			};
			res.status(status).send(response);
		} else {
			const status = 500;
			const response = {
				error: true,
				message: 'An unknown error occurred',
			};
			res.status(status).send(response);
			console.error(err);
			process.exit(1);
		}
	}
});

app.post('/', async (req, res) => {
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
			const status = 204;
			const response = {
				result: <any>null,
			};
			res.status(status).send(response);
		}
	} catch (err) {
		if (err.name === 'UnrecognizedNodeTypeError') {
			const status = 400;
			const response = {
				error: true,
				message: err.message,
			};
			res.status(status).send(response);
		} else if (err.name === 'InvalidPropertyError') {
			const status = 400;
			const response = {
				error: true,
				message: err.message,
			};
			res.status(status).send(response);
		} else if (err.code === 'SQLITE_ERROR') {
			const status = 500;
			const response = {
				error: true,
				message: 'Error communicating with database',
			};
			res.status(status).send(response);
		} else {
			const status = 500;
			const response = {
				error: true,
				message: 'An unknown error occurred',
			};
			res.status(status).send(response);
			console.error(err);
			process.exit(1);
		}
	}
});

export default app;
