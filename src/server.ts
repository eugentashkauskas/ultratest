import * as dotenv from 'dotenv';

dotenv.config();

import app from './app';
import {sequelize} from './sequelize';
import testSeed from './seed/test';


sequelize.sync({force: true})
    .then(
        async () => {
          if ((/true/i).test(process.env.SEED)) {
            await testSeed.initData();
          }

          app.listen(Number(process.env.PORT), () => {
            console.log(
                '  App is running at http://localhost:%d', process.env.PORT);
            console.log('  Press CTRL-C to stop\n');
          });
        },
        (e: Error) => {
          console.error('Database connect error', e);
        });
