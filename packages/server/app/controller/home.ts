import { Controller } from 'egg'
import { User } from '../entity/User'

export default class HomeController extends Controller {
  public async index() {
    const { ctx } = this
    const user = new User()
    user.name = 'zxp'
    await ctx.repo.User.insert(user)
    ctx.body = await ctx.repo.User.find()
  }
}
