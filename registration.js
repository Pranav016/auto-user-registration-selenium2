const webdriver = require('selenium-webdriver');
var assert = require('assert');
const {
	generateUserName: generateUsername,
} = require('./util/generateUserName');
const { generatePassword } = require('./util/generatePassword');
const { dummy_user: user } = require('./entities/user');
const { By } = webdriver;
const { describe, it } = require('mocha');
const chai = require('chai');

const url = 'https://parabank.parasoft.com/parabank/index.htm';
const should = chai.should();
let driver;

const registration = async (driver, url) => {
	before(async () => {
		driver = new webdriver.Builder().forBrowser('chrome').build();
	});
	after(async () => {
		await driver.quit();
	});
	describe('Test Successful registration', async function () {
		it('Generate a valid username and add it to the user entity', async function () {
			var username = generateUsername();
			username.should.have.length(10);
			user.username = username;
		});
		it('Generate a valid password and add it to the user entity', async function () {
			var password = generatePassword();
			password.should.have.length(8);
			user.password = password;
		});
		it('Open up the website successfully', async function () {
			user.username = generateUsername();
			user.password = generatePassword();
			await driver.get(url);
			// check caption
			const captionElement = await driver.findElement(
				By.className('caption')
			);
			const caption = await captionElement.getText();
			assert.equal(caption, 'Experience the difference');
			// check footer message
			const footerElement = await driver.findElement(
				By.className('copyright')
			);
			const footerText = await footerElement.getText();
			assert.equal(footerText, '© Parasoft. All rights reserved.');
		});
		it('Check if successfully redirected to registration page', async function () {
			await driver
				.findElement(
					By.xpath('/html/body/div[1]/div[3]/div[1]/div/p[2]/a')
				)
				.click();
			const titleElement = await driver.findElement(
				By.className('title')
			);
			const title = await titleElement.getText();
			assert.equal(title, 'Signing up is easy!');
		});
		it('Check if user details are successfully filled', async function () {
			// check first name
			await fillRegistrationDetails(driver, user);
			const fnameElement = await driver.findElement(
				By.id('customer.firstName')
			);
			const fname = await fnameElement.getAttribute('value');
			assert.equal(fname, 'Test');
			// check city
			const cityElement = await driver.findElement(
				By.id('customer.address.city')
			);
			const city = await cityElement.getAttribute('value');
			assert.equal(city, 'Bangalore');
			// check ssn number
			const ssnElement = await driver.findElement(By.id('customer.ssn'));
			const ssn = await ssnElement.getAttribute('value');
			assert.equal(ssn, '269');
		});
		it('Check successful registration or not', async function () {
			await driver
				.findElement(
					By.xpath(
						'/html/body/div[1]/div[3]/div[2]/form/table/tbody/tr[13]/td[2]/input'
					)
				)
				.click();
			const titleElement = await driver.findElement(By.css('h1.title'));
			const title = await titleElement.getText();
			assert.equal(title, `Welcome ${user.username}`);
			const loginMsg = await driver.findElement(
				By.xpath('/html/body/div[1]/div[3]/div[2]/p')
			);
			const loginDisplayed = await loginMsg.isDisplayed();
			assert.equal(
				loginDisplayed,
				true,
				'Login message does not exist on the page'
			);
		});
	});
};

const fillRegistrationDetails = async (driver, user) => {
	await driver
		.findElement(By.id('customer.firstName'))
		.sendKeys(user.firstName);
	await driver
		.findElement(By.id('customer.lastName'))
		.sendKeys(user.lastName);
	await driver
		.findElement(By.id('customer.address.street'))
		.sendKeys(user.address);
	await driver
		.findElement(By.id('customer.address.city'))
		.sendKeys(user.city);
	await driver
		.findElement(By.id('customer.address.state'))
		.sendKeys(user.state);
	await driver
		.findElement(By.id('customer.address.zipCode'))
		.sendKeys(user.zipCode);
	await driver
		.findElement(By.id('customer.phoneNumber'))
		.sendKeys(user.phone);
	await driver.findElement(By.id('customer.ssn')).sendKeys(user.ssn);
	await driver
		.findElement(By.id('customer.username'))
		.sendKeys(user.username);
	await driver
		.findElement(By.id('customer.password'))
		.sendKeys(user.password);
	await driver.findElement(By.id('repeatedPassword')).sendKeys(user.password);
};

// module.exports = registration;

registration(driver, url);
