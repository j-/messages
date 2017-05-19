/**
 * Universally unique identifier. Should be v4.
 */
export type UUID = string;

/**
 * Interface for objects that are indexed by UUID.
 */
export interface IIndexed {
	/**
	 * Object identifier.
	 */
	id: UUID;
}

/**
 * Interface for objects that have a created date.
 */
export interface IDateCreated {
	/**
	 * When this was created. ISO date string.
	 */
	dateCreated?: string;
}

/**
 * Interface for objects that have a modified date.
 */
export interface IDateModified {
	/**
	 * When this was last modified. ISO date string.
	 */
	dateModified?: string;
}

/**
 * Interface for objects that have a created date and a modified date.
 */
export interface ITimestamps extends IDateCreated, IDateModified {}
