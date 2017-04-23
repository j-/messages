export type UUID = string

export interface IIndexed {
	id: UUID;
}

export interface IDateCreated {
	dateCreated?: number;
}

export interface IDateModified {
	dateModified?: number;
}

export interface ITimestamps extends IDateCreated, IDateModified {}
