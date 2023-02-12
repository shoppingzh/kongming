import { Schedule } from '../entity/Schedule'
import { Task } from '../entity/Task'
import BaseController from './BaseController'

interface ListQuery {
  taskId: number
}

export default class ScheduleController extends BaseController {
  public async create() {
    const { ctx } = this
    const schedule = ctx.request.body as Schedule
    const result = await ctx.service.scheduleService.create(schedule)
    this.success(result.identifiers[0].id)
  }

  public async remove() {
    const { ctx } = this
    const result = await ctx.service.scheduleService.remove(
      Number(ctx.request.query.id)
    )
    this.success(result)
  }

  public async list() {
    const { ctx } = this
    const query = ctx.request.query as unknown as ListQuery
    const schedule = new Schedule()
    schedule.task = { id: query.taskId } as Task
    const result = await ctx.service.scheduleService.list(schedule)
    this.success(result)
  }
}
