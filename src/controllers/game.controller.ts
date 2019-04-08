import {validate, ValidationError} from 'class-validator';
import {NextFunction, Request, Response} from 'express';

import AddGameDto from '../dto/add-game.dto';
import ClearanceDistountDto from '../dto/clearance-distount.dto';
import GameDto from '../dto/game.dto';
import GamePatchDto from '../dto/game.patch.dto';
import SerializerDto from '../dto/interface/serializer.dto';
import PublisherDto from '../dto/publisher.dto';
import GameService from '../services/game.service';
import IDtoRequest from '../validators/request.dto';

import BaseController from './base/base.controller';


export default class GameController extends BaseController {
  private readonly _gamesService: GameService;

  constructor() {
    super();
    this._gamesService = GameService.getInstance();
  }

  /**
   * GET request handler
   * @param request
   * @param response
   * @param next
   */
  doGet(request: Request, response: Response, next?: NextFunction) {
    this._gamesService.findGameById(request.params.id).then((game: GameDto) => {
      this.handleDtoResponse(response, game);
    });
  }

  /**
   * PUT request handler
   * @param request
   * @param response
   * @param next
   */
  doPut<AddGameDto>(
      request: IDtoRequest, response: Response, next?: NextFunction): void {
    this._gamesService.addGame(request.dto).then((addedGame: GameDto) => {
      this.handleDtoResponse(response, addedGame);
    });
  }

  /**
   * DELETE request handler
   * @param request
   * @param response
   * @param next
   */
  doDelete(request: Request, response: Response, next?: NextFunction): void {
    const id = request.params.id;
    this._gamesService.deleteGame(id).then((count: number) => {
      response.status(count === 0 ? 204 : 200).end();
    });
  }

  doPatch(request: IDtoRequest, response: Response, next?: NextFunction): void {
    const gamePatchDto = new GamePatchDto().fromSource(request.body);
    validate(gamePatchDto).then((errors: ValidationError[]) => {
      if (errors && errors.length) {
        response.status(400);
      } else {
      }
    });
    this._gamesService.updateGame(request.params.id, request.dto)
        .then((addedGame: GameDto) => {
          this.handleDtoResponse(response, addedGame);
        });
  }

  /**
   * Get publisher request handler
   * @param request
   * @param response
   * @param next
   */
  doGetPublisher(request: Request, response: Response, next?: NextFunction) {
    this._gamesService.getGamePublisher(request.params.id)
        .then((publisher: PublisherDto) => {
          this.handleDtoResponse(response, publisher);
        });
  }

  /**
   * Apply clearance and discount request handler
   * @param request
   * @param response
   * @param next
   */
  doApplyClearanceAndDiscount(
      request: Request, response: Response, next?: NextFunction) {
    this._gamesService.applyClearanceAndDiscount().then(
        (dto: ClearanceDistountDto) => {
          this.handleDtoResponse(response, dto);
        });
  }

  /**
   * DTO response handler
   * @param response Response instance
   * @param dto DTO body instance
   */
  private handleDtoResponse(response: Response, dto: SerializerDto) {
    if (dto !== null) {
      response.status(200).json(dto).end();
    } else {
      response.status(404).json({}).end();
    }
  }
}