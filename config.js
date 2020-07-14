const mysql = require('mysql');

const config = {
    host: 'us-cdbr-east-02.cleardb.com',
    user: 'be529b659b33c6',
    password: 'b6e60153',
    database: 'heroku_3fc5dc70a5653f1'
};

const pool = mysql.createPool(config);

module.exports = pool;