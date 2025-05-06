let { CONFIG } = require("../settings/constants");
CONFIG.db_host = CONFIG.DB_HOST;
CONFIG.db_name = CONFIG.DB_NAME;
CONFIG.db_user = CONFIG.DB_USER;
CONFIG.db_password = CONFIG.DB_PASSWORD;
CONFIG.db_port = CONFIG.DB_PORT || 5432;

module.exports = {
  development: {
    username: CONFIG.db_user,
    password: CONFIG.db_password,
    database: CONFIG.db_name,
    host: CONFIG.db_host,
    dialect: CONFIG.db_dialect,
    port: CONFIG.db_port,
  },
  uat: {
    username: CONFIG.db_user,
    password: CONFIG.db_password,
    database: CONFIG.db_name,
    host: CONFIG.db_host,
    dialect: CONFIG.db_dialect,
    port: CONFIG.db_port,
  },
  production: {
    username: CONFIG.db_user,
    password: CONFIG.db_password,
    database: CONFIG.db_name,
    host: CONFIG.db_host,
    dialect: CONFIG.db_dialect,
    port: CONFIG.db_port,
  },
};
