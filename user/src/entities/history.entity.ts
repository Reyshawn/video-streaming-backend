import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Video } from "./video.entity"

@Entity()
export class History {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(type => User)
  user: User

  @ManyToOne(type => Video)
  video: Video

  @Column()
  progress: number // 0 - 1

  @Column()
  hasWatched: boolean
}