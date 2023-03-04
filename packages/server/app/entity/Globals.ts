import { Column, Entity } from 'typeorm'
import { Base } from './Base'

@Entity({ name: 't_globals' })
export class Globals extends Base {

  @Column({ comment: '平台拥有者', nullable: false })
    owner: string

}
