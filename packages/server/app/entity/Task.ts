import { Column, Entity, ManyToOne, OneToMany } from 'typeorm'
import { Base } from './Base'
import { Category } from './Category'
import { Schedule } from './Schedule'

@Entity()
export class Task extends Base {

  @Column()
    title: string

  @Column({ nullable: true })
    description: string

  @Column()
    target: string

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

  @ManyToOne(() => Category, { nullable: true, eager: true })
    category: Category

  @OneToMany(() => Schedule, (schedule) => schedule.task)
    scheduleList: Schedule[]

}
