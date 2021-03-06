exports.seed = function (knex) {
	return knex(TABLE).del().then(function () {
		return knex(TABLE).insert(DATA);
	});
};

const TABLE = 'node_messages';

const DATA = [
	{
		// 'Hello world' node
		node_id: '8c5c1e89-b523-4e2d-93c4-274f1c4baa6f',
		// Hello world
		// This is the first message
		message_id: 'cbe91a28-70a8-4878-8449-daaef3141d3e',
	},
	{
		// 'Ants in my Eyes Johnson' node
		node_id: 'ccf90446-3267-4c59-9472-0f2043f3501c',
		// I'm Ants in my Eyes Johnson
		// Here at Ants in my Eyes Jonson's Electronics
		message_id: 'b23cb669-5e8f-402a-b9d8-df1a0138ef5b',
	},
	{
		// 'Real Fake Doors' node
		node_id: '10eb2385-c8e5-4bea-be09-dc26cae237af',
		// Hey are you tired of real doors cluttering up your house
		// Where you open them and you actually go somewhere?
		message_id: 'c142fc66-00ea-4675-be4a-268450b270ce',
	},
	{
		// 'Real Fake Doors' node
		node_id: '10eb2385-c8e5-4bea-be09-dc26cae237af',
		// Get on down to Real Fake Doors
		// Fill a whole room up with them
		message_id: '965d981b-58a8-4921-9783-ac52dba84012',
	},
	{
		// 'Gazorpazorpfield' node
		node_id: 'e92d26e5-d10a-41c7-9439-dbc7d01161e4',
		// Gazorpazorpfield
		// Gimmie my darn enchiladas!
		message_id: '965d981b-58a8-4921-9783-ac52dba84012',
	},
	{
		// 'Update message by tag' node
		node_id: '95a09eb6-5e55-4f55-ab6a-69c36a23ff94',
		// Unread messages
		// You have 1 unread message
		message_id: '8c10d863-14e3-45f8-8641-9797ae20624e',
	},
	{
		// 'Update message by tag' node
		node_id: '95a09eb6-5e55-4f55-ab6a-69c36a23ff94',
		// Unread messages
		// You have 2 unread messages
		message_id: '3e08c0ff-f901-49e2-80e8-085e5125deff',
	},
	{
		// 'Update message by tag' node
		node_id: '95a09eb6-5e55-4f55-ab6a-69c36a23ff94',
		// Unread messages
		// You have 3 unread messages
		message_id: 'e6bc24df-5db3-4041-8f36-bfe9d1f1187b',
	},
	{
		// Recursive node child
		node_id: '0035a5dd-74dd-4e4f-a0b5-5e905f679595',
		// Recursive message test
		// This message is published to node A which is concatenated by node B
		// which is concatenated by node A etc.
		message_id: 'a8b77ae9-f0fd-4e3d-a126-22087b12186e',
	},
];
