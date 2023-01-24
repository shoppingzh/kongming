// This file is created by egg-ts-helper@1.34.1
// Do not modify this file!!!!!!!!!

import 'egg'
import ExportBase from '../../../app/controller/base'
import ExportCategory from '../../../app/controller/category'
import ExportHome from '../../../app/controller/home'

declare module 'egg' {
  interface IController {
    base: ExportBase
    category: ExportCategory
    home: ExportHome
  }
}
