import {Request} from 'express';

export default interface DtoRequest extends Request {
  dto: any;
}