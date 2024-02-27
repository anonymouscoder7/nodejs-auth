// models/user.js
const bcrypt = require('bcrypt');

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        name: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        contact: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: true,
        },
        password: {
            type: Sequelize.STRING,
        },
        role: {
            type: Sequelize.ENUM('user', 'admin'),
            defaultValue: 'user'
        }
    });

    // Define method to validate password
    User.prototype.validPassword = function(password) {
        return bcrypt.compareSync(password, this.password);
    };

    return User;
};
