import test from 'ava';
import express from 'express';
import request from 'supertest';
import appNodes from '../../dist/api/nodes';

let app;

test.beforeEach(() => {
	app = express();
	app.use(appNodes);
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
