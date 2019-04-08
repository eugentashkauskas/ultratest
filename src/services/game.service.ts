import * as Promise from 'bluebird';
import * as moment from 'moment';

import GameDao from '../dao/game.dao';
import PublisherDao from '../dao/publisher.dao';
import AddGameDto from '../dto/add-game.dto';
import ClearanceDistountDto from '../dto/clearance-distount.dto';
import GameDto from '../dto/game.dto';
import GamePatchDto from '../dto/game.patch.dto';
import PublisherDto from '../dto/publisher.dto';
import Game from '../models/game.model';
import Publisher from '../models/publisher.model';

class GameService {
  private static _instance: GameService = new GameService();
  private readonly _gameDao: GameDao;
  private readonly _publisherDao: PublisherDao;

  private constructor() {
    this._gameDao = new GameDao();
    this._publisherDao = new PublisherDao();
  }

  /**
   * Return single service instance
   */
  static getInstance() {
    return GameService._instance;
  }

  /**
   * Get game instance
   * @param id
   */
  findGameById(id: number): Promise<GameDto|null> {
    return this._gameDao.findById(id).then((game: Game|null) => {
      return game === null ? null : new GameDto().fromSource(game);
    });
  }

  /**
   * Delete game instance
   * @param id
   */
  deleteGame(id: number): Promise<number> {
    return this._gameDao.delete(id);
  }

  /**
   * Update game instance with new values
   * @param id
   * @param game
   */
  updateGame(id: string, game: GamePatchDto): Promise<GameDto> {
    const gameJson = game.toJSON();
    return this._gameDao.update(id, gameJson).then((values: any) => {
      return new GameDto().fromSource(values[1][0]);
    });
  }


  /**
   * Add game instance to the database
   * @param game
   */
  addGame(game: AddGameDto): Promise<GameDto|null> {
    const gameJson = game.toJSON();
    return this._gameDao.add(gameJson).then((gameEntity: Game) => {
      return game === null ? null : new GameDto().fromSource(gameEntity);
    });
  }

  /**
   * Get publisher of a game
   * @param gameId Game identifier
   */
  getGamePublisher(gameId: number): Promise<PublisherDto> {
    return this._gameDao.findGameWithPublisher(gameId).then((game: Game) => {
      if (game === null || game.publisher === null) {
        return null;
      }
      return new PublisherDto().fromSource(game.publisher);
    });
  }

  /**
   * Remove games with release date less than 18 months and apply discount to
   * all entities with release date greater than 12 months and lesser than 18
   * months old
   */
  applyClearanceAndDiscount(): Promise<ClearanceDistountDto> {
    const oldestRelease = moment().subtract(18, 'months').toDate();
    const discountReleaseStart = moment().subtract(12, 'months').toDate();
    return Promise
        .all([
          this._gameDao.deleteByLessRelease(oldestRelease),
          this._gameDao.applyDiscount(oldestRelease, discountReleaseStart)
        ])
        .then(([deletedOldGamesCount, appliedDiscountResponse]) => {
          const appliedDiscountCount = appliedDiscountResponse[0];
          const dto = new ClearanceDistountDto();
          dto.appliedDiscountCount = appliedDiscountCount;
          dto.removedGamesCount = deletedOldGamesCount;
          return dto;
        });
  }
}

export default GameService;