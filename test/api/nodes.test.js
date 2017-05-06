import test from 'ava';
import express from 'express';
import request from 'supertest';
import appNodes from '../../dist/api/nodes';

let app;

test.beforeEach(() => {
	app = express();
	app.use(appNodes);
});

test('Can get messages from CatNode', async (t) => {
	t.plan(2);
	const res = await request(app).get('/99e0c2cb-0d46-49aa-afe2-898f0f5af337/messages');
	t.is(res.status, 200);
	t.deepEqual(res.body, {
		"result": [
			{
				"id": "965d981b-58a8-4921-9783-ac52dba84012",
				"title": "Get on down to Real Fake Doors",
				"body": "Fill a whole room up with them",
				"tag": null,
				"icon": null,
				"data": null,
				"url": null,
				"timestamp": null,
				"dateCreated": 1493213001576,
				"dateModified": null
			},
			{
				"id": "c142fc66-00ea-4675-be4a-268450b270ce",
				"title": "Hey are you tired of real doors cluttering up your house",
				"body": "Where you open them and you actually go somewhere?",
				"tag": null,
				"icon": null,
				"data": null,
				"url": null,
				"timestamp": null,
				"dateCreated": 1493212993511,
				"dateModified": null
			},
			{
				"id": "b23cb669-5e8f-402a-b9d8-df1a0138ef5b",
				"title": "I'm Ants in my Eyes Johnson",
				"body": "Here at Ants in my Eyes Jonson's Electronics",
				"tag": null,
				"icon": null,
				"data": null,
				"url": null,
				"timestamp": null,
				"dateCreated": 1493212943841,
				"dateModified": null
			}
		]
	});
});

test('Can create CatNode', async (t) => {
	t.plan(5);
	const res = await request(app).post('/').send({ type: 'CatNode' });
	t.is(res.status, 201);
	t.is(res.body.result.type, 'CatNode', 'Node type is CatNode');
	t.is(typeof res.body.result.id, 'string', 'Node has an id');
	t.is(res.body.result.id.length, 36, 'ID is the length of a UUID');
	t.is(typeof res.body.result.dateCreated, 'number');
});

test('Can create ReadNode', async (t) => {
	t.plan(5);
	const res = await request(app).post('/').send({ type: 'ReadNode' });
	t.is(res.status, 201);
	t.is(res.body.result.type, 'ReadNode', 'Node type is ReadNode');
	t.is(typeof res.body.result.id, 'string', 'Node has an id');
	t.is(res.body.result.id.length, 36, 'ID is the length of a UUID');
	t.is(typeof res.body.result.dateCreated, 'number');
});

test('Cannot create node without type', async (t) => {
	t.plan(2);
	const res = await request(app).post('/');
	t.is(res.status, 400);
	t.deepEqual(res.body, {
		"error": {
			"name": "InvalidPropertyError",
			"message": "Node must be created with a type"
		}
	});
});

test('Cannot create node with null type', async (t) => {
	t.plan(2);
	const res = await request(app).post('/').send({ type: null });
	t.is(res.status, 400);
	t.deepEqual(res.body, {
		"error": {
			"name": "InvalidPropertyError",
			"message": "Node must be created with a type"
		}
	});
});

test('Cannot create node with invalid type', async (t) => {
	t.plan(2);
	const res = await request(app).post('/').send({ type: 'FooNode' });
	t.is(res.status, 400);
	t.deepEqual(res.body, {
		"error": {
			"name": "UnrecognizedNodeTypeError",
			"message": "Did not recognize node type \"FooNode\""
		}
	});
});

test('Cannot create node with ID', async (t) => {
	t.plan(2);
	const res = await request(app).post('/').send({ type: 'ReadNode', id: 'Hello world' });
	t.is(res.status, 400);
	t.deepEqual(res.body, {
		"error": {
			"name": "InvalidPropertyError",
			"message": "Cannot create a node that already has an ID"
		}
	});
});

test('Cannot create node with created date', async (t) => {
	t.plan(2);
	const res = await request(app).post('/').send({ type: 'ReadNode', dateCreated: 1494035965632 });
	t.is(res.status, 400);
	t.deepEqual(res.body, {
		"error": {
			"name": "InvalidPropertyError",
			"message": "Cannot create a node that already has a created date"
		}
	});
});

test('Cannot create node with an invalid property', async (t) => {
	t.plan(2);
	const res = await request(app).post('/').send({ type: 'ReadNode', foobar: 'baz' });
	t.is(res.status, 400);
	t.deepEqual(res.body, {
		"error": {
			"name": "InvalidPropertyError",
			"message": "Did not recognize property with name \"foobar\""
		}
	});
});
