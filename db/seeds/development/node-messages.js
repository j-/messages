exports.seed = function (knex) {
	return knex(TABLE).del().then(function () {
		return knex(TABLE).insert(DATA);
	});
};

const TABLE = 'node_messages';

const DATA = [
	{
		node_id: '8c5c1e89-b523-4e2d-93c4-274f1c4baa6f',
		message_id: 'cbe91a28-70a8-4878-8449-daaef3141d3e',
	},
	{
		node_id: 'ccf90446-3267-4c59-9472-0f2043f3501c',
		message_id: 'b23cb669-5e8f-402a-b9d8-df1a0138ef5b',
	},
	{
		node_id: '10eb2385-c8e5-4bea-be09-dc26cae237af',
		message_id: 'c142fc66-00ea-4675-be4a-268450b270ce',
	},
	{
		node_id: '10eb2385-c8e5-4bea-be09-dc26cae237af',
		message_id: '965d981b-58a8-4921-9783-ac52dba84012',
	},
	{
		node_id: 'e92d26e5-d10a-41c7-9439-dbc7d01161e4',
		message_id: '965d981b-58a8-4921-9783-ac52dba84012',
	},
];
