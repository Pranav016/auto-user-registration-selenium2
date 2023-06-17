const UniqueSuffix = require('./UniqueSuffix');

exports.generateUserName = () => {
	const characters =
		'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$_';
	let username = '';

	for (let i = 0; i < 5; i++) {
		username += characters.charAt(
			Math.floor(Math.random() * characters.length)
		);
	}
	const uniqueSuffix = UniqueSuffix();
	username = username + uniqueSuffix.substr(-5, 5);

	return username;
};
