import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
} from 'typeorm'

import { User } from 'src/users/entities/user.entity'
import { Company } from 'src/companies/entities/company.entity'

@Entity({ name: 'companies_users' })
export class CompaniesToUsers {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  companyId: string

  @Column()
  userId: string

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

  @ManyToOne(() => Company, (companyEntity) => companyEntity.companiesToUsers)
  company: Company

  @ManyToOne(() => User, (userEntity) => userEntity.companiesToUsers)
  user: User
}
