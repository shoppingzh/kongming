import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Schedule {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  percent: number

  @Column()
  description: string

  @Column()
  gmtCreate: Date

  @Column()
  gmtModify: Date
}
