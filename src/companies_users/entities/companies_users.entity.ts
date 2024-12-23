import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm'

import { User } from 'src/users/entities/user.entity'
import { Company } from 'src/companies/entities/company.entity'

@Entity({ name: 'companies_users' })
export class CompaniesToUsers {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ name: 'company_id', nullable: false })
  companyId: string

  @Column({ name: 'user_id', nullable: false })
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

  @ManyToOne(() => Company, (companyEntity) => companyEntity.users, {
    eager: true,
  })
  @JoinColumn({ name: 'company_id' })
  company: Company

  @ManyToOne(() => User, (userEntity) => userEntity.companies, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: User
}
