const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
// const chromedriver = require('chromedriver');
const registration = require('./registration');
const path = require('path');

const url = 'https://parabank.parasoft.com/parabank/index.htm';

const runner = async () => {
	chrome.setDefaultService(
		new chrome.ServiceBuilder(
			path.join(__dirname, 'chromedriver.exe')
		).build()
	);
	const driver = new webdriver.Builder().forBrowser('chrome').build();
	await registration(driver, url);
	await driver.quit();
};
runner();
