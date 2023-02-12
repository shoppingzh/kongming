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
    task.gmtModify = new Date()
    return await this.ctx.repo.Task.update(task.id, task)
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
}
