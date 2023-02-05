import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Video {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  mimetype: string

  @Column()
  length: number

  @ManyToOne(type => User, user => user.videos)
  owner: User

  @Column()
  url: string

  @Column()
  notes: string
}