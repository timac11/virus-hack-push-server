import {BaseEntity, Column, Entity, ManyToOne, PrimaryColumn} from 'typeorm';
import {User} from './user.entity';

@Entity('subscriptions')
export class Subscription extends BaseEntity {
  @PrimaryColumn('uuid')
  id!: string

  @Column()
  title!: string

  @Column()
  description!: string

  @Column()
  period!: string

  @Column()
  time!: string

  @ManyToOne(type => User)
  user!: User
}
