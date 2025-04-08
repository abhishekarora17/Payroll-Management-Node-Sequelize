module.exports = {
  development: (() => {
    require('dotenv').config();

    return {
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      dialect: process.env.DB_DIALECT
    };
  })()
};
