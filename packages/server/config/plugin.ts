import { EggPlugin } from 'egg'

const plugin: EggPlugin = {
  // static: true,
  // nunjucks: {
  //   enable: true,
  //   package: 'egg-view-nunjucks',
  // },
  passport: {
    enable: true,
    package: 'egg-passport'
  },
  passportLocal: {
    enable: true,
    package: 'egg-passport-local'
  },
  typeorm: {
    enable: true,
    package: '@forsigner/egg-typeorm',
  },
  cors: {
    enable: true,
    package: 'egg-cors',
  },
  routerPlus: {
    enable: true,
    package: 'egg-router-plus',
  },
}

export default plugin
