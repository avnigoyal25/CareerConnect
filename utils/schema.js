import { boolean, date, datetime, decimal, float, int, mysqlEnum, mysqlTable, primaryKey, text, time, timestamp, varchar } from "drizzle-orm/mysql-core";

export const INTERVIEW_EXPERIENCE = mysqlTable('interview_experience', {
    id: int('id').autoincrement().notNull().primaryKey(),
    name: varchar('name', { length: 100 }).notNull(),
    course: varchar('course', { length: 100 }).notNull(),
    branch: varchar('branch', { length: 100 }).notNull(),
    yearOfPassout: int('year_of_passout').notNull(),
    cgpa: decimal('cgpa', { precision: 3, scale: 2 }).notNull(),
    contactNo: varchar('contact_no', { length: 15 }).default(null),
    linkedinProfile: varchar('linkedin_profile', { length: 255 }).notNull(),
    company: varchar('company', { length: 100 }).notNull(),
    jobProfile: varchar('job_profile', { length: 100 }).notNull(),
    jobLocation: varchar('job_location', { length: 100 }).notNull(),
    packageOffered: decimal('package_offered', { precision: 10, scale: 2 }).notNull(),
    studentsHired: int('students_hired').notNull(),
    rounds: int('rounds').notNull(),
    skillsAsked: text('skills_asked').notNull(),
    experience: text('experience').notNull(),
    interviewLevel: mysqlEnum('interview_level', ['Easy', 'Moderate', 'Hard']).notNull()
});

export const USER = mysqlTable('user', {
    id: int('id').autoincrement().notNull().primaryKey(),
    name: varchar('name', { length: 100 }).notNull(),
    username: varchar('username', { length: 50 }).notNull().unique(),
    password: varchar('password', { length: 255 }).notNull(),
    email: varchar('email', { length: 100 }).notNull().unique()
});

export const QUERY = mysqlTable('query', {
    id: int('id').autoincrement().notNull().primaryKey(),
    userId: int('user_id').notNull().references(() => USER.id),
    title: varchar('title', { length: 255 }).notNull(),
    description: text('description').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
});

export const REPLY = mysqlTable('reply', {
    id: int('id').autoincrement().notNull().primaryKey(),
    queryId: int('query_id').notNull().references(() => QUERY.id),
    userId: int('user_id').notNull().references(() => USER.id),
    message: text('message').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
});