const Sequelize= require('sequelize');

const sequelize= new Sequelize('chat-app', 'root', 'Buka&#5225', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports= sequelize;