import { Category } from '../entity/Category'
import BaseService from './BaseService'

export default class CategoryService extends BaseService {
  public async create(category: Category) {
    await this.ctx.repo.Category.insert(category)
  }

  public async list(category: Category) {
    return await this.ctx.repo.Category.find({
      where: category,
    })
  }
}
