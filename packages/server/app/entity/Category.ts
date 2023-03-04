import { Column, Entity } from 'typeorm'
import { Base } from './Base'

@Entity()
export class Category extends Base {

  @Column()
    name: string

  @Column({ nullable: true })
    color: string

}
