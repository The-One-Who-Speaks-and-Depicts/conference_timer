const mysql = require('mysql');

const config = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'api',
    port: 3306
};

const pool = mysql.createPool(config);

module.exports = pool;