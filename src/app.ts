import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as express from 'express';
import {Application} from 'express';

import gameRouter from './routes/game.route';

const app: express.Application = express();
app.set('port', process.env.PORT || 3000);
app.use(compression());
app.use(bodyParser.json());
app.use((req, resp, next) => {
  console.log('REQUEST', req.body);
  next();
});
app.use(bodyParser.urlencoded({extended: true}));
// routes should go here

app.use('/games', gameRouter);


export default app;
