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
];
