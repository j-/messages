import { uniq, map, split } from 'ramda';

const isUuid: (str: string) => boolean = require('is-uuid').v4;

/**
 * Split IDs on this string when parsing. Use this string to concatenate IDs
 * when serializing.
 */
export const DELIMITER = '+';

/**
 * Get unique, lowercase IDs from an input string.
 * @param {string} input IDs concatenated with a delimiter
 * @returns {string[]} List of unique, lowercase IDs
 * @throws {TypeError} If given input is not a string
 * @throws {SyntaxError} If any ID is not a valid UUID
 */
export function parseIds (input: any) {
	if (typeof input !== 'string') {
		throw new TypeError(`Expected string, got "${typeof input}"`);
	}
	return uniq(map(parseId, split(DELIMITER, input)));
}

/**
 * Get a lowercase ID from an input string.
 * @param {string} input ID
 * @returns {string} Lowercase ID
 * @throws {TypeError} If given input is not a string
 * @throws {SyntaxError} If given input is not a valid UUID
 */
export function parseId (input: any) {
	if (typeof input !== 'string') {
		throw new TypeError(`Expected string, got "${typeof input}"`);
	} else if (!isUuid(input)) {
		throw new SyntaxError(`Expected UUID, got "${input}"`);
	}
	return input.toLowerCase();
}

/**
 * Join a list of IDs with a delimiter.
 * @param {string[]} input List of IDs to join
 * @returns {string} Joined ID string
 */
export function stringifyIds (input: string[]) {
	return input.join(DELIMITER);
}
