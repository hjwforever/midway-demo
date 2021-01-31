import { EggPlugin } from 'egg';
export default {
  static: false, // default is true
  mysql: {
    enable: true,
    package: 'egg-mysql',
  },
  cors: {
    enable: true,
    package: 'egg-cors',
  },
} as EggPlugin;
