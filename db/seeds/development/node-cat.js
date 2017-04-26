exports.seed = function (knex) {
	return knex(TABLE).del().then(function () {
		return knex(TABLE).insert(DATA);
	});
};

const TABLE = 'node_cat';

const DATA = [
	{
		input_node_id: '8c5c1e89-b523-4e2d-93c4-274f1c4baa6f',
		output_node_id: 'afa0319a-9391-4c27-a7fe-e50f226ce735',
	},
	{
		input_node_id: 'ccf90446-3267-4c59-9472-0f2043f3501c',
		output_node_id: '99e0c2cb-0d46-49aa-afe2-898f0f5af337',
	},
	{
		input_node_id: '10eb2385-c8e5-4bea-be09-dc26cae237af',
		output_node_id: '99e0c2cb-0d46-49aa-afe2-898f0f5af337',
	},
	{
		input_node_id: 'e92d26e5-d10a-41c7-9439-dbc7d01161e4',
		output_node_id: '99e0c2cb-0d46-49aa-afe2-898f0f5af337',
	},
];