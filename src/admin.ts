import Koa from 'koa'
import AdminJS, { ResourceWithOptions } from 'adminjs'
import AdminJSKoa from '@adminjs/koa'
import * as AdminJSPrisma from '@adminjs/prisma'
import { PrismaClient } from '@prisma/client'
import { DMMFClass } from '@prisma/client/runtime'

const prisma = new PrismaClient()

AdminJS.registerAdapter({
  Resource: AdminJSPrisma.Resource,
  Database: AdminJSPrisma.Database,
})

const PORT = 8001

const getResources = (dmmf: DMMFClass) => {
  return ['Office', 'Lesson', 'Teacher'].reduce(
    (total: ResourceWithOptions[], modelName: string) => {
      total.push({
        resource: { model: dmmf.modelMap[modelName], client: prisma },
        options: {},
      });
      return total;
    },
    [] as ResourceWithOptions[],
  );
}

const start = async () => {
  const app = new Koa()
  const dmmf = ((prisma as any)._baseDmmf as DMMFClass)
  const admin = new AdminJS({
    resources: getResources(dmmf),
    rootPath: '/admin',
  })

  const router = AdminJSKoa.buildRouter(admin, app)

  app
    .use(router.routes())
    .use(router.allowedMethods())

  app.listen(PORT, () => {
    console.log(`AdminJS available at http://localhost:${PORT}${admin.options.rootPath}`)
  })
}

start()