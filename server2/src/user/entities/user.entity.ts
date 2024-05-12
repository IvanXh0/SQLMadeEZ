import { Creator } from 'src/creator/entities/creator.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn()
  userId: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @OneToMany(() => Creator, (creator) => creator.user, {
    nullable: true,
    cascade: true,
  })
  creators?: Creator[];
}
