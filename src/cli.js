#!/usr/bin/env node

/**
 *  `src/cli.js`
 */

"use strict";

/*************
 * * IMPORTS *
 *************/

// WebDriver
const puppeteer = require("puppeteer");

// CLI iteraction
const inquirer = require("inquirer");

// Text styling
const chalk = require("chalk");
// Logging symbols
const logSymbols = require("log-symbols");
// Interactive logging
const { Signale } = require("signale");

/***************
 * * CONSTANTS *
 ***************/

// Shortcut to console log
const log = console.log;

// Target URL
// const TARGET = "https://www.ishopnewworld.co.nz/specials";
// Product CSS selector
// const productBaseSelector = ".fs-product-card";

/***********
 * * THEME *
 ***********/

// Colors
// const red = chalk.red;
const green = chalk.green;
// const blue = chalk.blue;

// Typography
const title = green.underline.bold;
// const link = blue.underline;

/**********************
 * * HELPER FUNCTIONS *
 **********************/

/**
 *	* Quit Supomation CLI
 */
function quit() {
	log("\n" + logSymbols.error, "Quitting Supomation CLI...\n");
	process.exit(0);
}

//------------------------------------------//

/**
 *	* Process user selected main menu option
 *
 * @param { user selected option } option
 */
function processOption(option) {
	if (option === "q") {
		quit();
	} else if (option === "s") {
		runSupomation();
	}
}

/********************************
 * * PUPPETEER HELPER FUNCTIONS *
 ********************************/

/**
 *	* Initialize a puppeteer browser instance
 */
async function initPuppeteer() {
	//..
	// const spinner = ora("Launching Puppeteer...").start();
	// spinner.indent = 2;

	// Launch puppeteer browser
	const browser = await puppeteer.launch({ headless: true });

	// const browserVersion = await browser.version();
	// spinner.succeed();
	// log("  " + logSymbols.info, "Browser version: \n\t" + green(browserVersion));

	// Return the browser instance
	return browser;
	//..
}

//------------------------------------------//

/**
 * Navigate puppeteer to a given page
 *
 * @param { puppeteer page instance } page
 * @param { target url } url
 */
/*
async function gotoPage(page, url) {
	const spinner = ora("Navigating browser page to: \n\t" + link(url)).start();
	spinner.indent = 2;
	await page.goto(url);
	spinner.succeed();
}
*/

/***************
 * * FUNCTIONS *
 ***************/

/**
 *	* Run the Supomation webscrapper
 */
// TODO: Add option to run in headless mode
async function runSupomation() {
	//..
	log("\n" + logSymbols.info, "Starting Supomation WebScrapper...");

	// Initialize signale prompt
	// const signale = new Signale();
	// signale.success("Starting Supomation WebScrapper");

	// Initialize an interactive prompt
	// const supoPrompt = new Signale({ interactive: true, scope: "supomation" });
	// Log status to prompt
	// supoPrompt.await("[%d/4] - Starting Supomation WebScrapper", 1);

	// Initialize a puppeteer browser instance
	const browser = await initPuppeteer();

	// log("\n" + logSymbols.info, "Starting Supomation WebScrapper...");
	// launch puppeteer browser instance
	// const browser = await initPuppeteer({ headless: false });

	// Create a new page in the browser
	// const page =
	await browser.newPage();

	// Close the browser instance
	await browser.close();
	// Quit Supomation CLI
	quit();
	// log("\n" + logSymbols.error, "Quitting Supomation CLI\n");
	//..
}

//------------------------------------------//

/**
 *	* Display the main menu prompt
 */
// TODO: Add question to enable headless mode
function prompt() {
	//..
	inquirer
		.prompt([
			{
				type: "list",
				name: "option",
				message: "Select an option:",
				choices: [
					"Start WebScrapper",
					"Quit Supomation CLI",
					new inquirer.Separator(),
					{
						name: "Display Help",
						disabled: "Unavailable at this time"
					}
				],
				filter: function (val) {
					return val.charAt(0).toLowerCase();
				}
			}
		])
		.then(answers => {
			//..
			processOption(answers.option);
			//..
		});
	//..
}

//------------------------------------------//

/**
 *	* Supomation application entry point
 */
(function () {
	//..
	log(title("\nWELCOME TO SUPOMATION CLI\n"));
	prompt();
	//..
})();


// signale example usage
/*
supoPrompt.await("[%d/4] - Process A", 1);
setTimeout(() => {
	supoPrompt.success("[%d/4] - Process A", 2);
	setTimeout(() => {
		supoPrompt.await("[%d/4] - Process B", 3);
		setTimeout(() => {
			supoPrompt.error("[%d/4] - Process B", 4);
			setTimeout(() => { }, 1000);
		}, 1000);
	}, 1000);
}, 1000);
*/


// EOF //

