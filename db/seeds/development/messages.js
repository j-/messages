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
		date_created: 1493212879111,
	},
	{
		id: 'b23cb669-5e8f-402a-b9d8-df1a0138ef5b',
		title: 'I\'m Ants in my Eyes Johnson',
		body: 'Here at Ants in my Eyes Jonson\'s Electronics',
		date_created: 1493212943841,
	},
	{
		id: 'c142fc66-00ea-4675-be4a-268450b270ce',
		title: 'Hey are you tired of real doors cluttering up your house',
		body: 'Where you open them and you actually go somewhere?',
		date_created: 1493212993511,
	},
	{
		id: '965d981b-58a8-4921-9783-ac52dba84012',
		title: 'Get on down to Real Fake Doors',
		body: 'Fill a whole room up with them',
		date_created: 1493213001576,
	},
	{
		id: '0faa5af2-9d2c-432d-9d37-f1dad0095b56',
		title: 'Gazorpazorpfield',
		body: 'Gimmie my darn enchiladas!',
		date_created: 1493213571527,
	},
];
