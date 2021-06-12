require("dotenv").config();

module.exports = {
    development: {
        username: process.env.REACT_APP_DB_USERNAME,
        password: process.env.REACT_APP_DB_PASSWORD,
        database: process.env.REACT_APP_DB_NAME,
        host: process.env.REACT_APP_DB_HOST,
        dialect: "mysql",
    },
    test: {
        username: "root",
        password: null,
        database: "testdb",
        host: "localhost",
        dialect: "mysql",
        logging: false
    },
    production: {
        use_env_variable: "JAWSDB_URL",
        dialect: "mysql"
    }
}