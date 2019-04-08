import SerializerDto from './interface/serializer.dto';
export default class PublisherDto implements SerializerDto {
  get id(): number {
    return this._id;
  }

  get siret(): string {
    return this._siret;
  }

  get name(): string {
    return this._name;
  }

  get phone(): string {
    return this._phone;
  }

  set id(value: number) {
    this._id = value;
  }

  set siret(value: string) {
    this._siret = value;
  }

  set name(value: string) {
    this._name = value;
  }

  set phone(value: string) {
    this._phone = value;
  }

  toJSON(allowEmpty?: boolean) {
    return {
      id: this._id,
      siret: this._siret,
      name: this._name,
      phone: this._phone
    };
  }

  fromSource(source: any) {
    this._id = source.id;
    this._siret = source.siret;
    this._name = source.name;
    this._phone = source.phone;
    return this;
  }

  private _id: number;
  private _siret: string;
  private _name: string;
  private _phone: string;
}