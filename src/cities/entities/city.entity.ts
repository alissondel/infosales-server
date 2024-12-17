import { State } from 'src/states/entities/state.entity'
import { Address } from 'src/addresses/entities/address.entity'

import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Company } from 'src/companies/entities/company.entity'

@Entity({ name: 'cities ' })
export class City {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ name: 'name', nullable: false })
  name: string

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

  @Column({ name: 'state_id', nullable: false })
  stateId: string

  @ManyToOne(() => State, (state) => state.cities)
  @JoinColumn({ name: 'state_id', referencedColumnName: 'id' })
  state?: State

  @OneToMany(() => Address, (addressEntity) => addressEntity.city)
  addresses?: Address[]

  @OneToMany(() => Company, (companyEntity) => companyEntity.city)
  companies?: Company[]
}
