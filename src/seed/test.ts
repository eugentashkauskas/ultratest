import * as Promise from 'bluebird';

import Game from '../models/game.model';
import Publisher from '../models/publisher.model';

class TestSeed {
  initData() {
    return Publisher
        .bulkCreate(
            [
              {
                name: 'Test user 1',
                siret: '0000111112222222234',
                phone: '8127398127'
              },
              {
                name: 'Test user 2',
                siret: '1000111112222222234',
                phone: '8127398127'
              },
              {
                name: 'Test user 3',
                siret: '2000111112222222234',
                phone: '8127398127'
              },
              {
                name: 'Test user 4',
                siret: '3000111112222222234',
                phone: '8127398127'
              }
            ],
            {returning: true})
        .then((publishers: Publisher[]) => {
          return Game.bulkCreate([
            {
              title: 'Game title 1',
              price: 5555,
              tags: ['tag1', 'tag2', 'tag3', 'tag4'],
              publisherId: publishers[0].id,
              releaseDate: new Date('2016-01-05T09:51:49.773Z')
            },
            {
              title: 'Game title 2',
              price: 5555,
              tags: ['tag1', 'tag2', 'tag3', 'tag4'],
              publisherId: publishers[1].id,
              releaseDate: new Date('2016-09-05T09:51:49.773Z')
            },
            {
              title: 'Game title 3',
              price: 5555,
              tags: ['tag1', 'tag2', 'tag3', 'tag4'],
              publisherId: publishers[2].id,
              releaseDate: new Date('2018-02-05T09:51:49.773Z')
            },
            {
              title: 'Game title 4',
              price: 5555,
              tags: ['tag1', 'tag2', 'tag3', 'tag4'],
              publisherId: publishers[3].id,
              releaseDate: new Date('2019-04-05T09:51:49.773Z')
            },
            {
              title: 'Game title 5',
              price: 5555,
              tags: ['tag1', 'tag2', 'tag3', 'tag4'],
              publisherId: publishers[0].id,
              releaseDate: new Date('2019-05-05T09:51:49.773Z')
            }
          ]);
        });
  }
}

const test = new TestSeed();
export default test;