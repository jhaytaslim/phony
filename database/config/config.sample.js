
module.exports = {
  development: {
    database: process.env.POSTGRES_DB || "phony", 
    username: process.env.POSTGRES_USERNAME || "postgres", 
    password: process.env.POSTGRES_PASSWORD || "password1",
    host: process.env.POSTGRES_HOST || "127.0.0.1",
    port: process.env.POSTGRES_PORT || 5433, 
    dialect: 'postgres',
    entities: ["database/models/*.js"],
    migrations: ["database/migrations/*.js"],
  },
  test: {
    database: process.env.POSTGRES_DB || "phonyTest", 
    username: process.env.POSTGRES_USERNAME || "postgres", 
    password: process.env.POSTGRES_PASSWORD || "password1",
    host: process.env.POSTGRES_HOST || "127.0.0.1",
    port: process.env.POSTGRES_PORT || 5433, 
    dialect: 'postgres',
    entities: ["database/models/*.js"],
    migrations: ["database/migrations/*.js"],
  },
  production: {
    database: process.env.POSTGRES_DB || "hmbktauh", 
    username: process.env.POSTGRES_USERNAME || "hmbktauh", 
    password: process.env.POSTGRES_PASSWORD || "Zhv-r_FOoDOfLacXmoq0dIk5CHYBL6f8",
    host: process.env.POSTGRES_HOST || "jelani.db.elephantsql.com",
    port: process.env.POSTGRES_PORT || 5432,  
    dialect: 'postgres',
    entities: ["database/models/*.js"],
    migrations: ["database/migrations/*.js"],
    pool: {
      max: 20*2,
      min: 0,
      acquire: 30000*2,
      idle: 10000
    }
  }
}


