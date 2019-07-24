#!/usr/bin/env node

/**
 *	`lib/utils.js`
 *
 *	* Utility Helper Functions
 */

"use strict";

/*************
 * * IMPORTS *
 *************/

// Logging utilities
const logging = require("./logging");

/***************
 * * CONSTANTS *
 ***************/

//

/***************
 * * FUNCTIONS *
 ***************/

/**
 *	* Quit Supomation CLI
 */
function quit() {
	logging.logError("Quitting Supomation CLI...");
	process.exit(0);
}

// ------------------------------------------ //

/**
 *	* Print the Supomation CLI version
 */
function version() {
	const msg =
		"Supomation CLI version: " + logging.magenta(process.env.npm_package_version);
	logging.logInfo(msg);
}

// ------------------------------------------ //

/**
 *	* Print the Supomation help message
 */
function help() {
	logging.logInfo(" ---- " + logging.magenta("HELP MESSAGE") + " ---- ");
}

/*************
 * * EXPORTS *
 *************/

module.exports = {
	quit,
	version,
	help
};

// EOF //