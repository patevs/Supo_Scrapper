#!/usr/bin/env node

/**
 *  `src/index.ts`
 *
 *  * Supomation CLI
 */

"use strict";

/*************
 * * IMPORTS *
 *************/

// Logging utilities
import * as logging from "./utils/logging";

/*****************************
 * * APPLICATION ENTRY POINT *
 *****************************/

/**
 *	* Supomation CLI entry point
 */
(function() {
    // ..
    console.log("SUPOMATION CLI");
    logging.logWelcome(); // Log Supomation main welcome
    // . promptMain();
    // ..
})();

// EOF //
