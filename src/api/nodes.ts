import * as express from 'express';
import { execute } from '../engine';
import { IActionCatMessages } from '../actions';

const app: express.Express = express();
app.disable('x-powered-by');

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

export default app;
