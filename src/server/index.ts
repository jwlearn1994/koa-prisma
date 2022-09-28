import Koa from 'koa'
import koaLogger from 'koa-logger'
import koaBody from 'koa-body'
import apiRouter from '@/server/router'

const PORT = 8000;

function startKoaServer() {
  const app = new Koa();

  app.use(koaLogger());
  app.use(koaBody());

  app.use(apiRouter.routes());
  app.use(apiRouter.allowedMethods());

  return app;
}

async function startServer() {
  const app = startKoaServer();

  app.listen(PORT, () => console.log(`🚀 Koa Server ready at http://localhost:${PORT}`))
}

export default startServer
