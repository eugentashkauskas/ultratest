import * as Promise from 'bluebird';

import JSONSerializerDto from '../dto/interface/serializer.dto';
import Publisher from '../models/publisher.model';

export default class PublisherDao {
  /**
   * Return publisher by its identifier
   * @param id Publisher identifier param
   */
  findById(id: number): Promise<Publisher|null> {
    return Publisher.findByPk(id);
  }
}