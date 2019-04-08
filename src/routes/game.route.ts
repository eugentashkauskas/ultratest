import * as express from 'express';
import {NextFunction, Request, Response, Router} from 'express';

import GameController from '../controllers/game.controller';
import AddGameDto from '../dto/add-game.dto';
import GamePatchDto from '../dto/game.patch.dto';
import DtoRequest from '../validators/request.dto';
import {validateDto} from '../validators/validator';

const gameController: GameController = new GameController();
const gamesRouter: Router = express.Router();
gamesRouter.get(
    '/:id',
    (req: Request, resp: Response, next: NextFunction) =>
        gameController.doGet(req, resp, next));
gamesRouter.post(
    '',
    (req: Request, resp: Response, next: NextFunction) =>
        gameController.doPost(req as DtoRequest, resp, next));
gamesRouter.put(
    '', validateDto(AddGameDto),
    (req: Request, resp: Response, next: NextFunction) =>
        gameController.doPut(req as DtoRequest, resp, next));
gamesRouter.delete(
    '/:id',
    (req: Request, resp: Response, next: NextFunction) =>
        gameController.doDelete(req, resp, next));
gamesRouter.patch(
    '/:id', validateDto(GamePatchDto),
    (req: Request, resp: Response, next: NextFunction) =>
        gameController.doPatch(req as DtoRequest, resp, next));
gamesRouter.get(
    '/:id/publisher',
    (req: Request, resp: Response) => gameController.doGetPublisher(req, resp));
gamesRouter.post(
    '/clearanddiscount',
    (req, resp) => gameController.doApplyClearanceAndDiscount(req, resp));

export default gamesRouter;
