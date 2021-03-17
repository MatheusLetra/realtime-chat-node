const sequelize = require('../database/connection')

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

const createUser = user => {
    users.create(user)
}

const verifyUsername = async username => {
    const result = await users.findAndCountAll({
        where: {
            username: username
        }
    });

    if (result > 0)
        return true
    else
        return false
}

module.exports = {createUsersTable, createUser, verifyUsername}