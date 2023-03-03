import { Column, Entity, ManyToOne } from 'typeorm'
import { Base } from './Base'
import { Task } from './Task'

@Entity()
export class TaskParticipant extends Base {

  @Column()
    name: string

  @ManyToOne(() => Task, (task) => task.participants)
    task: Task

}
