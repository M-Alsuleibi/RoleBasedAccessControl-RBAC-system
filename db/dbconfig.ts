import { DataSource } from "typeorm";
import { User } from "./entities/User.js";
import { Role } from "./entities/Role.js";
import { Permission } from "./entities/Permission.js";
import { Profile } from "./entities/Profile.js";

export const dataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [User, Profile, Role, Permission ],
  synchronize: true
});


export const initDB = async () =>
  await dataSource.initialize().then(() => {
    console.log("Connected to mysql!");
  }).catch(err => {
    console.error('Failed to connect to mysql: ' + err);
  });

// export default dataSource;