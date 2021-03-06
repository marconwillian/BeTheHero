// Update with your config settings.
const path = require('path');
require('dotenv').config();
module.exports = {

  development: {
    migrations: {
        directory: path.resolve(__dirname, 'src', 'database', 'migrations')
    },
    client: 'mysql',
    connection: {
        host : process.env.DB_HOST,
        user : process.env.DB_USER,
        password : process.env.DB_PASSWORD,
        database : process.env.DB_DATABASE
    }
  },

  test: {
    client: 'sqlite3',
    connection: {
      filename: './src/database/test.sqlite'
    },
    migrations: {
      directory: './src/database/migrations'
    },
    useNullAsDefault: true,
  },
  
  production: {
    migrations: {
        directory: path.resolve(__dirname, 'src', 'database', 'migrations')
    },
    client: 'mysql',
    connection: {
        host : process.env.DB_HOST,
        user : process.env.DB_USER,
        password : process.env.DB_PASSWORD,
        database : process.env.DB_DATABASE
    }
  }

};
