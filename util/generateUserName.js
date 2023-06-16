exports.generateUserName = () => {
	const characters =
		'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$_';
	let username = '';

	for (let i = 0; i < 10; i++) {
		username += characters.charAt(
			Math.floor(Math.random() * characters.length)
		);
	}

	return username;
};
