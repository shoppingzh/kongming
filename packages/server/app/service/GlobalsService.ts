import { Globals } from '../entity/Globals'
import BaseService from './BaseService'

export default class CategoryService extends BaseService {

  private async create(globals: Globals) {
    globals.gmtCreate = new Date()
    return await this.ctx.repo.Globals.save(globals)
  }

  public async update(globals: Globals): Promise<boolean> {
    const perist = await this.get()
    if (!perist) {
      await this.create(globals)
    } else {
      globals.id = perist.id
      await BaseService.update(this.ctx.repo.Globals, globals)
    }
    return true
  }

  public async get() {
    return await this.ctx.repo.Globals.findOne({})
  }

}
