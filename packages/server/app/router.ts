import { Application } from 'egg'

export default (app: Application) => {
  const { controller, router } = app

  router.get('/', controller.homeController.index)
  router.post('/api/category', controller.categoryController.create)
  router.get('/api/category', controller.categoryController.list)
  router.delete('/api/category', controller.categoryController.remove)
}
