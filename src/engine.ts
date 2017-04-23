import {
	IAction,
	ActionHelloWorld,
} from './actions';

export async function execute (action: ActionHelloWorld): Promise<string>;
export async function execute (action: IAction) {
	if (action instanceof ActionHelloWorld) {
		return 'Hello world';
	} else {
		throw new Error('Unrecognised action');
	}
}
