import {
  Inject,
  Controller,
  Get,
  Post,
  Provide,
  Body,
} from '@midwayjs/decorator';
import { CreateApiDoc } from '@midwayjs/swagger';
import { Result } from '../interface';

@Provide()
@Controller('/api', { tagName: 'Task Status', description: 'Task Router' })
export class FlagController {
  @Inject()
  flagService;

  @Inject()
  logger;

  // .description(
  //   'This is a open api for get processFlag,' +
  //     '  its value would be 0 or 1 or 2,' +
  //     '  respectively representing that the task has not started, is in progress, and has been completed'
  // )
  @(CreateApiDoc()
    .summary('get processFlag')
    .description(
      '获取processFlag，它的值应该是 0 或 1 或 2 ，分别代表任务未开始，进行中 以及已完成'
    )
    .build())
  @Get('/flag')
  async getFlag(): Promise<Result> {
    const result = await this.flagService.getFlag();
    this.logger.info('get flag: ' + result.data);
    return result;
  }

  // .description(
  //   'This is an open API for setting processFlag,' +
  //     '  and its value should be 0 or 1 or 2,' +
  //     '  respectively representing that the task has not started, is in progress, and has been completed'
  // )
  @(CreateApiDoc()
    .summary('set processFlag')
    .param('flag', {
      required: true,
      example: '1',
    })
    .description(
      '设置processFlag，它的值应该是 0 或 1 或 2 ，分别代表任务未开始，进行中 以及已完成'
    )
    .build())
  // 设置processFlag
  @Post('/flag')
  async setFlag(@Body('flag') flag): Promise<Result> {
    flag = Number.parseFloat(flag);
    this.logger.info(`set flag: ${flag}`);
    return await this.flagService.setFlag(flag);
  }
}
