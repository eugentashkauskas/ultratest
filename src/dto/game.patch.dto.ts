import {IsArray, IsDate, IsNumber, IsString} from 'class-validator';

import SerializerDto from './interface/serializer.dto';

export default class GamePatchDto implements SerializerDto {
  @IsString() title: string;

  @IsNumber() price: number;

  @IsArray() tags: string[];

  @IsDate() releaseDate: Date;

  @IsNumber() publisherId: number;

  toJSON(): any {
    const json: any = {
      title: this.title || undefined,
      price: this.price || undefined,
      tags: this.tags || [],
      releaseDate: this.releaseDate,
      publisherId: this.publisherId
    };
    return json;
  }

  fromSource(source: any) {
    this.title = source.title;
    this.price = source.price;
    this.tags = [...source.tags];
    this.publisherId = source.publisherId;
    this.releaseDate = new Date(source.releaseDate);
    return this;
  }
}