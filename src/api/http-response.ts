/*
 * Explanations from MDN.
 * See https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
 */

/**
 * Indicates that the request has succeeded.
 */
export const STATUS_OK = 200;

/**
 * Indicates that the request has succeeded and has led to the creation of a
 * resource.
 */
export const STATUS_CREATED = 201;

/**
 * Indicates that the server could not understand the request due to invalid
 * syntax.
 */
export const STATUS_BAD_REQUEST = 400;

/**
 * Indicates that the server encountered an unexpected condition that prevented
 * it from fulfilling the request.
 */
export const STATUS_INTERNAL_SERVER_ERROR = 500;
