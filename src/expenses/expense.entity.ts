import { User } from 'src/user/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class Expense {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  date: string;

  @Column()
  cost: number;

  @Column({ name: 'original_cost' })
  originalCost: number;

  @Column({ name: 'paid_by' })
  paidBy: string;

  @Column({ name: 'type_id' })
  typeId: string;

  @ManyToMany(() => User)
  @JoinTable()
  sharedBy: string[];

  @ManyToMany(() => User)
  @JoinTable()
  settleBy: User[];
}
