import { Task } from '../entity/Task'
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
    const result = await ctx.service.taskService.list(ctx.request.query as any)
    this.success(result)
  }
}
