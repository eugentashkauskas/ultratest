import SerializerDto from './interface/serializer.dto';

export default class ClearanceDistountDto implements SerializerDto {
  get removedGamesCount(): number {
    return this._removedGamesCount;
  }

  get appliedDiscountCount(): number {
    return this._appliedDiscountCount;
  }

  set removedGamesCount(value: number) {
    this._removedGamesCount = value;
  }

  set appliedDiscountCount(value: number) {
    this._appliedDiscountCount = value;
  }

  fromSource(source: any): this {
    this._removedGamesCount = source.removedGamesCount;
    this._appliedDiscountCount = source.appliedDiscountCount;
    return this;
  }

  toJSON(allowEmpty?: boolean): any {
    return {
      removedGamesCount: this._removedGamesCount,
      appliedDiscountCount: this._appliedDiscountCount
    };
  }

  private _removedGamesCount: number;
  private _appliedDiscountCount: number;
}