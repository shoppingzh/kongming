import { Task } from '../entity/Task'
import BaseService from './BaseService'

export default class TaskService extends BaseService {
  public async create(task: Task) {
    task.gmtCreate = new Date()
    return await this.ctx.repo.Task.insert(task)
  }

  public async remove(id: number) {
    return await this.ctx.repo.Task.remove(new Task(id))
  }

  public async update(task: Task) {
    return await BaseService.update(this.ctx.repo.Task, task)
  }

  public async list(task: Task) {
    return await this.ctx.repo.Task.find({
      where: task,
      relations: {
        category: true,
        scheduleList: true,
      },
    })
  }

  public async getById(id: number) {
    return await this.ctx.repo.Task.findOne({
      where: {
        id,
      },
    })
  }
}
