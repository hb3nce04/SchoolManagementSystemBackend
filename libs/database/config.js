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
  Grade,
  GradeType,
  Absence,
  Message,
  Homework
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
    Grade,
    GradeType,
    Absence,
    Message,
    Homework
  ],
});

const userRepository = dataSource.getRepository("User");
const studentRepository = dataSource.getRepository("Student");
const teacherRepository = dataSource.getRepository("Teacher");
const bellRepository = dataSource.getRepository("Bell");
const classRepository = dataSource.getRepository("Class");
const classroomRepository = dataSource.getRepository("Classroom");
const lessonRepository = dataSource.getRepository("Lesson");
const enrollmentRepository = dataSource.getRepository("Enrollment");
const gradeRepository = dataSource.getRepository("Grade");
const gradeTypeRepository = dataSource.getRepository("GradeType");
const absenceRepository = dataSource.getRepository("Absence");
const messageRepository = dataSource.getRepository("Message");
const homeworkRepository = dataSource.getRepository("Homework");

export {
  dataSource as database,
  userRepository,
  studentRepository,
  teacherRepository,
  bellRepository,
  classRepository,
  classroomRepository,
  lessonRepository,
  enrollmentRepository,
  gradeRepository,
  gradeTypeRepository,
  absenceRepository,
  messageRepository,
  homeworkRepository
};
