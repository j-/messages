import './strip-x-powered-by';
import * as express from 'express';
import { json } from 'body-parser';

import appNodes from './nodes';

const app: express.Express = express();

if (process.env.NODE_ENV !== 'production') {
	const spaces = 4;
	app.set('json spaces', spaces);
}

app.use(json());

app.get('/', (req, res) => {
	res.send({
		success: true,
	});
});

app.use('/nodes', appNodes);

export default app;
