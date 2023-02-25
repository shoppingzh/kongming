import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export abstract class Base {

  @PrimaryGeneratedColumn()
    id: number

  @Column()
    gmtCreate: Date

  @Column({ nullable: true })
    gmtModify: Date

  constructor(id?: number) {
    if (id) {
      this.id = id
    }
  }

}
