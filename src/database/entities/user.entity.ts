import {BaseEntity, Column, Entity, PrimaryColumn, PrimaryGeneratedColumn} from 'typeorm'

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: string

  @Column()
  tokenId!: string
}
