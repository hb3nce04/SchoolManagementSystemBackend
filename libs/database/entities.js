import typeorm from "typeorm";

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
      nullable: true,
    },
    role: {
      type: "varchar",
      length: 1,
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
      width: 5,
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
      nullable: true,
    },
  },
  relations: {
    User: {
      target: "User",
      type: "one-to-one",
      joinColumn: { name: "user_id" },
      onDelete: "RESTRICT",
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
      width: 5,
      type: "int",
      generated: true,
    },
    prefix_title: {
      type: "varchar",
      length: 16,
      nullable: true,
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
      onDelete: "RESTRICT",
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
      width: 5,
      type: "int",
      generated: true,
    },
    start_time: {
      type: "time",
    },
    end_time: {
      type: "time",
    },
  },
});

const Class = new typeorm.EntitySchema({
  name: "Class",
  tableName: "classes",
  columns: {
    id: {
      primary: true,
      width: 5,
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
      nullable: true,
    },
  },
  relations: {
    Teacher: {
      target: "Teacher",
      type: "one-to-one",
      joinColumn: { name: "head_teacher_id" },
      onDelete: "RESTRICT",
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
      width: 5,
      type: "int",
      generated: true,
    },
    name: {
      type: "varchar",
      length: 16,
    },
  },
});

const Lesson = new typeorm.EntitySchema({
  name: "Lesson",
  tableName: "lessons",
  columns: {
    id: {
      primary: true,
      width: 5,
      type: "int",
      generated: true,
    },
    name: {
      type: "varchar",
      length: 16,
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
      onDelete: "RESTRICT",
      onUpdate: "CASCADE",
    },
    Class: {
      target: "Class",
      type: "many-to-one",
      joinColumn: { name: "class_id" },
      onDelete: "RESTRICT",
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
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    Lesson: {
      target: "Lesson",
      type: "many-to-one",
      joinColumn: { name: "lesson_id" },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
  },
});

const Grade = new typeorm.EntitySchema({
  name: "Grade",
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
      length: 32,
    },
    grade: {
      type: "varchar",
      length: 1,
    },
    extra_weight: {
      type: "boolean",
      default: false,
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
    GradeType: {
      target: "GradeType",
      type: "many-to-one",
      joinColumn: { name: "grade_type_id" },
      onDelete: "RESTRICT",
      onUpdate: "CASCADE",
    },
  },
});

const GradeType = new typeorm.EntitySchema({
  name: "GradeType",
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
    type: {
      type: "varchar",
      length: 64,
    },
    description: {
      type: "text",
      nullable: true,
    },
    verified: {
      type: "boolean",
      default: false,
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

const Message = new typeorm.EntitySchema({
  name: "Message",
  tableName: "messages",
  columns: {
    id: {
      primary: true,
      width: 5,
      type: "int",
      generated: true,
    },
    title: {
      type: "varchar",
      length: 16,
    },
    body: {
      type: "text",
    },
    description: {
      type: "text",
      nullable: true,
    },
    important: {
      type: "boolean",
      default: false,
    },
    until_date: {
      type: "date",
    },
    created_at: {
      type: "datetime",
      default: () => "CURRENT_TIMESTAMP",
    },
  },
  relations: {
    Class: {
      target: "Class",
      type: "many-to-one",
      joinColumn: { name: "class_id" },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    Teacher: {
      target: "Teacher",
      type: "many-to-one",
      joinColumn: { name: "teacher_id" },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
  },
});

const Homework = new typeorm.EntitySchema({
  name: "Homework",
  tableName: "homeworks",
  columns: {
    id: {
      primary: true,
      width: 5,
      type: "int",
      generated: true,
    },
    body: {
      type: "text",
    },
    until_date: {
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
  Grade,
  GradeType,
  Absence,
  Message,
  Homework,
};
