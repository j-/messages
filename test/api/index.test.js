import test from 'ava';
import express from 'express';
import request from 'supertest';
import appIndex from '../../dist/api';

let app;

test.beforeEach(() => {
	app = express();
	app.use(appIndex);
});

test('Can get API server details', async (t) => {
	t.plan(2);
	const res = await request(app).get('/');
	t.is(res.status, 200);
	t.deepEqual(res.body, {
		"success": true
	});
});

test('Does not return X-Powered-By header', async (t) => {
	t.plan(5);
	const res = await request(app).get('/');
	t.false('x-powered-by' in res.header);
	t.false('X-powered-by' in res.header);
	t.false('X-Powered-by' in res.header);
	t.false('X-Powered-By' in res.header);
	t.false('X-POWERED-BY' in res.header);
});
