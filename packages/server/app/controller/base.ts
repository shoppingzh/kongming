import { Controller } from 'egg'

export default abstract class BaseController extends Controller {
  success(data: any) {
    this.ctx.body = {
      code: 0,
      msg: null,
      data,
    }
  }
}
