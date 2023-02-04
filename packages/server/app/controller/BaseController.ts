import { Controller } from 'egg'

export default abstract class BaseController extends Controller {
  success(data?: any) {
    this.ctx.body = {
      code: 0,
      msg: undefined,
      data,
    }
  }

  failed(code?: number, msg?: string, data?: any) {
    this.ctx.body = {
      code: code == null ? 1 : code,
      msg,
      data,
    }
  }
}
