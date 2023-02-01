import { Category } from '../entity/Category'
import BaseController from './base'

export default class CategoryController extends BaseController {
  public async create() {
    const { ctx } = this
    ctx.body = 'hello'
    const category = new Category()
    category.name = '分类1'
    category.gmtCreate = new Date()
    category.gmtModify = new Date()
    await ctx.service.categoryService.create(category)
  }

  public async list() {
    this.ctx.body = await this.ctx.service.categoryService.list(
      this.ctx.request.query as any
    )
  }
}
