import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg'

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = `${appInfo.name}_1674470756653_995`

  // add your egg config in here
  config.middleware = []

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  }

  config.typeorm = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'xpzheng',
    database: 'kongming',
    synchronize: true,
    logging: false,
    entities: ['app/entity/**/*.ts'],
    migrations: ['app/migration/**/*.ts'],
    subscribers: ['app/subscriber/**/*.ts'],
    cli: {
      entitiesDir: 'app/entity',
      migrationsDir: 'app/migration',
      subscribersDir: 'app/subscriber',
    },
  }

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
    security: {
      csrf: {
        enable: false,
      },
    },
    cors: {
      origin: '*',
      allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
    },
  }
}
