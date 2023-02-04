// This file is created by egg-ts-helper@1.34.1
// Do not modify this file!!!!!!!!!

import 'egg'
import ExportBaseController from '../../../app/controller/BaseController'
import ExportCategoryController from '../../../app/controller/CategoryController'
import ExportHomeController from '../../../app/controller/HomeController'

declare module 'egg' {
  interface IController {
    baseController: ExportBaseController
    categoryController: ExportCategoryController
    homeController: ExportHomeController
  }
}
