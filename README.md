# Koa Prisma

## Install
```bash
$ npm install typescript ts-node @types/node --save-dev
```

```json
// tsconfig.json
{
  "compilerOptions": {
    "sourceMap": true,
    "outDir": "dist",
    "strict": true,
    "lib": ["esnext"],
    "esModuleInterop": true
  }
}
```

## Init
```bash
$ npm install prisma --save-dev
$ npx prisma init --datasource-provider sqlite
```

## Edit Schema
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

model Office {
  id       Int       @id @default(autoincrement())
  name     String
  teachers Teacher[]
}

model Lesson {
  id       Int                @id @default(autoincrement())
  name     String
  teachers TeacherOnLessons[]
}

model Teacher {
  id       Int                @id @default(autoincrement())
  name     String
  Office   Office?            @relation(fields: [officeId], references: [id])
  officeId Int?
  lessons  TeacherOnLessons[]
}

model TeacherOnLessons {
  teacher   Teacher @relation(fields: [teacherId], references: [id])
  lesson    Lesson  @relation(fields: [lessonId], references: [id])
  teacherId Int
  lessonId  Int

  @@id([teacherId, lessonId])
}
```

## Migrate Schema
套用 schema 修改到 db 中，並命名此 migration
```bash
$ npx prisma migrate dev --name init
```

## Generate Client code
安裝 @prisma/client
```bash
$ npm install @prisma/client
```
每次修改 schema 後都要記得 generate 一次，因為 prisma 的 client code 是靜態由 schema 產生的
```bash
$ npx prisma generate
```

## Use prisma client in code
