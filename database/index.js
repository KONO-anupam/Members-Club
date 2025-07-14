const { Pool } = require('pg');
require('dotenv').config();

const isProduction = process.env.NODE_ENV == 'production' ? true : false;

const pool = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : process.env.DEVELOPMENT_DATABASE_URL,
});

module.exports = pool;