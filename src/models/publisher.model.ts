import {AllowNull, AutoIncrement, Column, DataType, Model, PrimaryKey, Table} from 'sequelize-typescript';

const siretRegExp = RegExp(/[0-9]{14}/);

@Table
export default class Publisher extends Model<Publisher> {
  @AllowNull(false)
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.BIGINT)
  id!: string;

  @AllowNull(false) @Column(DataType.STRING) name!: string;

  @AllowNull(true)
  @Column({
    type: DataType.STRING,
    validate: {
      isValidSiret:
          (value: string) => {
            return !value || siretRegExp.test(value);
          }
    }
  })
  siret?: number;

  @AllowNull(true) @Column(DataType.STRING) phone?: string;
}