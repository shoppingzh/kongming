import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  gmtCreate: Date

  @Column({ nullable: true })
  gmtModify: Date

  constructor(id: number) {
    this.id = id
  }
}
