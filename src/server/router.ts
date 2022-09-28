import KoaRouter from '@koa/router'
import dbManager from './db-manager'

const router = new KoaRouter({
  prefix: '/api'
})

router.get('/hello', (ctx) => {
  const { id } = ctx.query
  ctx.body = {
    hello: 'hello',
    id,
  }
})

router.get('/teacher', async (ctx) => {
  const { id } = ctx.query;
  const result = await dbManager.getTLsByTeacher(Number(id));
  ctx.body = result;
})

router.post('/match/teacher-lesson', async (ctx) => {
  const { body: { lessonId, teacherId } } = ctx.request;
  const result = await dbManager.createTeacherLesson(lessonId, teacherId);
  ctx.body = result;
})

export default router
