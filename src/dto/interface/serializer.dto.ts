export default interface SerializerDto {
  /**
   * convert DTO instance to JSON object
   * @param allowEmpty {boolean} define if undefined and null fields should be
   * included
   */
  toJSON(): any;

  /**
   *
   * @param json
   */
  fromSource(source: any|any[]): this;
}