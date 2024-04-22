import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Creator {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  generated_code: string;
}
