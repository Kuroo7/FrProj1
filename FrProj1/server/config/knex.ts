const development = require("./index").development;
const production = require("./index").production;
const uat = require("./index").uat;
const config = {
  development: {
    client: "pg",
    useNullAsDefault: true,
    connection: {
      host: development.host,
      user: development.username,
      password: development.password,
      database: development.database,
      port: development.port
    },
    pool: {
      min: 2,
      max: 100, // Set a reasonable max number of connections in the pool
      idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
      createTimeoutMillis: 30000, // Return an error after 2 seconds if connection could not be established
      acquireTimeoutMillis: 30000,
      reapIntervalMillis: 1000,
      createRetryIntervalMillis: 200,
    },
    acquireConnectionTimeout: 10000, // Connection acquisition timeout
  },
  uat: {
    client: "pg",
    useNullAsDefault: true,
    connection: {
      port : uat.port,
      host: uat.host,
      user: uat.username,
      password: uat.password,
      database: uat.database
    },
    pool: {
      min: 2,
      max: 100, // Set a reasonable max number of connections in the pool
      idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
      createTimeoutMillis: 30000, // Return an error after 2 seconds if connection could not be established
      acquireTimeoutMillis: 30000,
      reapIntervalMillis: 1000,
      createRetryIntervalMillis: 200,
    },
    acquireConnectionTimeout: 10000,
  },
  production: {
    client: "pg",
    useNullAsDefault: true,
    connection: {
      host: production.host,
      user: production.username,
      password: production.password,
      database: production.database,
      port: production.port
    },
    pool: {
      min: 2,
      max: 100, // Set a reasonable max number of connections in the pool
      idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
      createTimeoutMillis: 30000, // Return an error after 2 seconds if connection could not be established
      acquireTimeoutMillis: 30000,
      reapIntervalMillis: 1000,
      createRetryIntervalMillis: 200,
    },
    acquireConnectionTimeout: 10000,
  }
};

export {config}
