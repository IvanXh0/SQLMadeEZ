import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Creator {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  generated_code: string;

  @ManyToOne(() => User, (user) => user.creators, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  user?: User;
}
