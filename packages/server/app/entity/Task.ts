import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Category } from './Category'

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number

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

  @Column()
  gmtCreate: Date

  @Column({ nullable: true })
  gmtModify: Date

  @ManyToOne(() => Category, { nullable: false })
  category: Category
}
