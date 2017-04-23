import {
	IIndexed,
	ITimestamps,
} from './types';

export interface IMessage extends IIndexed, ITimestamps {
	title?: string;
	body?: string;
	tag?: string;
	icon?: string;
	data?: {};
	url?: string;
	timestamp?: number;
}
