import { Response } from 'express';

/**
 * Error responses will conform to this format.
 */
export interface IResponseError {
	error: {
		/**
		 * All errors will have a name that identifies the _type_ of error.
		 */
		name: string;

		/**
		 * The message body should describe exactly what the error was.
		 */
		message: string;
	};
}

/**
 * Result responses will conform to this format.
 */
export interface IResponseResult<T = any> {
	/**
	 * Result can be anything.
	 */
	result: T;
}

/**
 * Send a response to the user in a consistent API structure.
 *
 * @param res Express response object
 * @param status HTTP status code (1xx, 2xx, 3xx, 4xx or 5xx)
 * @param response Response payload. May contain an error or the result of an
 *   action.
 */
export function send<T> (res: Response, status: number, response: IResponseError | IResponseResult<T>) {
	res.status(status).send(response);
}
