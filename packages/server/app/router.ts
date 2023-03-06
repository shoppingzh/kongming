import { Application } from 'egg'

export default (app: Application) => {
  const { controller, router } = app

  const apiRouter = app.router.namespace('/api')

  router.get('/', controller.homeController.index)
  apiRouter.post('/login', app.passport.authenticate('local', {
    successReturnToOrRedirect: '/api/globals'
  }))

  apiRouter.get('/globals', controller.globalsController.get)
  apiRouter.post('/globals', controller.globalsController.update)
  apiRouter.put('/globals', controller.globalsController.update)

  apiRouter.post('/category', controller.categoryController.create)
  apiRouter.put('/category', controller.categoryController.update)
  apiRouter.get('/category', controller.categoryController.list)
  apiRouter.delete('/category', controller.categoryController.remove)
  apiRouter.get('/category/one', controller.categoryController.getById)

  apiRouter.post('/task', controller.taskController.create)
  apiRouter.put('/task', controller.taskController.update)
  apiRouter.delete('/task', controller.taskController.remove)
  apiRouter.get('/task', controller.taskController.list)
  apiRouter.get('/task/one', controller.taskController.getById)
  apiRouter.get('/task/export', controller.taskController.export)

  apiRouter.post('/schedule', controller.scheduleController.create)
  apiRouter.delete('/schedule', controller.scheduleController.remove)
  apiRouter.put('/schedule', controller.scheduleController.update)
  apiRouter.get('/schedule', controller.scheduleController.list)
  apiRouter.get('/schedule/one', controller.scheduleController.getById)
}
