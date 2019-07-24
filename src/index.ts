#!/usr/bin/env node

/**
 *  `src/index.ts`
 *
 *  * Supomation CLI
 */

'use strict';

/*************
 * * IMPORTS *
 *************/

// Logging Utilities
import * as logging from './utils/logging';

// HTTP Client
import axios from 'axios';

/***************
 * * CONSTANTS *
 ***************/

const BASE_URL = 'https://www.ishopnewworld.co.nz';
const CATEGORY_BASE_URL = BASE_URL + '/category/';

// Array of all categories
const ALL_CATEGORIES = [
    'fresh-foods-and-bakery',
    'chilled-frozen-and-desserts',
    'pantry',
    'personal-care',
    'kitchen-dining-and-household'
];

/***************
 * * FUNCTIONS *
 ***************/

const getPageContents = (targetUrl: string) => {
    logging.log(targetUrl);
    //
    axios.get(targetUrl).then(function(response) {
        const data = response.data;
        logging.log(data);
    });
};

const runWebScraper = () => {
    logging.logInfo('Starting Supomation WebScraper...\n');
    // logging.log();
    const category = ALL_CATEGORIES[0];
    const target = CATEGORY_BASE_URL + category;
    getPageContents(target);
};

/*****************************
 * * APPLICATION ENTRY POINT *
 *****************************/

(function() {
    logging.logWelcome(); // Log Supomation main welcome
    runWebScraper(); // Run Supomation WebScraper
    // promptMain(); // Main menu prompt
})();

// EOF //
