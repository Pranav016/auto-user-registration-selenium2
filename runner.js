const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const registration = require('./registration');
const path = require('path');

const url = 'https://parabank.parasoft.com/parabank/index.htm';

const runner = async () => {
	await registration(url);
};
runner();
