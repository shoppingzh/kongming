import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  description: string

  @Column()
  target: string

  @Column()
  important: number

  @Column()
  urgent: number

  @Column()
  weight: number

  @Column()
  startTime: Date

  @Column()
  endTime: Date

  @Column()
  gmtCreate: Date

  @Column()
  gmtModify: Date
}
