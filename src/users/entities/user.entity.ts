import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm'

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: false, type: 'varchar' })
  name: string

  @Column({ nullable: false, type: 'varchar' })
  email: string

  @Column({ nullable: false, type: 'varchar' })
  password: string

  @Column({ name: 'type_user', nullable: false, type: 'integer' })
  typeUser: number

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
}
