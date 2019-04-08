import {NextFunction, Request, Response} from 'express';

import DtoRequest from '../../validators/request.dto';

/**
 * Base controller instance
 */
export default abstract class BaseController {
  doGet(request: Request, response: Response, next?: NextFunction): void {
    response.status(404).end();
  }

  doPost(request: DtoRequest, response: Response, next?: NextFunction): void {
    response.status(404).end();
  }

  doPut(request: DtoRequest, response: Response, next?: NextFunction): void {
    response.status(404).end();
  }

  doDelete(request: Request, response: Response, next?: NextFunction): void {
    response.status(404).end();
  }

  doPatch(request: DtoRequest, response: Response, next?: NextFunction): void {
    response.status(404).end();
  }
}