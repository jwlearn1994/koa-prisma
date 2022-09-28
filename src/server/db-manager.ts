import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({ log: ['query'] });

async function getTLsByTeacher(teacherId: number) {
  const result = await prisma.teacher.findMany({
    where: { id: teacherId },
    include: {
      lessons: true,
      Office: true,
    },
  });
  return result;
};

async function createTeacherLesson(lessonId: number, teacherId: number) {
  try {
    // https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#connect
    const result = await prisma.teacher.update({
      where: { id: teacherId },
      data: {
        lessons: {
          connect: { id: lessonId },
        },
      },
    });
    return result;
  } catch(error) {
    console.log(error.message);
  }
}

export default {
  getTLsByTeacher,
  createTeacherLesson,
}