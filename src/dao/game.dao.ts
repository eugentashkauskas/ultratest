import * as Promise from 'bluebird';
import {WhereOptions} from 'sequelize';
import {Op} from 'sequelize';
import Game from '../models/game.model';
import Publisher from '../models/publisher.model';

export default class GameDao {
  /**
   * Return game entity by its identifier
   * @param id Game identifier
   */
  findById(id: number): Promise<Game|null> {
    return Game.findByPk(id);
  }

  /**
   * Find game with publisher by game's ID
   * @param id Game identifier
   */
  findGameWithPublisher(id: number): Promise<Game|null> {
    return Game.findOne(
        {where: {id}, include: [{model: Publisher, as: 'publisher'}]});
  }

  /**
   * Save game instance
   * @param entityJson JSON game data
   */
  add(entityJson: any) {
    const instance = Game.build(entityJson);
    return instance.save();
  }

  /**
   * Delete game instance
   * @param id game identifier
   */
  delete(id: number): Promise<number> {
    return Game.destroy({where: {id}});
  }

  /**
   * Update game instance
   * @param id Game identifier
   * @param entityJson JSON data to update
   */
  update(id: string, entityJson: any): Promise<[number, Game[]]> {
    return Game.update(entityJson, {where: {id}, returning: true});
  }

  /**
   * Delete game instances oldest than specified release date
   * @param oldestReleaseDate Specified release date
   */
  deleteByLessRelease(oldestReleaseDate: Date): Promise<number> {
    return Game.destroy(
        {where: {releaseDate: {[Op.lt]: oldestReleaseDate}} as WhereOptions});
  }

  /**
   * Apply discount for games with release date between 2 date params
   * @param startReleaseDate Start release date param
   * @param endReleaseDate End release date param
   */
  applyDiscount(startReleaseDate: Date, endReleaseDate: Date) {
    return Game.update({hasDiscount: true}, {
      where:
          {releaseDate: {[Op.between]: [startReleaseDate, endReleaseDate]}} as
          WhereOptions
    });
  }
}
