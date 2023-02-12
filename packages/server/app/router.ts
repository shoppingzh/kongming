import { Application } from 'egg'

export default (app: Application) => {
  const { controller, router } = app

  router.get('/', controller.homeController.index)

  router.post('/api/category', controller.categoryController.create)
  router.put('/api/category', controller.categoryController.update)
  router.get('/api/category', controller.categoryController.list)
  router.delete('/api/category', controller.categoryController.remove)

  router.post('/api/task', controller.taskController.create)
  router.put('/api/task', controller.taskController.update)
  router.delete('/api/task', controller.taskController.remove)
  router.get('/api/task', controller.taskController.list)

  router.post('/api/schedule', controller.scheduleController.create)
  router.delete('/api/schedule', controller.scheduleController.remove)
  router.get('/api/schedule', controller.scheduleController.list)
}
