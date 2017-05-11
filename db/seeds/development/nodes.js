exports.seed = function (knex) {
	return knex(TABLE).del().then(function () {
		return knex(TABLE).insert(DATA);
	});
};

const TABLE = 'node';

const DATA = [
	{
		// 'Hello world' node
		id: '8c5c1e89-b523-4e2d-93c4-274f1c4baa6f',
		node_type: 1,
	},
	{
		// Echo 'Hello world' node
		id: 'afa0319a-9391-4c27-a7fe-e50f226ce735',
		node_type: 2,
	},
	{
		// 'Ants in my Eyes Johnson' node
		id: 'ccf90446-3267-4c59-9472-0f2043f3501c',
		node_type: 1,
	},
	{
		// 'Real Fake Doors' node
		id: '10eb2385-c8e5-4bea-be09-dc26cae237af',
		node_type: 1,
	},
	{
		// 'Gazorpazorpfield' node
		id: 'e92d26e5-d10a-41c7-9439-dbc7d01161e4',
		node_type: 1,
	},
	{
		// 'Rixty Minutes' node
		id: '99e0c2cb-0d46-49aa-afe2-898f0f5af337',
		node_type: 2,
	},
];
