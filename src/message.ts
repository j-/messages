import {
	IIndexed,
	ITimestamps,
} from './types';

/**
 * Messages are a mechanism for communicating information to users and to other
 * systems in a succinct manner.
 *
 * [[IMessage]] is defined to loosely follow the structure of a [JavaScript
 * Notification](https://developer.mozilla.org/en-US/docs/Web/API/notification).
 */
export interface IMessage extends IIndexed, ITimestamps {
	/**
	 * A brief summary of the message.
	 */
	title?: string;

	/**
	 * Additional details about the message.
	 */
	body?: string;

	/**
	 * An identifier which can be used to associate messages with each other in
	 * the event that a message may need to be updated with new information.
	 */
	tag?: string;

	/**
	 * The URL of an image to display with this message. Can be something like
	 * the display picture of a user or the logo of the service where this
	 * message originated.
	 */
	icon?: string;

	/**
	 * Arbitrary, unstructured JSON data to associate with the message. Can be
	 * used by other systems to communicate additional information with this
	 * message outside of the scope of this system.
	 */
	data?: {};

	/**
	 * The canonical URL which represents this message. Can be used to take the
	 * user to a particular place when they click or tap this message.
	 */
	url?: string;

	/**
	 * The time this message was created or last modified according to the
	 * system that originated this message. Can be in the past or future. ISO
	 * date string.
	 */
	timestamp?: string;
}
