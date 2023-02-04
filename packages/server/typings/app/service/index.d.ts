// This file is created by egg-ts-helper@1.34.1
// Do not modify this file!!!!!!!!!

import 'egg'
type AnyClass = new (...args: any[]) => any
type AnyFunc<T = any> = (...args: any[]) => T
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>
type AutoInstanceType<
  T,
  U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T
> = U extends AnyClass ? InstanceType<U> : U
import ExportBaseService from '../../../app/service/BaseService'
import ExportCategoryService from '../../../app/service/CategoryService'
import ExportScheduleService from '../../../app/service/ScheduleService'
import ExportTaskService from '../../../app/service/TaskService'

declare module 'egg' {
  interface IService {
    baseService: AutoInstanceType<typeof ExportBaseService>
    categoryService: AutoInstanceType<typeof ExportCategoryService>
    scheduleService: AutoInstanceType<typeof ExportScheduleService>
    taskService: AutoInstanceType<typeof ExportTaskService>
  }
}
