const application: { init: () => void } = require('express/lib/application');

const { init } = application;

/**
 * Modifies the Express application initialization process to forcefully strip
 *   the `X-Powered-By: Express` header from all responses.
 *
 * Express DOES support `app.disable('x-powered-by')` but it needs to be set for
 *   ALL apps -- including sub-apps. Instead of explicitly unsetting this flag
 *   every time we create an app we just patch Express itself.
 */
export default function main () {
	application.init = function () {
		// Initialize application instance
		init.call(this);
		// Unset header flag
		delete this.settings['x-powered-by'];
	};
}
