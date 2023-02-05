import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Base {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  gmtCreate: Date

  @Column({ nullable: true })
  gmtModify: Date

  constructor(id: number) {
    this.id = id
  }
}
