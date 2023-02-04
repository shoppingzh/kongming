import { Category } from '../entity/Category'
import BaseController from './BaseController'

export default class CategoryController extends BaseController {
  public async create() {
    const { ctx } = this
    const category = ctx.request.body as Category
    const result = await ctx.service.categoryService.create(category)
    this.success(result.identifiers[0].id)
  }

  public async update() {
    const { ctx } = this
    const result = await ctx.service.categoryService.update(
      ctx.request.body as Category
    )
    result.affected ? this.success(result) : this.failed()
  }

  public async list() {
    const { ctx } = this
    const list = await this.ctx.service.categoryService.list(
      ctx.request.query as any
    )
    this.success(list)
  }

  public async remove() {
    const { ctx } = this
    const result = await ctx.service.categoryService.remove(
      Number(ctx.request.query.id)
    )
    this.success(result)
  }
}
