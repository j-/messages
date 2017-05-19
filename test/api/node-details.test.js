import test from 'ava';
import express from 'express';
import request from 'supertest';
import appNodes from '../../dist/api/nodes';

let app;

test.beforeEach(() => {
	app = express();
	app.use(appNodes);
});

test('Can get details about a node', async (t) => {
	t.plan(2);
	const res = await request(app).get('/99e0c2cb-0d46-49aa-afe2-898f0f5af337');
	t.is(res.status, 200);
	t.deepEqual(res.body, {
		"result": [
			{
				"id": "99e0c2cb-0d46-49aa-afe2-898f0f5af337",
				"type": "CatNode",
				"concatenates": [
					"ccf90446-3267-4c59-9472-0f2043f3501c",
					"10eb2385-c8e5-4bea-be09-dc26cae237af",
					"e92d26e5-d10a-41c7-9439-dbc7d01161e4"
				]
			}
		]
	});
});

test('Can get details about multiple nodes', async (t) => {
	t.plan(2);
	const res = await request(app).get('/99e0c2cb-0d46-49aa-afe2-898f0f5af337+afa0319a-9391-4c27-a7fe-e50f226ce735+e92d26e5-d10a-41c7-9439-dbc7d01161e4');
	t.is(res.status, 200);
	t.deepEqual(res.body, {
		"result": [
			{
				"id": "e92d26e5-d10a-41c7-9439-dbc7d01161e4",
				"type": "ReadNode"
			},
			{
				"id": "99e0c2cb-0d46-49aa-afe2-898f0f5af337",
				"type": "CatNode",
				"concatenates": [
					"ccf90446-3267-4c59-9472-0f2043f3501c",
					"10eb2385-c8e5-4bea-be09-dc26cae237af",
					"e92d26e5-d10a-41c7-9439-dbc7d01161e4"
				]
			},
			{
				"id": "afa0319a-9391-4c27-a7fe-e50f226ce735",
				"type": "CatNode",
				"concatenates": [
					"8c5c1e89-b523-4e2d-93c4-274f1c4baa6f"
				]
			}
		]
	});
});

test('CatNodes with no inputs have `concatenates` set to `null`', async (t) => {
	t.plan(2);
	const res = await request(app).get('/154d9c16-1c3a-4b1b-aa81-fda51132d573');
	t.is(res.status, 200);
	t.deepEqual(res.body, {
		"result": [
			{
				"id": "154d9c16-1c3a-4b1b-aa81-fda51132d573",
				"type": "CatNode",
				"concatenates": null
			}
		]
	});
});
