if (!process.env.NODE_ENV)      process.env.NODE_ENV = 'DEVELOPMENT';
if (!process.env.PORT)          process.env.PORT = 1337;
if (!process.env.DATABASE_URL)  process.env.DATABASE_URL = 'mongodb://localhost/rooms-db';
if (!process.env.API_KEY)       process.env.API_KEY = 'roomsy-rooms';

require('./config/application').start();