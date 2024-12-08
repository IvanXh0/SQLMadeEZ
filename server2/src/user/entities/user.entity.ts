import { Creator } from 'src/creator/entities/creator.entity';
import { Subscription } from 'src/subscriptions/entities/subscription.entity';
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

  @OneToMany(() => Subscription, (subscription) => subscription.user, {
    nullable: true,
  })
  subscriptions?: Subscription[];
}
