// priority: 1000000

StartupLogger.prototype.message = null;

/**
 * @param {string} message
 * @constructor
 */
function StartupLogger(message) {
	this.message = message;
	StartupLogger.instances.push(this);
}


/** @type {Array<StartupLogger>} */
StartupLogger.instances = [];

/**
 * @param {string} message
 */
StartupLogger.logMessage = function (message) {
	new StartupLogger(message);
}





new StartupLogger('Loaded StartupLogger.js');