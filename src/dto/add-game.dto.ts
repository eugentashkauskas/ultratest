import {IsArray, IsDate, IsDefined, IsNumber, IsString} from 'class-validator';

import SerializerDto from './interface/serializer.dto';

export default class AddGameDto implements SerializerDto {
  @IsString() @IsDefined() title: string;

  @IsNumber() @IsDefined() price: number;

  @IsArray() @IsDefined() tags: string[];

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
    console.log('SOURCE TAGS!!!', source.tags);
    this.tags = source.tags;
    this.publisherId = source.publisherId;
    this.releaseDate = new Date(source.releaseDate);
    return this;
  }
}