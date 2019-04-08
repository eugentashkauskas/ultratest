import {validate, ValidationError} from 'class-validator';
import {NextFunction, Request, Response} from 'express';

import ISerializerDto from '../dto/interface/serializer.dto';
import ValidationErrorDto from '../dto/validation-error.dto';

import DtoRequest from './request.dto';

export const validateDto = <T extends {new (...args: any[]): ISerializerDto}>(
    dtoClass: T) => {
  return (request: Request, responce: Response, next: NextFunction) => {
    const dto = new dtoClass().fromSource(request.body);
    validate(dto).then((errors: ValidationError[]) => {
      if (errors && errors.length) {
        responce.status(400).json(new ValidationErrorDto().fromSource(errors));
      } else {
        (request as DtoRequest).dto = dto;
        next();
      }
    });
  };
};