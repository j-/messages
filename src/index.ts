import { createServer } from 'http';
import app from './api';

const DEFAULT_PORT = 8080;
const DEFAULT_HOST = '127.0.0.1';

const port = process.env.PORT || DEFAULT_PORT;
const host = process.env.HOST || DEFAULT_HOST;

const server = createServer(app);

server.listen(port, host, () => {
	const info = server.address();
	const { address, port } = info;
	console.log(`Server running at http://${address}:${port}`);
});
