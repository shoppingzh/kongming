import { Column, Entity } from 'typeorm'
import { Base } from './Base'

@Entity()
export class Schedule extends Base {
  @Column()
  percent: number

  @Column()
  description: string
}
