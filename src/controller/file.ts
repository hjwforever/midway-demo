/* eslint-disable node/no-deprecated-api */
import { Context } from 'egg';
import {
  Provide,
  Controller,
  Inject,
  Post,
  ALL,
  Body,
} from '@midwayjs/decorator';
import { CreateApiDoc } from '@midwayjs/swagger';
import { FileResult } from '../interface';

@Provide()
@Controller('/api', { tagName: 'File', description: 'File Router' })
export class FileController {
  @Inject()
  ctx: Context;

  @Inject()
  logger;

  @Inject()
  fileService;

  @Inject()
  flagService;

  @Post('/doBlob')
  @(CreateApiDoc()
    .summary('Blob to Base64')
    .param('sourceFile', {
      required: true,
      example: '{blobFile}',
    })
    .param('targetfile', {
      required: false,
      example: 'temp/base64.gif',
    })
    .description(
      '将Blob文件转换为Base64文件， sourceFile为blob格式的源文件， 可指定生成文件targetfile'
    )
    .build())
  async blobToBase64(@Body(ALL) body): Promise<FileResult> {
    const stream = await this.ctx.getFileStream();
    const uploadResult = await this.fileService.upload(stream);
    console.log('upload result', uploadResult);
    this.flagService.setFlag(1);
    const { file } = uploadResult;
    const result = await this.fileService.blobToBase64(file);
    this.flagService.setFlag(2);
    return result;
    // return await this.fileService.blobToBase64('./test1.gif', 'temp/test1.gif');
  }

  @Post('/doBlob1')
  @(CreateApiDoc()
    .summary('Blob to Base64')
    .param('sourceFile', {
      required: true,
      example: './test/test1',
    })
    .param('targetfile', {
      required: false,
      example: 'temp/base64.gif',
    })
    .description(
      '将Blob文件转换为Base64文件， sourceFile为blob格式的源文件的*路径位置*， 可指定生成文件targetfile'
    )
    .build())
  async blobToBase641(@Body(ALL) body): Promise<FileResult> {
    const { sourceFile, targetfile } = body;
    return await this.fileService.blobToBase64(sourceFile, targetfile);
    // return await this.fileService.blobToBase64('./test1.gif', 'temp/test1.gif');
  }

  @Post('/upload')
  @(CreateApiDoc()
    .summary('uoload file')
    .param('filename', {
      required: false,
      example: 'example.gif',
    })
    .param('file', {
      required: true,
      example: 'image/example.gif',
    })
    .description('上传文件')
    .build())
  async upload(@Body(ALL) body): Promise<FileResult> {
    // console.log(this.ctx);

    // this.ctx.response.header['access-control-allow-origin'] =
    //   'http://127.0.0.1:3333';
    // this.ctx.set('access-control-allow-origin', 'http://127.0.0.1:3333');
    // this.ctx.set('Access-Control-Allow-Origin', 'http://127.0.0.1:3333');
    // console.log('Body', body);

    console.log(
      'ctx Access-Control-Allow-Origin',
      this.ctx.response.header['access-control-allow-origin']
    );
    const stream = await this.ctx.getFileStream();
    const result = await this.fileService.upload(stream);
    console.log('upload result', result);

    return result;
  }
}
