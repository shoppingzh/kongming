import 'egg'
import { Repository, Connection } from 'typeorm'
import Category from '../app/entity/Category'

declare module 'egg' {
  interface Context {
    connection: Connection
    entity: {
      Category: any
    }
    repo: {
      Category: Repository<Category>
    }
  }
}
