import stripXPoweredBy from './strip-x-powered-by';
import * as express from 'express';

import appNodes from './nodes';

// Remove the X-Powered-By header from all responses
// Added automatically by Express for every app otherwise
stripXPoweredBy();

const app: express.Express = express();

if (process.env.NODE_ENV !== 'production') {
	const spaces = 4;
	app.set('json spaces', spaces);
}

app.get('/', (req, res) => {
	res.send({
		success: true,
	});
});

app.use('/nodes', appNodes);

export default app;
