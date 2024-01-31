import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('attendances')
export class Attendance extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({
    name: 'mode',
    nullable: false,
    length: '2',
    comment: '上班 or 下班',
  })
  mode: string;

  @Column({
    name: 'users_id',
    nullable: true,
  })
  usersId: string;

  @Column({
    name: 'name',
    nullable: true,
    default: '',
  })
  name: string;

  @Column({
    name: 'user_id',
    nullable: true,
    default: '',
  })
  userId: string;

  @Column({
    name: 'card_id',
    nullable: true,
    default: '',
  })
  cardId: string;

  @Column({ name: 'created_at', type: 'timestamptz', default: () => 'NOW()' })
  createdAt: Date;
}
