import GamePatchDto from './game.patch.dto';

export default class GameDto extends GamePatchDto {
  set id(id: number) {
    this._id = id;
  }

  get id(): number {
    return this._id;
  }

  toJSON(): any {
    const json: any = super.toJSON();
    json.id = this._id || undefined;
    if (this._hasDiscount === true) {
      json.discount = Math.floor(this.price / 5 * 4);
    }
    return json;
  }

  fromSource(source: any) {
    super.fromSource(source);
    this._id = source.id;
    this._hasDiscount = source.hasDiscount || false;
    return this;
  }

  private _id: number = null;
  private _hasDiscount: boolean;
}