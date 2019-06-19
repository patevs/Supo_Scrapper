#!/usr/bin/env node

/**
 *  `index.js`
 */

"use strict";

// pretty print error messages
require("pretty-error").start();

// IMPORTS
const chalk = require("chalk");
const puppeteer = require("puppeteer");
//const fs = require("fs");
const CFonts = require('cfonts');

async function runSupomation() {
	console.log(chalk.blue("* Running puppeteer...\n"));
	const browser = await puppeteer.launch();
	const page = await browser.newPage();

	//let url = "https://www.newworld.co.nz/savings/virtual-mailer";
	let url = "https://www.ishopnewworld.co.nz/specials";

	console.log(chalk.green("-> Navigating to: ") + chalk.underline(url) + "\n");
	await page.goto(url);

	console.log(chalk.blue("* Getting products list...\n"));
	let products = await page.$$eval(".fs-product-card__description", nodes => nodes.map(node => node.textContent));

	for (let i = 0; i < products.length; i++) {
		console.log(products[i]);
	}

	//let description = await page.$eval('.fs-product-card__footer-container', e => e.outerHTML);

	//console.log(chalk.blue("\t * Saving page contents...\n"));
	//let content = await page.content();
	//console.log(content);
	//writeToFile("contents.html", content);

	await browser.close();
}

/*
function writeToFile(name, content) {
	fs.writeFile(name, content, function (err) {
		if (err) {
			return console.log(chalk.red(err));
		}
		console.log(chalk.green("\t * " + name + " saved successfully!\n"));
	});
}
*/

function printTitle() {
	CFonts.say('SUPOMATION', {
		font: 'block',              // define the font face; shade, chrome, simple, simpleBlock, 3d, simple3d, huge
		align: 'left',              // define text alignment
		colors: ['green'],         	// define all colors
	});
}

function mainProcess() {
	printTitle();
	//runSupomation();
}

mainProcess();

/* generated by yeoman
module.exports = (input, options = {}) => {
	if (typeof input !== 'string') {
		throw new TypeError(`Expected a string, got ${typeof input}`);
	}

	return input + ' & ' + (options.postfix || 'rainbows');
};
*/


// EOF //