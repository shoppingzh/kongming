import { Schedule } from '../entity/Schedule'
import BaseService from './BaseService'

export default class TaskService extends BaseService {
  public async create(schedule: Schedule) {
    schedule.gmtCreate = new Date()
    return await this.ctx.repo.Schedule.insert(schedule)
  }

  public async remove(id: number) {
    return await this.ctx.repo.Schedule.remove(new Schedule(id))
  }

  public async update(schedule: Schedule) {
    return await BaseService.update(this.ctx.repo.Schedule, schedule)
  }

  public async list(schedule: Schedule) {
    return await this.ctx.repo.Schedule.find({
      where: schedule,
      relations: {
        task: true,
      },
    })
  }

  public async getById(id: number) {
    return await this.ctx.repo.Schedule.findOne({
      where: {
        id,
      },
      relations: {
        task: true,
      },
    })
  }
}
