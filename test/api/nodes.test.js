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
				"type": "CatNode"
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
				"id": "99e0c2cb-0d46-49aa-afe2-898f0f5af337",
				"type": "CatNode"
			},
			{
				"id": "afa0319a-9391-4c27-a7fe-e50f226ce735",
				"type": "CatNode"
			},
			{
				"id": "e92d26e5-d10a-41c7-9439-dbc7d01161e4",
				"type": "ReadNode"
			}
		]
	});
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

test('Can get messages from multiple CatNodes', async (t) => {
	t.plan(2);
	const res = await request(app).get('/99e0c2cb-0d46-49aa-afe2-898f0f5af337+afa0319a-9391-4c27-a7fe-e50f226ce735/messages');
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
			},
			{
				"id": "cbe91a28-70a8-4878-8449-daaef3141d3e",
				"title": "Hello world",
				"body": "This is the first message",
				"tag": null,
				"icon": null,
				"data": {
					"foo": "bar",
					"hello": "world"
				},
				"url": null,
				"timestamp": null,
				"dateCreated": 1493212879111,
				"dateModified": null
			}
		]
	});
});

test('Can get messages from nodes in any order', async (t) => {
	t.plan(2);
	const res = await request(app).get('/afa0319a-9391-4c27-a7fe-e50f226ce735+99e0c2cb-0d46-49aa-afe2-898f0f5af337/messages');
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
			},
			{
				"id": "cbe91a28-70a8-4878-8449-daaef3141d3e",
				"title": "Hello world",
				"body": "This is the first message",
				"tag": null,
				"icon": null,
				"data": {
					"foo": "bar",
					"hello": "world"
				},
				"url": null,
				"timestamp": null,
				"dateCreated": 1493212879111,
				"dateModified": null
			}
		]
	});
});

test('Only the latest message with a particular tag is returned', async (t) => {
	t.plan(2);
	const res = await request(app).get('/cd431717-6c53-4af1-a25a-e80bf611b79f/messages');
	t.is(res.status, 200);
	t.deepEqual(res.body, {
		"result": [
			{
				"id": "e6bc24df-5db3-4041-8f36-bfe9d1f1187b",
				"title": "Unread messages",
				"body": "You have 3 unread messages",
				"tag": "message_count",
				"icon": null,
				"data": null,
				"url": null,
				"timestamp": null,
				"dateCreated": 1494500275499,
				"dateModified": 1494500304806
			}
		]
	});
});

test('Can get messages from nodes that depend on each other', async (t) => {
	t.plan(4);
	const resA = await request(app).get('/b24558da-4867-4b9a-a8fb-930a8fdb25eb/messages');
	t.is(resA.status, 200);
	t.deepEqual(resA.body, {
		"result": [
			{
				"id": "a8b77ae9-f0fd-4e3d-a126-22087b12186e",
				"title": "Recursive message test",
				"body": "This message is published to node A which is concatenated by node B which is concatenated by node A etc.",
				"tag": null,
				"icon": null,
				"data": null,
				"url": null,
				"timestamp": null,
				"dateCreated": 1494657341036,
				"dateModified": null
			}
		]
	});
	const resB = await request(app).get('/57ebddd5-3660-482f-b524-bb388cfad17c/messages');
	t.is(resB.status, 200);
	t.deepEqual(resB.body, {
		"result": [
			{
				"id": "a8b77ae9-f0fd-4e3d-a126-22087b12186e",
				"title": "Recursive message test",
				"body": "This message is published to node A which is concatenated by node B which is concatenated by node A etc.",
				"tag": null,
				"icon": null,
				"data": null,
				"url": null,
				"timestamp": null,
				"dateCreated": 1494657341036,
				"dateModified": null
			}
		]
	});
});

test('Cannot get messages from ReadNode', async (t) => {
	t.plan(2);
	const res = await request(app).get('/8c5c1e89-b523-4e2d-93c4-274f1c4baa6f/messages');
	t.is(res.status, 200);
	t.deepEqual(res.body, {
		"result": []
	});
});

test('Cannot get messages from non-existent node', async (t) => {
	t.plan(2);
	const res = await request(app).get('/7abaa392-ed97-408a-9876-92edddee1b39/messages');
	t.is(res.status, 200);
	t.deepEqual(res.body, {
		"result": []
	});
});

test('Cannot get messages from node with invalid ID', async (t) => {
	t.plan(2);
	const res = await request(app).get('/HELLO_WORLD/messages');
	t.is(res.status, 400);
	t.deepEqual(res.body, {
		"error": {
			"name": "SyntaxError",
			"message": "Expected UUID, got \"HELLO_WORLD\""
		}
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
