import {Op} from 'sequelize';
import {Sequelize} from 'sequelize-typescript';

export const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  dialect: 'postgres',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  models: [__dirname + '/models'],
  operatorsAliases: Op
});
