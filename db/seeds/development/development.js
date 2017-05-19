exports.seed = function (knex) {
	return Promise.resolve()
		// Clear old data
		.then(() => knex('node_messages').del())
		.then(() => knex('message').del())
		.then(() => knex('node_cat').del())
		.then(() => knex('node').del())
		.then(() => knex('node_types').del())

		// Insert new data
		.then(() => knex('node_types').insert([
			{
				id: 1,
				type_name: 'ReadNode',
			},
			{
				id: 2,
				type_name: 'CatNode',
			},
		]))
		.then(() => knex('node').insert([
			{
				// 'Hello world' node
				id: '8c5c1e89-b523-4e2d-93c4-274f1c4baa6f',
				node_type: 1,
			},
			{
				// Echo 'Hello world' node
				id: 'afa0319a-9391-4c27-a7fe-e50f226ce735',
				node_type: 2,
			},
			{
				// 'Ants in my Eyes Johnson' node
				id: 'ccf90446-3267-4c59-9472-0f2043f3501c',
				node_type: 1,
			},
			{
				// 'Real Fake Doors' node
				id: '10eb2385-c8e5-4bea-be09-dc26cae237af',
				node_type: 1,
			},
			{
				// 'Gazorpazorpfield' node
				id: 'e92d26e5-d10a-41c7-9439-dbc7d01161e4',
				node_type: 1,
			},
			{
				// 'Rixty Minutes' node
				id: '99e0c2cb-0d46-49aa-afe2-898f0f5af337',
				node_type: 2,
			},
			{
				// 'Update message by tag' read node
				id: '95a09eb6-5e55-4f55-ab6a-69c36a23ff94',
				node_type: 1,
			},
			{
				// 'Update message by tag' cat node
				id: 'cd431717-6c53-4af1-a25a-e80bf611b79f',
				node_type: 2,
			},
			{
				// Recursive node child
				id: '0035a5dd-74dd-4e4f-a0b5-5e905f679595',
				node_type: 1,
			},
			{
				// Recursive node A
				id: 'b24558da-4867-4b9a-a8fb-930a8fdb25eb',
				node_type: 2,
			},
			{
				// Recursive node B
				id: '57ebddd5-3660-482f-b524-bb388cfad17c',
				node_type: 2,
			},
			{
				// CatNode with no inputs
				id: '154d9c16-1c3a-4b1b-aa81-fda51132d573',
				node_type: 2,
			},
		]))
		.then(() => knex('message').insert([
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
		]))
		.then(() => knex('node_messages').insert([
			{
				id: 'd0a9a139-bb87-4327-b7ce-0410eec8ae2d',
				// 'Hello world' node
				node_id: '8c5c1e89-b523-4e2d-93c4-274f1c4baa6f',
				// Hello world
				// This is the first message
				message_id: 'cbe91a28-70a8-4878-8449-daaef3141d3e',
			},
			{
				id: '0a327c17-005e-4f33-a47d-d8c140f30c11',
				// 'Ants in my Eyes Johnson' node
				node_id: 'ccf90446-3267-4c59-9472-0f2043f3501c',
				// I'm Ants in my Eyes Johnson
				// Here at Ants in my Eyes Jonson's Electronics
				message_id: 'b23cb669-5e8f-402a-b9d8-df1a0138ef5b',
			},
			{
				id: '10030115-9524-41ea-b03d-f3c190fee073',
				// 'Real Fake Doors' node
				node_id: '10eb2385-c8e5-4bea-be09-dc26cae237af',
				// Hey are you tired of real doors cluttering up your house
				// Where you open them and you actually go somewhere?
				message_id: 'c142fc66-00ea-4675-be4a-268450b270ce',
			},
			{
				id: '35146162-c1d8-4dc6-b156-13b9adcec507',
				// 'Real Fake Doors' node
				node_id: '10eb2385-c8e5-4bea-be09-dc26cae237af',
				// Get on down to Real Fake Doors
				// Fill a whole room up with them
				message_id: '965d981b-58a8-4921-9783-ac52dba84012',
			},
			{
				id: '7faa4448-06e8-4150-9020-984a04d9472b',
				// 'Gazorpazorpfield' node
				node_id: 'e92d26e5-d10a-41c7-9439-dbc7d01161e4',
				// Gazorpazorpfield
				// Gimmie my darn enchiladas!
				message_id: '965d981b-58a8-4921-9783-ac52dba84012',
			},
			{
				id: 'dd0e90b8-c554-4b05-bfee-dee1a94d37be',
				// 'Update message by tag' node
				node_id: '95a09eb6-5e55-4f55-ab6a-69c36a23ff94',
				// Unread messages
				// You have 1 unread message
				message_id: '8c10d863-14e3-45f8-8641-9797ae20624e',
			},
			{
				id: 'e4d3d29c-b747-4e4d-b85b-ffa0a7e62796',
				// 'Update message by tag' node
				node_id: '95a09eb6-5e55-4f55-ab6a-69c36a23ff94',
				// Unread messages
				// You have 2 unread messages
				message_id: '3e08c0ff-f901-49e2-80e8-085e5125deff',
			},
			{
				id: '0f8b4163-e653-41a0-b83d-79920ecea496',
				// 'Update message by tag' node
				node_id: '95a09eb6-5e55-4f55-ab6a-69c36a23ff94',
				// Unread messages
				// You have 3 unread messages
				message_id: 'e6bc24df-5db3-4041-8f36-bfe9d1f1187b',
			},
			{
				id: '97fec47b-d299-415a-98ed-ee47612d4f26',
				// Recursive node child
				node_id: '0035a5dd-74dd-4e4f-a0b5-5e905f679595',
				// Recursive message test
				// This message is published to node A which is concatenated by node B
				// which is concatenated by node A etc.
				message_id: 'a8b77ae9-f0fd-4e3d-a126-22087b12186e',
			},
		]))
		.then(() => knex('node_cat').insert([
			{
				// 'Hello world' node
				input_node_id: '8c5c1e89-b523-4e2d-93c4-274f1c4baa6f',
				// Cat 'Hello world' node
				output_node_id: 'afa0319a-9391-4c27-a7fe-e50f226ce735',
			},
			{
				// 'Ants in my Eyes Johnson' node
				input_node_id: 'ccf90446-3267-4c59-9472-0f2043f3501c',
				// 'Rixty Minutes' node
				output_node_id: '99e0c2cb-0d46-49aa-afe2-898f0f5af337',
			},
			{
				// 'Real Fake Doors' node
				input_node_id: '10eb2385-c8e5-4bea-be09-dc26cae237af',
				// 'Rixty Minutes' node
				output_node_id: '99e0c2cb-0d46-49aa-afe2-898f0f5af337',
			},
			{
				// 'Gazorpazorpfield' node
				input_node_id: 'e92d26e5-d10a-41c7-9439-dbc7d01161e4',
				// 'Rixty Minutes' node
				output_node_id: '99e0c2cb-0d46-49aa-afe2-898f0f5af337',
			},
			{
				// 'Update message by tag' read node
				input_node_id: '95a09eb6-5e55-4f55-ab6a-69c36a23ff94',
				// 'Update message by tag' cat node
				output_node_id: 'cd431717-6c53-4af1-a25a-e80bf611b79f',
			},
			{
				// Recursive node child
				input_node_id: '0035a5dd-74dd-4e4f-a0b5-5e905f679595',
				// Recursive node A
				output_node_id: 'b24558da-4867-4b9a-a8fb-930a8fdb25eb',
			},
			{
				// Recursive node A
				input_node_id: 'b24558da-4867-4b9a-a8fb-930a8fdb25eb',
				// Recursive node B
				output_node_id: '57ebddd5-3660-482f-b524-bb388cfad17c',
			},
			{
				// Recursive node B
				input_node_id: '57ebddd5-3660-482f-b524-bb388cfad17c',
				// Recursive node A
				output_node_id: 'b24558da-4867-4b9a-a8fb-930a8fdb25eb',
			},
		]));
};
