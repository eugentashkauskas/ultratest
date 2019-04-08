import {ValidationError} from 'class-validator';

import ISerializerDto from './interface/serializer.dto';

export default class ValidationErrorDto implements ISerializerDto {
  toJSON(): any {
    return {errors: this._errors};
  }

  fromSource(source: any|any[]): this {
    this._errors = source.map((error: ValidationError) => error.toString());
    return this;
  }

  private _errors: string[];
}