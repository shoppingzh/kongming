import { Column, Entity, ManyToOne, OneToMany } from 'typeorm'
import { Base } from './Base'
import { Category } from './Category'
import { Schedule } from './Schedule'
import { TaskParticipant } from './TaskParticipant'

export const importantMap = {
  '-1': '不重要',
  '0': '重要',
  '1': '非常重要',
}

export const urgentMap = {
  '-1': '不紧急',
  '0': '紧急',
  '1': '非常紧急',
}

@Entity()
export class Task extends Base {

  @Column()
    title: string

  @Column({ nullable: true })
    description: string

  @Column()
    target: string

  @Column({ nullable: true })
    wbs: string

  @Column({ default: 0 })
    important: number

  @Column({ default: 0 })
    urgent: number

  @Column({ default: 0 })
    weight: number

  @Column({ nullable: true })
    startTime: Date

  @Column({ nullable: true })
    endTime: Date

  @ManyToOne(() => Category, { nullable: true })
    category: Category

  @OneToMany(() => Schedule, (schedule) => schedule.task, { nullable: true })
    scheduleList: Schedule[]

  @OneToMany(() => TaskParticipant, (participant) => participant.task, { nullable: true })
    participants: TaskParticipant[]

  public get priority() {
    return [importantMap[this.important], urgentMap[this.urgent]].join('')
  }

}
