import test from 'ava';
import { parseId, parseIds, stringifyIds } from '../../dist/api/id-utils';

test('`parseId` must be given a string', (t) => {
	t.throws(() => {
		parseId(null);
	}, TypeError, 'Expected string, got "object"');
	t.throws(() => {
		parseId(undefined);
	}, TypeError, 'Expected string, got "undefined"');
	t.throws(() => {
		parseId(123123123);
	}, TypeError, 'Expected string, got "number"');
});

test('`parseId` must be given a valid UUID', (t) => {
	t.throws(() => {
		parseId('xxx');
	}, SyntaxError, 'Expected UUID, got "xxx"');
	t.throws(() => {
		parseId('5db2ae00 1066 4fa9 aeba ab49f4b67990');
	}, SyntaxError, 'Expected UUID, got "5db2ae00 1066 4fa9 aeba ab49f4b67990"');
	t.throws(() => {
		parseId('87b5e16d325940d2a6904013d9556d43');
	}, SyntaxError, 'Expected UUID, got "87b5e16d325940d2a6904013d9556d43"');
	t.throws(() => {
		parseId('{ccfe24db-42a9-4ef2-b1fe-3bf56cbb7dd9}');
	}, SyntaxError, 'Expected UUID, got "{ccfe24db-42a9-4ef2-b1fe-3bf56cbb7dd9}"');
});

test('`parseId` must be given a v4 UUID', (t) => {
	t.throws(() => {
		parseId('00000000-0000-0000-0000-000000000000');
	}, SyntaxError, 'Expected UUID, got "00000000-0000-0000-0000-000000000000"');
	t.throws(() => {
		parseId('4b5b83da-3203-11e7-93ae-92361f002671');
	}, SyntaxError, 'Expected UUID, got "4b5b83da-3203-11e7-93ae-92361f002671"');
});

test('`parseId` can parse a single ID', (t) => {
	t.is(
		parseId('a148e432-38df-48fe-ac2a-79ff9b765f7a'),
		'a148e432-38df-48fe-ac2a-79ff9b765f7a',
		'Returns a valid UUID as-is'
	);
	t.is(
		parseId('053E6633-5D11-43AA-9626-072E2406F6BF'),
		'053e6633-5d11-43aa-9626-072e2406f6bf',
		'Returns an upper-cased UUID in lower case'
	);
});

test('`parseIds` must be given a string', (t) => {
	t.throws(() => {
		parseIds(null);
	}, TypeError, 'Expected string, got "object"');
	t.throws(() => {
		parseIds(123123123);
	}, TypeError, 'Expected string, got "number"');
});

test('`parseIds` must be given valid UUIDs', (t) => {
	t.throws(() => {
		parseIds('54654660-d7f8-44ba-adb4-2fb303ad7fda+THISISNOTAVALIDUUID+048f8f0e-8817-4a87-9151-5f58dd98a3ec');
	}, SyntaxError, 'Expected UUID, got "THISISNOTAVALIDUUID"');
	t.throws(() => {
		parseIds('523d5dc9-ecbe-4f93-ab70-861c8090322b+6f32dcbb-9fe7-4333-a28d-575d5510425d+');
	}, SyntaxError, 'Expected UUID, got ""');
	t.throws(() => {
		parseIds('xxx');
	}, SyntaxError, 'Expected UUID, got "xxx"');
	t.throws(() => {
		parseIds('5db2ae00 1066 4fa9 aeba ab49f4b67990');
	}, SyntaxError, 'Expected UUID, got "5db2ae00 1066 4fa9 aeba ab49f4b67990"');
	t.throws(() => {
		parseIds('87b5e16d325940d2a6904013d9556d43');
	}, SyntaxError, 'Expected UUID, got "87b5e16d325940d2a6904013d9556d43"');
	t.throws(() => {
		parseIds('{ccfe24db-42a9-4ef2-b1fe-3bf56cbb7dd9}');
	}, SyntaxError, 'Expected UUID, got "{ccfe24db-42a9-4ef2-b1fe-3bf56cbb7dd9}"');
});

test('`parseIds` can parse a string of UUIDs', (t) => {
	t.deepEqual(
		parseIds('189a3bed-b1fd-4338-96ca-a9314c05b08c+8E322565-0DFE-45D1-A269-E9A6F3E6D381+bf66e3a8-16e8-4b88-ada4-4a2f62c819fa'),
		[
			'189a3bed-b1fd-4338-96ca-a9314c05b08c',
			'8e322565-0dfe-45d1-a269-e9a6f3e6d381',
			'bf66e3a8-16e8-4b88-ada4-4a2f62c819fa',
		]
	);
});

test('`parseIds` can parse a single UUID', (t) => {
	t.deepEqual(
		parseIds('197ca52b-8790-452a-9ec2-8c936496c6f5'),
		['197ca52b-8790-452a-9ec2-8c936496c6f5']
	);
});

test('`parseIds` removes duplicates', (t) => {
	t.deepEqual(
		parseIds('c362e61d-7b58-4c14-9923-57e13f9341f4+1cea92f1-c8b2-428a-bc62-e6ecad550992+c362e61d-7b58-4c14-9923-57e13f9341f4'),
		[
			'c362e61d-7b58-4c14-9923-57e13f9341f4',
			'1cea92f1-c8b2-428a-bc62-e6ecad550992',
		]
	);
});

test('`stringifyIDs` can concatenate UUIDs', (t) => {
	t.deepEqual(
		stringifyIds([
			'f7b738fd-ac46-4750-a321-6c3c98ec51f7',
			'91685d63-73a3-4460-b0fa-ec14a9034da6',
			'd4725ca6-c9f3-4bc2-8a28-134f851c3b86',
			'0591ffc1-3f73-45b0-8339-9b67bc9c51f0',
		]),
		'f7b738fd-ac46-4750-a321-6c3c98ec51f7+' +
		'91685d63-73a3-4460-b0fa-ec14a9034da6+' +
		'd4725ca6-c9f3-4bc2-8a28-134f851c3b86+' +
		'0591ffc1-3f73-45b0-8339-9b67bc9c51f0'
	);
});
