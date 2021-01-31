/* eslint-disable node/no-deprecated-api */
import { Provide } from '@midwayjs/decorator';
import { FileStream } from 'egg';
import { FileResult } from '../interface';
const fs = require('fs-extra');
const path = require('path');
const dayjs = require('dayjs');
const sendToWormhole = require('stream-wormhole');
const awaitWriteStream = require('await-stream-ready').write;

@Provide()
export class FileService {
  async upload(
    stream: FileStream,
    filename?: string,
    uplaodBasePath = 'temp/upload/'
  ): Promise<FileResult> {
    // 如果未指定文件名
    if (!filename) {
      filename =
        Date.now() +
        '' +
        Math.floor(Math.random() * 10000) +
        path.extname(stream.filename);
    }
    const dirName = dayjs(Date.now()).format('YYYYMMDD'); // 生成文件夹
    const baseDir = path.join(uplaodBasePath, dirName); // 文件所在的目录
    // const baseDir = path.join(this.baseDir, uplaodBasePath, dirName);
    fs.ensureDirSync(baseDir); // 生成写入路径
    const file = path.join(baseDir, filename);
    const writeStream = fs.createWriteStream(file); // 写入流
    try {
      await awaitWriteStream(stream.pipe(writeStream)); // 写入文件
    } catch (err) {
      await sendToWormhole(stream); // 将上传的文件流消费掉
      throw err;
    }

    return {
      success: true,
      msg: 'OK',
      file,
    };
  }

  async blobToBase64(
    sourceFile: string,
    targetfile?: string
  ): Promise<FileResult> {
    let data = fs.readFileSync(sourceFile);
    let success = true;
    let msg = '成功写入';

    if (!targetfile) targetfile = 'temp/tmp.gif';
    await fs.ensureFile(targetfile);

    data = new Buffer(data).toString('base64');
    const dataBuffer = new Buffer(data, 'base64'); //把base64码转成buffer对象
    console.log('dataBuffer是否是Buffer对象：' + Buffer.isBuffer(dataBuffer)); // 输出是否是buffer对象
    // 存储文件
    await fs.writeFile(targetfile, dataBuffer, err => {
      if (err) {
        success = false;
        msg = '失败';
        console.log(err);
      }
    });

    return {
      success,
      msg,
      file: targetfile,
    };
  }
}
