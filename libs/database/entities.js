import typeorm from "typeorm";

// ALAPÉRTELMEZETT ÉRTÉK SEHOL SINCS BEÁLLÍTVA
// CASCADEKET ÁTGONDOL
// TÁBLA ÉS ENTITY NEVEKET ÁTNÉZ ÉS ÁTGONDOL
const User = new typeorm.EntitySchema({
  name: "User",
  tableName: "users",
  columns: {
    id: {
      primary: true,
      width: 5,
      type: "int",
      generated: true,
    },
    username: {
      type: "varchar",
      length: 25,
    },
    password: {
      type: "varchar",
      length: 72,
    },
    email: {
      type: "varchar",
    },
    phone_number: {
      type: "varchar",
      length: 12,
    },
    role: {
      type: "varchar",
      length: 1,
      nullable: false,
      default: 0,
    },
    refresh_token: {
      type: "varchar",
      length: 255,
      nullable: true,
    },
    last_login: {
      type: "datetime",
      nullable: true,
    },
    created_at: {
      type: "datetime",
      default: () => "CURRENT_TIMESTAMP",
    },
  },
});

const Student = new typeorm.EntitySchema({
  name: "Student",
  tableName: "students",
  columns: {
    id: {
      primary: true,
      width: 4,
      type: "int",
      generated: true,
    },
    number: {
      type: "varchar",
      length: 11,
    },
    first_name: {
      type: "varchar",
      length: 32,
    },
    last_name: {
      type: "varchar",
      length: 32,
    },
    birth: {
      type: "date",
    },
    address: {
      type: "varchar",
      length: 64,
    },
    bank_account_number: {
      type: "varchar",
      length: 32,
    },
  },
  relations: {
    User: {
      target: "User",
      type: "one-to-one",
      joinColumn: { name: "user_id" },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    Class: {
      target: "Class",
      type: "many-to-one",
      joinColumn: { name: "class_id" },
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    },
  },
});

const Teacher = new typeorm.EntitySchema({
  name: "Teacher",
  tableName: "teachers",
  columns: {
    id: {
      primary: true,
      width: 3,
      type: "int",
      generated: true,
    },
    prefix_title: {
      type: "varchar",
      length: 16,
    },
    first_name: {
      type: "varchar",
      length: 32,
    },
    last_name: {
      type: "varchar",
      length: 32,
    },
  },
  relations: {
    User: {
      target: "User",
      type: "one-to-one",
      joinColumn: { name: "user_id" },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
  },
});

const Bell = new typeorm.EntitySchema({
  name: "Bell",
  tableName: "bell_schedules",
  columns: {
    id: {
      primary: true,
      width: 1,
      type: "int",
      generated: true,
    },
    start_time: {
      type: "time",
      nullable: false,
    },
    end_time: {
      type: "time",
      nullable: false,
    },
  },
});

const Class = new typeorm.EntitySchema({
  name: "Class",
  tableName: "classes",
  columns: {
    id: {
      primary: true,
      width: 2,
      type: "int",
      generated: true,
    },
    grade: {
      type: "varchar",
      length: 2,
    },
    department: {
      type: "varchar",
      length: 3,
    },
    start_year: {
      type: "int",
      width: 4,
    },
    specialization: {
      type: "varchar",
      length: 32,
    },
  },
  relations: {
    Teacher: {
      target: "Teacher",
      type: "one-to-one",
      joinColumn: { name: "head_teacher_id" },
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    },
  },
});

const Classroom = new typeorm.EntitySchema({
  name: "Classroom",
  tableName: "classrooms",
  columns: {
    id: {
      primary: true,
      width: 2,
      type: "int",
      generated: true,
    },
    name: {
      type: "varchar",
      length: 16,
      nullable: false,
    },
  },
});

const Lesson = new typeorm.EntitySchema({
  name: "Lesson",
  tableName: "lessons",
  columns: {
    id: {
      primary: true,
      width: 4,
      type: "int",
      generated: true,
    },
    name: {
      type: "varchar",
      length: 16,
      nullable: false,
    },
    week_day: {
      type: "int",
      width: 1,
    },
  },
  relations: {
    Classroom: {
      target: "Classroom",
      type: "many-to-one",
      joinColumn: { name: "classroom_id" },
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    },
    Bell: {
      target: "Bell",
      type: "many-to-one",
      joinColumn: { name: "schedule_id" },
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    },
    Class: {
      target: "Class",
      type: "many-to-one",
      joinColumn: { name: "class_id" },
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    },
    Teacher: {
      target: "Teacher",
      type: "many-to-one",
      joinColumn: true, // { name: "teacher_id" }
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    },
  },
});

const Enrollment = new typeorm.EntitySchema({
  name: "Enrollment",
  tableName: "enrollments",
  columns: {
    id: {
      primary: true,
      width: 5,
      type: "int",
      generated: true,
    },
  },
  relations: {
    Student: {
      target: "Student",
      type: "many-to-one",
      joinColumn: { name: "student_id" },
    },
    Lesson: {
      target: "Lesson",
      type: "many-to-one",
      joinColumn: { name: "lesson_id" },
    },
  },
});

const Grades = new typeorm.EntitySchema({
  name: "Grades",
  tableName: "grades",
  columns: {
    id: {
      primary: true,
      width: 5,
      type: "int",
      generated: true,
    },
    topic: {
      type: "varchar",
      length: 15,
    },
    grade: {
      type: "int",
      width: 1,
    },
    extra_weight: {
      // boolean
      type: "tinyint",
      default: 0,
    },
    created_at: {
      type: "datetime",
      default: () => "CURRENT_TIMESTAMP",
    },
  },
  relations: {
    Enrollment: {
      target: "Enrollment",
      type: "many-to-one",
      joinColumn: { name: "enrollment_id" },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    GradeTypes: {
      target: "GradeTypes",
      type: "many-to-one",
      joinColumn: { name: "grade_type_id" },
      onDelete: "RESTRICT",
      onUpdate: "CASCADE",
    },
  },
});

const GradeTypes = new typeorm.EntitySchema({
  name: "GradeTypes",
  tableName: "grade_types",
  columns: {
    id: {
      primary: true,
      width: 5,
      type: "int",
      generated: true,
    },
    type: {
      type: "varchar",
      length: 32,
    },
  },
});

const Absence = new typeorm.EntitySchema({
  name: "Absence",
  tableName: "absences",
  columns: {
    id: {
      primary: true,
      width: 5,
      type: "int",
      generated: true,
    },
    absence_at: {
      type: "date",
    },
    created_at: {
      type: "datetime",
      default: () => "CURRENT_TIMESTAMP",
    },
  },
  relations: {
    Enrollment: {
      target: "Enrollment",
      type: "many-to-one",
      joinColumn: { name: "enrollment_id" },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
  },
});

export {
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
};
