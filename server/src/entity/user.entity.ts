import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Creator } from './creator.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @OneToMany(() => Creator, creator => creator.user, { nullable: true })
  creators?: Creator[];
}
