exports.seed = function (knex) {
	return knex(TABLE).del().then(function () {
		return knex(TABLE).insert(DATA);
	});
};

const TABLE = 'node_types';

const DATA = [
	{
		id: 1,
		type_name: 'ReadNode',
	},
	{
		id: 2,
		type_name: 'CatNode',
	},
];
