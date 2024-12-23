import { City } from 'src/cities/entities/city.entity'
import { CompaniesToUsers } from 'src/companies_users/entities/companies_users.entity'

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm'

@Entity({ name: 'companies' })
export class Company {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ name: 'company_name', nullable: false, type: 'varchar' })
  companyName: string

  @Column({ name: 'trade_name', nullable: false, type: 'varchar' })
  tradeName: string

  @Column({ nullable: false, type: 'varchar' })
  cnpj: string

  @Column({ name: 'state_registration', nullable: true, type: 'varchar' })
  stateRegistration: string

  @Column({ name: 'municipal_registration', nullable: true, type: 'varchar' })
  municipalRegistration: string

  @Column({ nullable: true, type: 'varchar' })
  responsibly: string

  @Column({ nullable: true, type: 'varchar' })
  email: string

  @Column({ name: 'number_phone', nullable: true, type: 'varchar' })
  numberPhone: string

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

  @Column({ name: 'city_id', nullable: false })
  cityId: string

  @ManyToOne(() => City, (cityEntity) => cityEntity.companies)
  @JoinColumn({ name: 'city_id', referencedColumnName: 'id' })
  city?: City

  @OneToMany(() => CompaniesToUsers, (companyUser) => companyUser.company)
  users: CompaniesToUsers[]
}
