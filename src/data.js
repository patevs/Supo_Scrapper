#!/usr/bin/env node
/**
 *  `src/data.js`
 *
 *  * Supomation Data Processing
 */

'use strict';

/*************
 * * IMPORTS *
 *************/

// const loadJsonFile = require('load-json-file');

const writeJsonFile = require('write-json-file');

const fs = require('fs');

/***************
 * * CONSTANTS *
 ***************/

// TODO: move this into constants module
const dataDir = 'data/';

var files = fs.readdirSync(dataDir);

/***************
 * * FUNCTIONS *
 ***************/

/*
(async () => {
    console.log(await loadJsonFile('foo.json'));
    //=> {foo: true}
})();
*/

// ------------------------------------------ //

/**
 *  @function saveProductData
 *  @description Save given product data to file
 *  @param { string } fileName
 *  @param { object } productData
 *  @returns { void }
 */
const saveProductData = async (fileName, productData) => {
    const d = new Date();
    const date = d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate();
    const filePath = 'data/' + date + '/' + fileName + '.json';
    // TODO: Wrap in try/catch
    await writeJsonFile(filePath, productData);
};

// ------------------------------------------ //

const readProductData = () => {
    for (let f in files) {
        let date = files[f];
        let path = dataDir + date;
        let dataFiles = fs.readdirSync(path);
        console.log(dataFiles);
    }
};

/*************
 * * EXPORTS *
 *************/

module.exports = {
    saveProductData,
    readProductData
};

// EOF //
