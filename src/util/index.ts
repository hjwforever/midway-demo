const fs = require('fs');

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export const randomNum = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min) + min);

/**
 * 判断文件(夹)是否存在
 * @filepath, 路径
 */
export const isFileExisted = (filepath: string, isDir: boolean) => {
  return new Promise((resolve, reject) => {
    console.log(isDir);
    fs.access(filepath, err => {
      if (err) {
        fs.appendFileSync(filepath, '{"data":[],"total":0}', 'utf-8', err => {
          if (err) {
            return console.log('该文件不存在，重新创建失败！');
          }
          console.log('文件不存在，已新创建');
        });
        reject(false);
      } else {
        resolve(true);
      }
    });
  });
};
