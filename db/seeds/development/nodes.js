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
	{
		// 'Update message by tag' read node
		id: '95a09eb6-5e55-4f55-ab6a-69c36a23ff94',
		node_type: 1,
	},
	{
		// 'Update message by tag' cat node
		id: 'cd431717-6c53-4af1-a25a-e80bf611b79f',
		node_type: 2,
	},
	{
		// Recursive node A
		id: 'b24558da-4867-4b9a-a8fb-930a8fdb25eb',
		node_type: 2,
	},
	{
		// Recursive node B
		id: '57ebddd5-3660-482f-b524-bb388cfad17c',
		node_type: 2,
	},
];
