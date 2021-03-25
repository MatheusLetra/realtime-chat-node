const { sequelize, Sequelize } = require('../database/connection')

const messages = sequelize.define('messages', {
    author: {
        type: Sequelize.STRING
    },
    message: {
        type: Sequelize.STRING
    } 
})

const createMessagesTable = _ => {
    messages.sync({ force: true })
}

const createMessage = async message => {
    let result = {}
    try {
        await messages.create(message)
        result = {
            statusCode: '201',
            message: 'Message Created'
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

const getAllMessages = async _ =>{
    let result = await messages.findAll({ limit: 10000000 });
    result = JSON.stringify(result)
    result = JSON.parse(result)
    return result
}





module.exports = { createMessagesTable, createMessage, getAllMessages }