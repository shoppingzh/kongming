import { Task } from '../entity/Task'
import BaseService from './BaseService'

export default class TaskService extends BaseService {
  public async create(task: Task) {
    task.gmtCreate = new Date()
    return await this.ctx.repo.Task.insert(task)
  }
}
