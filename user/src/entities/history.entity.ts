
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class History {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  userId: number

  @Column()
  videoId: number

  @Column()
  progress: number
}