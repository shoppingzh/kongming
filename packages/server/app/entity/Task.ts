import { Column, Entity, ManyToOne } from 'typeorm'
import { Base } from './Base'
import { Category } from './Category'

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

  @Column()
  startTime: Date

  @Column()
  endTime: Date

  @ManyToOne(() => Category, { nullable: false, eager: true })
  category: Category
}
