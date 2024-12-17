import { User } from 'src/users/entities/user.entity'
import { City } from 'src/cities/entities/city.entity'

import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity({ name: 'addresses' })
export class Address {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: false })
  street: string

  @Column({ name: 'number_address', nullable: false })
  numberAddress: number

  @Column({ nullable: false })
  cep: string

  @Column({ nullable: false })
  neighborhood: string

  @Column({ nullable: false })
  complement: string

  @Column({ default: true, type: 'boolean' })
  status: boolean

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date

  @Column({ name: 'created_user', type: 'varchar', nullable: false })
  createdUser!: string

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', nullable: true })
  updatedAt: Date

  @Column({ name: 'updated_user', type: 'varchar', nullable: true })
  updatedUser!: string

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz', nullable: true })
  deletedAt: Date

  @Column({ name: 'deleted_user', type: 'varchar', nullable: true })
  deletedUser!: string

  @Column({ name: 'user_id', nullable: false })
  userId: string

  @Column({ name: 'city_id', nullable: false })
  cityId: string

  @ManyToOne(() => User, (user) => user.addresses)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user?: User

  @ManyToOne(() => City, (city) => city.addresses)
  @JoinColumn({ name: 'city_id', referencedColumnName: 'id' })
  city?: City
}
