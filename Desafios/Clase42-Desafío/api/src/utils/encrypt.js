const bcrypt = require('bcrypt');

const saltRounds = 10;

const createHash = (password) => {
	const salt = bcrypt.genSaltSync(saltRounds);
	const hash = bcrypt.hashSync(password, salt, null);
	return hash;
}

// => bcrypt
const isValidPassword = (user, password) => {
	return bcrypt.compareSync(password, user.password);
}

module.exports = {
	createHash,
	isValidPassword
}