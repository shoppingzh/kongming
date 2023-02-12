// This file is created by egg-ts-helper@1.34.1
// Do not modify this file!!!!!!!!!

import 'egg'
import ExportBaseController from '../../../app/controller/BaseController'
import ExportCategoryController from '../../../app/controller/CategoryController'
import ExportHomeController from '../../../app/controller/HomeController'
import ExportScheduleController from '../../../app/controller/ScheduleController'
import ExportTaskController from '../../../app/controller/TaskController'

declare module 'egg' {
  interface IController {
    baseController: ExportBaseController
    categoryController: ExportCategoryController
    homeController: ExportHomeController
    scheduleController: ExportScheduleController
    taskController: ExportTaskController
  }
}
