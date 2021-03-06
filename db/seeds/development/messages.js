exports.seed = function (knex) {
	return knex(TABLE).del().then(function () {
		return knex(TABLE).insert(DATA);
	});
};

const TABLE = 'message';

const DATA = [
	{
		id: 'cbe91a28-70a8-4878-8449-daaef3141d3e',
		title: 'Hello world',
		body: 'This is the first message',
		data: JSON.stringify({
			foo: 'bar',
			hello: 'world',
		}),
		date_created: '2017-04-26T13:21:19.111Z',
	},
	{
		id: 'b23cb669-5e8f-402a-b9d8-df1a0138ef5b',
		title: 'I\'m Ants in my Eyes Johnson',
		body: 'Here at Ants in my Eyes Jonson\'s Electronics',
		date_created: '2017-04-26T13:22:23.841Z',
	},
	{
		id: 'c142fc66-00ea-4675-be4a-268450b270ce',
		title: 'Hey are you tired of real doors cluttering up your house',
		body: 'Where you open them and you actually go somewhere?',
		date_created: '2017-04-26T13:23:13.511Z',
	},
	{
		id: '965d981b-58a8-4921-9783-ac52dba84012',
		title: 'Get on down to Real Fake Doors',
		body: 'Fill a whole room up with them',
		date_created: '2017-04-26T13:23:21.576Z',
	},
	{
		id: '0faa5af2-9d2c-432d-9d37-f1dad0095b56',
		title: 'Gazorpazorpfield',
		body: 'Gimmie my darn enchiladas!',
		date_created: '2017-04-26T13:32:51.527Z',
	},
	{
		id: '8c10d863-14e3-45f8-8641-9797ae20624e',
		title: 'Unread messages',
		body: 'You have 1 unread message',
		tag: 'message_count',
		date_created: '2017-05-11T10:57:55.499Z',
	},
	{
		id: '3e08c0ff-f901-49e2-80e8-085e5125deff',
		title: 'Unread messages',
		body: 'You have 2 unread messages',
		tag: 'message_count',
		date_created: '2017-05-11T10:58:07.128Z',
	},
	{
		id: 'e6bc24df-5db3-4041-8f36-bfe9d1f1187b',
		title: 'Unread messages',
		body: 'You have 3 unread messages',
		tag: 'message_count',
		date_created: '2017-05-11T10:58:24.806Z',
	},
	{
		id: 'a8b77ae9-f0fd-4e3d-a126-22087b12186e',
		title: 'Recursive message test',
		body: 'This message is published to node A which is concatenated by node B which is concatenated by node A etc.',
		date_created: '2017-05-13T06:35:41.036Z',
	},
];
