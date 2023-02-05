import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Video } from "./video.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  username: string

  @Column()
  password: string

  @OneToMany(type => Video, video => video.owner)
  videos: Video[]

  @Column()
  role: Permission
}


export enum Permission {
  normal,
  admin
}