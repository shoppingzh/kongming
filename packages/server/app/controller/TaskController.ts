import { Task } from '../entity/Task'
import BaseController from './BaseController'

export default class TaskController extends BaseController {
  public async create() {
    const { ctx } = this
    const task = ctx.request.body as Task
    const result = await ctx.service.taskService.create(task)
    this.success(result.identifiers[0].id)
  }
}
