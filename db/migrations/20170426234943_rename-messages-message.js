exports.up = function (knex, Promise) {
	console.log('up', __filename);
	return knex.schema.renameTable('messages', 'message');
};

exports.down = function (knex, Promise) {
	console.log('down', __filename);
	return knex.schema.renameTable('message', 'messages');
};
