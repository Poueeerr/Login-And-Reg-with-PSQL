const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',         
    database: 'loginprj',    
    password: 'postgres'       
});

module.exports = pool;
