import { Application } from 'egg'

export default function(app: Application) {
  app.passport.verify(async(_, user) => {
    console.log(user)
    // return user
    // return false
    return user.username === 'yrb' && user.password === 'yrb1996'
  })
}
