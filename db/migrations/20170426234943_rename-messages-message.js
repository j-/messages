exports.up = function (knex, Promise) {
	return knex.schema.renameTable('messages', 'message');
};

exports.down = function (knex, Promise) {
	return knex.schema.renameTable('message', 'messages');
};
