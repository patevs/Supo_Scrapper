#!/usr/bin/env node

/**
 *	`src/scraper/scraper.js`
 *
 *	* Supomation Scraper
 */

'use strict';

/*************
 * * IMPORTS *
 *************/

// JQuery Implementation
const cheerio = require('cheerio');

/***************
 * * CONSTANTS *
 ***************/

// Element Selectors
const PRODUCT_SELECTOR = '.fs-product-card';
const PRODUCT_DATA_SELECTOR = PRODUCT_SELECTOR + '__footer-container';
const PRODUCT_NAME_SELECTOR = '.u-p2';
const PRODUCT_QUANTITY_SELECTOR = '.u-p3';

/**********************
 * * HELPER FUNCTIONS *
 **********************/

/**
 * @function processProduct
 * @description Processes a product name and data returning a product object
 * @param productName
 * @param productQuantity
 * @param productData
 * @returns { object } product
 */
const processProduct = (productName, productQuantity, productData) => {
    // Get the product's unique id
    const pid = productData.productId;
    // Get the product's details
    const pdetails = productData.ProductDetails;
    // Create a product object
    const product = {
        uid: pid,
        name: productName,
        quantity: productQuantity,
        pricePer: pdetails.PricePerItem,
        priceMode: pdetails.PriceMode,
        baseUnit: pdetails.PricePerBaseUnitText
    };
    // Return the processed product
    return product;
};

// ------------------------------------------ //

/**
 * @function getProductQuantity
 * @description Get the product base unit quanity for a given product element
 * @param { CheerioElement } productElem
 * @returns { string } product quantity
 */
const getProductQuantity = productElem => {
    // Load product element into cheerio
    const $ = cheerio.load(productElem);
    // Get products quantity
    const pquantity = $(PRODUCT_QUANTITY_SELECTOR).text();
    // Remove whitespace and return the result
    return pquantity.trim();
};

// ------------------------------------------ //

/**
 * @function getProductName
 * @description Get the product name for a given product element
 * @param { CheerioElement } productElem
 * @returns { string } productName
 */
const getProductName = productElem => {
    // Load product element into cheerio
    const $ = cheerio.load(productElem);
    // Get products name
    const pname = $(PRODUCT_NAME_SELECTOR).text();
    // Remove whitespace and return the result
    return pname.trim();
};

// ------------------------------------------ //

/**
 * @function getProductData
 * @description Get the product data for a given product element
 * @param { CheerioElement }  productElem
 * @returns { object } productData
 */
const getProductData = productElem => {
    // Load product element into cheerio
    const $ = cheerio.load(productElem);
    // Get the product's data
    const pdata = $(PRODUCT_DATA_SELECTOR).attr('data-options');
    // Parse product data as JSON and return the result
    return JSON.parse(pdata);
};

/***************
 * * FUNCTIONS *
 ***************/

/**
 * @function scrapProductsFromPage
 * @description Scraps all the product elements from a given page
 * @param { string } pageHtmlContent
 * @returns { Array[Products] } allProducts - array of all products
 */
const scrapProductsFromPage = pageHtmlContent => {
    // Array of all products to return
    let allProducts = [];
    // Load the target page HTML content into cheerio
    const $ = cheerio.load(pageHtmlContent);
    // Select all products from target page
    const productElems = $(PRODUCT_SELECTOR);
    const numProducts = productElems.length;
    // Iterate over all products
    for (let i = 0; i < numProducts; i++) {
        // Get the current product element
        const productElem = productElems[i];
        // Get the name of the current product
        const productName = getProductName(productElem);
        // Get the base unit quantity for the current product
        const productQuantity = getProductQuantity(productElem);
        // console.log(productQuantity);
        // Get the data for the current product
        const productData = getProductData(productElem);
        // Process the current product
        const product = processProduct(
            productName,
            productQuantity,
            productData
        );
        // Push product object into products array
        allProducts.push(product);
    }

    // Return array containing all products
    return allProducts;
};

/*************
 * * EXPORTS *
 *************/

module.exports = {
    scrapProductsFromPage
};

// EOF //
