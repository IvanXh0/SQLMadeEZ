import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Creator } from './creator.entity';

@Entity()
export class User {
  @PrimaryColumn()
  userId: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @OneToMany(() => Creator, creator => creator.user, { nullable: true })
  creators?: Creator[];
}
