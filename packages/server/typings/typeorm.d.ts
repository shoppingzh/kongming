import 'egg'
import { Repository, Connection } from 'typeorm'
import User from '../app/entity/User'

declare module 'egg' {
  interface Context {
    connection: Connection
    entity: {
      User: any
    }
    repo: {
      User: Repository<User>
    }
  }
}
