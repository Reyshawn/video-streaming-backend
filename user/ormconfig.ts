import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions"

const config: MysqlConnectionOptions = {
  type: "mysql",
  host: '127.0.0.1',
  port: 3306,
  username: 'nest',
  password: 'password123',
  database: 'video_streaming',
  entities: ['dist/src/**/*.entity.js'],
  synchronize: true,
  // migrations: [
  //  'dist/src/db/migrations/**/*.js'
  // ]
}

export default config