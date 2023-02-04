import 'egg'
import { Repository, Connection } from 'typeorm'
import Category from '../app/entity/Category'
import Schedule from '../app/entity/Schedule'
import Task from '../app/entity/Task'

declare module 'egg' {
  interface Context {
    connection: Connection
    entity: {
      Category: any
      Schedule: any
      Task: any
    }
    repo: {
      Category: Repository<Category>
      Schedule: Repository<Schedule>
      Task: Repository<Task>
    }
  }
}
