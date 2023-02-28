import { Task } from '../entity/Task'
import { ListQuery } from '../vo/Task'
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

  public async listByQuery(query: ListQuery) {
    const qb = this.ctx.repo.Task.createQueryBuilder()
      .select('t')
      .from(Task, 't')
      .leftJoinAndSelect('t.category', 'c')
    if (query.startTime && query.endTime) {
      qb.andWhere('t.endTime >= :startTime', { startTime: query.startTime })
      qb.andWhere('t.startTime <= :endTime', { endTime: query.endTime })
    }
    if (query.categoryId) {
      qb.andWhere('c.id = :categoryId', { categoryId: query.categoryId })
    }
    qb.orderBy('t.endTime', 'DESC')
    return await qb.getMany()
  }

  public async getById(id: number) {
    return await this.ctx.repo.Task.findOne({
      where: {
        id,
      },
    })
  }

}
