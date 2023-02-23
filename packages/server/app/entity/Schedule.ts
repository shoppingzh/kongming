import { Column, Entity, ManyToOne } from 'typeorm'
import { Base } from './Base'
import { Task } from './Task'

@Entity()
export class Schedule extends Base {
  @Column()
  percent: number

  @Column({ nullable: true })
  description: string

  @Column({ nullable: true })
  time: Date

  @ManyToOne(() => Task, (task) => task.scheduleList)
  task: Task
}
