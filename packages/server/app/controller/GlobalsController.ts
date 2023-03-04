import { Globals } from '../entity/Globals'
import BaseController from './BaseController'

export default class GlobalsController extends BaseController {

  public async get() {
    this.success(await this.service.globalsService.get())
  }

  public async update() {
    const result = await this.service.globalsService.update(
      this.ctx.request.body as Globals
    )
    result ? this.success() : this.failed()
  }

}
