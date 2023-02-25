import { Service } from 'egg'
import { Repository, ObjectLiteral } from 'typeorm'
import { Base } from '../entity/Base'

export default class BaseService extends Service {

  public static async update<E extends ObjectLiteral & Base>(
    repo: Repository<E>,
    entity: E
  ): Promise<boolean> {
    entity.gmtModify = new Date()
    const result = await repo.update(entity.id, entity)
    return !!result.affected && result.affected > 0
  }

}
