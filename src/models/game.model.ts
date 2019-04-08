import {AllowNull, AutoIncrement, BelongsTo, Column, DataType, Default, ForeignKey, Model, PrimaryKey, Table} from 'sequelize-typescript';

import Publisher from './publisher.model';

@Table
export default class Game extends Model<Game> {
  @AllowNull(false)
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.BIGINT)
  id!: number;

  @AllowNull(false) @Column title!: string;

  @AllowNull(false) @Column(DataType.INTEGER) price!: number;

  @BelongsTo(() => Publisher) publisher!: Publisher;

  @AllowNull(false) @ForeignKey(() => Publisher) @Column publisherId!: number;

  @AllowNull(false)
  @Column({type: DataType.ARRAY(DataType.STRING)})
  tags!: string[];

  @AllowNull(true)
  @Column({type: DataType.DATE, validate: {isDate: true}})
  releaseDate?: Date;

  @Default(false) @Column(DataType.BOOLEAN) hasDiscount!: boolean;
}