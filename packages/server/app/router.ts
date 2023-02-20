import { Application } from 'egg'

export default (app: Application) => {
  const { controller, router } = app
  const apiRouter = app.router.namespace('/api')

  router.get('/', controller.homeController.index)

  apiRouter.post('/category', controller.categoryController.create)
  apiRouter.put('/category', controller.categoryController.update)
  apiRouter.get('/category', controller.categoryController.list)
  apiRouter.delete('/category', controller.categoryController.remove)

  apiRouter.post('/task', controller.taskController.create)
  apiRouter.put('/task', controller.taskController.update)
  apiRouter.delete('/task', controller.taskController.remove)
  apiRouter.get('/task', controller.taskController.list)

  apiRouter.post('/schedule', controller.scheduleController.create)
  apiRouter.delete('/schedule', controller.scheduleController.remove)
  apiRouter.get('/schedule', controller.scheduleController.list)
}
