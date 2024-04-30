import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Creator {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  generated_code: string;

  @ManyToOne(() => User, user => user.creators, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  user?: User;
}
