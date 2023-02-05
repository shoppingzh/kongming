import 'egg'
import { Repository, Connection } from 'typeorm'
import Base from '../app/entity/Base'
import Category from '../app/entity/Category'
import Schedule from '../app/entity/Schedule'
import Task from '../app/entity/Task'

declare module 'egg' {
  interface Context {
    connection: Connection
    entity: {
      Base: any
      Category: any
      Schedule: any
      Task: any
    }
    repo: {
      Base: Repository<Base>
      Category: Repository<Category>
      Schedule: Repository<Schedule>
      Task: Repository<Task>
    }
  }
}
