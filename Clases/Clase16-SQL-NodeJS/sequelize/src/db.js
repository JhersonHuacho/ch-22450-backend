const { Sequelize } = require('sequelize');
const userModel = require("./models/user");

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('ecommerce_code', 'root', '123456', {
    host: 'localhost',
    dialect: 'mysql'
});

sequelize
    .sync({ force: false })
    .then(() => {
        console.log("Conetado a la BD!!");
    })
    .catch(err => {
        console.log('Error en la conexión')
    })

const user = userModel(sequelize, Sequelize);

module.exports = user;