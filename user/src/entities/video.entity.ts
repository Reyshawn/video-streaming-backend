import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Video {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  extension: string

  @Column()
  length: number

  @Column()
  views: number

  @Column()
  likes: number

  @ManyToOne(type => User, user => user.videos)
  owner: User

  @Column()
  url: string
}