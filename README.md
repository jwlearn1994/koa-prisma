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
  // default is in node_modules/.prisma/client
  // output to src to controled by git
  // output   = "../src/generated/client"
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

// Implicit many-to-many relations
model Lesson {
  id       Int       @id @default(autoincrement())
  name     String
  teachers Teacher[]
}

model Teacher {
  id       Int      @id @default(autoincrement())
  name     String
  Office   Office?  @relation(fields: [officeId], references: [id])
  officeId Int?
  lessons  Lesson[]
}

// Explicit many-to-many relations
// this model can be auto generated or manual created if already mention the relations between two model, prisma will auto generate the middle table for us
// model TeacherOnLessons {
//   id        Int     @id @default(autoincrement())
//   teacher   Teacher @relation(fields: [teacherId], references: [id])
//   lesson    Lesson  @relation(fields: [lessonId], references: [id])
//   teacherId Int
//   lessonId  Int
// }

```

> many to many relation 有兩種定義方式，一種是自行定義 model 作為中間表使用，可參考[此範例](https://www.prisma.io/docs/concepts/components/prisma-schema/relations/many-to-many-relations#explicit-many-to-many-relations)，也可以直接關聯兩個 model 透過 prisma 自動生成中間表的方式則參考[此範例](https://www.prisma.io/docs/concepts/components/prisma-schema/relations/many-to-many-relations#implicit-many-to-many-relations)。

> 兩種使用方式會有些微不同，需要特別注意。

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
