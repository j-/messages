import {
	UUID,
	IIndexed,
	ITimestamps,
} from './types';

export interface INode extends IIndexed, ITimestamps {
	type: string;
}

export interface IReadNode extends INode {
	type: 'ReadNode';
}

export interface ICatNode extends INode {
	type: 'CatNode';
	concatenates: UUID[];
}
