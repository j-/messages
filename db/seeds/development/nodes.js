exports.seed = function (knex) {
	return knex(TABLE).del().then(function () {
		return knex(TABLE).insert(DATA);
	});
};

const TABLE = 'nodes';

const DATA = [
	{
		id: '8c5c1e89-b523-4e2d-93c4-274f1c4baa6f',
		node_type: 1,
	},
	{
		id: 'afa0319a-9391-4c27-a7fe-e50f226ce735',
		node_type: 2,
	},
];
