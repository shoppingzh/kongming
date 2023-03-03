import 'egg'
import { Repository, Connection } from 'typeorm'
import Base from '../app/entity/Base'
import Category from '../app/entity/Category'
import Schedule from '../app/entity/Schedule'
import Task from '../app/entity/Task'
import TaskParticipant from '../app/entity/TaskParticipant'

declare module 'egg' {
  interface Context {
    connection: Connection
    entity: {
      Base: any
      Category: any
      Schedule: any
      Task: any
      TaskParticipant: any
    }
    repo: {
      Base: Repository<Base>
      Category: Repository<Category>
      Schedule: Repository<Schedule>
      Task: Repository<Task>
      TaskParticipant: Repository<TaskParticipant>
    }
  }
}
