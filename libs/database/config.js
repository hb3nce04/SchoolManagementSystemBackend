import { DataSource } from "typeorm";

import {
  User,
  Student,
  Teacher,
  Bell,
  Class,
  Classroom,
  Lesson,
  Enrollment,
  Grades,
  GradeTypes,
  Absence,
} from "../database/entities.js";

var dataSource = new DataSource({
  type: "mysql",
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: true,
  //logging: ["query"],
  entities: [
    User,
    Student,
    Teacher,
    Bell,
    Class,
    Classroom,
    Lesson,
    Enrollment,
    Grades,
    GradeTypes,
    Absence,
  ],
});

const userRepository = dataSource.getRepository("User");
const studentRepository = dataSource.getRepository("Student");

export { dataSource as database, userRepository, studentRepository };
