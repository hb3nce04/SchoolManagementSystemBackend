import typeorm from "typeorm";

const User = new typeorm.EntitySchema({
  name: "User",
  tableName: "users",
  columns: {
    id: {
      primary: true,
      width: 1,
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
      width: 1,
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
      length: 255,
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
      width: 1,
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
      width: 16,
    },
  },
});

export { User, Student, Bell, Class };
