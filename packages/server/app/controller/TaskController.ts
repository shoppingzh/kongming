import { Task } from '../entity/Task'
import { ExportQuery, ListQuery } from '../vo/Task'
import BaseController from './BaseController'


export default class TaskController extends BaseController {

  public async create() {
    const { ctx } = this
    const task = ctx.request.body as Task
    const result = await ctx.service.taskService.create(task)
    this.success(result.identifiers[0].id)
  }

  public async remove() {
    const { ctx } = this
    const result = await ctx.service.taskService.remove(
      Number(ctx.request.query.id)
    )
    this.success(result)
  }

  public async update() {
    const { ctx } = this
    const result = await ctx.service.taskService.update(
      ctx.request.body as Task
    )
    result ? this.success(result) : this.failed()
  }

  public async list() {
    const { ctx } = this
    const result = await ctx.service.taskService
      .listByQuery(ctx.request.query as unknown as ListQuery, true)
    this.success(result)
  }

  public async getById() {
    const { ctx } = this
    const result = await ctx.service.taskService.getById(
      Number(ctx.request.query.id)
    )
    result ? this.success(result) : this.failed()
  }

  public async export() {
    const { ctx } = this
    ctx.response.attachment('任务报告.xlsx')
    ctx.body = await this.service.taskService.exportByQuery(ctx.request.query as unknown as ExportQuery)
  }

}
