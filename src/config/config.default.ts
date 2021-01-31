import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export type DefaultConfig = PowerPartial<EggAppConfig>;

export const swagger = {
  title: 'midway-swagger',
  description: 'swagger-ui for midway api',
  version: '1.0.0',
  termsOfService: '',
  contact: {
    name: 'API Support',
    url: 'http://www.example.com/support',
    email: 'support@example.com',
  },
  license: {
    name: 'Apache 2.0',
    url: 'https://www.apache.org/licenses/LICENSE-2.0.html',
  },
};

// exports.security = {
//   csrf: {
//     enable: false,
//   },
//   xframe: {
//     enable: false,
//   },
//   domainWhiteList: ['127.0.0.1:3333'],
// };

// exports.cors = {
//   origin: 'http://127.0.0.1:3333',
//   allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
//   credentials: true,
// };

export default (appInfo: EggAppInfo) => {
  const config = {} as DefaultConfig;

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1611865411716_8425';

  // add your config here
  config.middleware = [
    // 'reportMiddleware'
  ];

  config.security = {
    csrf: {
      enable: false,
    },
    xframe: {
      enable: false,
    },
    domainWhiteList: ['127.0.0.1:3333'],
  };

  config.cors = {
    origin: 'http://127.0.0.1:3333',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
    credentials: true,
  };

  config.multipart = {
    fieldSize: '1000kb',
    fields: 10,
    fileSize: '50mb',
    mode: 'stream',
  };

  config.midwayFeature = {
    // true 代表使用 midway logger
    // false 或者为空代表使用 egg-logger
    replaceEggLogger: true,
  };

  config.swagger = {
    title: 'midway-swagger',
    description: 'swagger-ui for midway api',
    version: '1.0.0',
    // termsOfService: '无言以队',
    // contact: {
    //   name: 'API Support',
    //   url: 'http://www.example.com/support',
    //   email: 'support@example.com',
    // },
    license: {
      name: 'Apache 2.0',
      url: 'https://www.apache.org/licenses/LICENSE-2.0.html',
    },
  };

  return config;
};
