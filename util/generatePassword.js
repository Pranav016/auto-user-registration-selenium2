exports.generatePassword = () => {
	const chars =
		'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*_';
	let password = '';
	for (let i = 0; i < 8; i++) {
		password += chars[Math.floor(Math.random() * chars.length)];
	}
	return password;
};
