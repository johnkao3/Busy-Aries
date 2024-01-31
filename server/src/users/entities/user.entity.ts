import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'username', nullable: false })
  username: string;

  @Column({ name: 'legal_name', nullable: true })
  legalName: string;

  @Column({ name: 'nick_name', nullable: true })
  nickName: string;

  @Column({ name: 'password', type: 'text', nullable: false })
  password: string;

  @Column({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;

  @Column({ name: 'role', type: 'text', default: 'EMPLOYEE' })
  role: string;
}
