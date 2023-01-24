import { Category } from '../entity/Category'
import BaseService from './BaseService'

export default class CategoryService extends BaseService {
  public async create(category: Category) {
    await this.ctx.repo.Category.insert(category)
  }
}
