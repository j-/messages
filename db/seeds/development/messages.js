exports.seed = function (knex) {
	return knex(TABLE).del().then(function () {
		return knex(TABLE).insert(DATA);
	});
};

const TABLE = 'messages';

const DATA = [
	{
		id: 'cbe91a28-70a8-4878-8449-daaef3141d3e',
		title: 'Hello world',
		body: 'This is the first message',
		date_created: Date.now(),
	},
];
