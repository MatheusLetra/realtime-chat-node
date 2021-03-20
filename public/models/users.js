const { sequelize, Sequelize } = require('../database/connection')

const users = sequelize.define('users', {
    name: {
        type: Sequelize.STRING
    },
    username: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    }
})

const createUsersTable = _ => {
    users.sync({ force: true })
}

const createUser = async user => {
    let result = {}
    try {
        await users.create(user)
        result = {
            statusCode: '201',
            message: 'User Created'
        }
    }
    catch (error) {
        result = {
            statusCode: '500',
            message: error.message
        }
    }
    return result;
}

const verifyUsername = async username => {
    const result = await users.findAndCountAll({
        where: {
            username: username
        }
    });
    return (result.count > 0)
}

const verifyLogin = async (username, password) => {
    const result = await users.findAndCountAll({
        where: {
            username: username,
            password: password
        }
    });
    if (result.count > 0) {
        return true;
    } else {
        return false;
    }
}

module.exports = { createUsersTable, createUser, verifyUsername, verifyLogin }