import * as express from 'express';
import { json } from 'body-parser';
import { execute } from '../engine';
import { parseIds } from './id-utils';

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

const app: express.Express = express();
app.use(json());

app.use('/:ids', (req, res, next) => {
	try {
		(<any>req).context = {
			ids: parseIds(req.params.ids),
		};
		next();
	} catch (err) {
		res.status(STATUS_BAD_REQUEST).send({
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
			res.status(STATUS_OK).send({
				result: messages,
			});
		} else {
			res.status(STATUS_OK).send({
				result: new Array(),
			});
		}
	} catch (err) {
		if (err.code === 'SQLITE_ERROR') {
			res.status(STATUS_INTERNAL_SERVER_ERROR).send({
				error: {
					name: 'DatabaseError',
					message: 'Error communicating with database',
				},
			});
		} else {
			res.status(STATUS_INTERNAL_SERVER_ERROR).send({
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
		res.status(STATUS_BAD_REQUEST).send({
			error: {
				name: 'InvalidRequestError',
				message: 'Can only create a message on one node at a time',
			},
		});
		return;
	} else if (!req.body) {
		res.status(STATUS_BAD_REQUEST).send({
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
			res.status(STATUS_OK).send({
				result: message,
			});
		} else {
			res.status(STATUS_OK).send({
				result: <any>null,
			});
		}
	} catch (err) {
		if (err.name === 'TypeError') {
			res.status(STATUS_BAD_REQUEST).send({
				error: {
					name: 'TypeError',
					message: err.message,
				},
			});
		} else if (err.code === 'SQLITE_ERROR') {
			res.status(STATUS_INTERNAL_SERVER_ERROR).send({
				error: {
					name: 'DatabaseError',
					message: 'Error communicating with database',
				},
			});
		} else {
			res.status(STATUS_INTERNAL_SERVER_ERROR).send({
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
		res.status(STATUS_BAD_REQUEST).send({
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
			res.status(STATUS_CREATED).send({
				result: node,
			});
		} else {
			res.status(STATUS_OK).send({
				result: <any>null,
			});
		}
	} catch (err) {
		if (err.name === 'UnrecognizedNodeTypeError') {
			res.status(STATUS_BAD_REQUEST).send({
				error: {
					name: err.name,
					message: err.message,
				},
			});
		} else if (err.name === 'InvalidPropertyError') {
			res.status(STATUS_BAD_REQUEST).send({
				error: {
					name: err.name,
					message: err.message,
				},
			});
		} else if (err.code === 'SQLITE_ERROR') {
			res.status(STATUS_INTERNAL_SERVER_ERROR).send({
				error: {
					name: 'DatabaseError',
					message: 'Error communicating with database',
				},
			});
		} else {
			res.status(STATUS_INTERNAL_SERVER_ERROR).send({
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
