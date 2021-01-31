import {
  Controller,
  Get,
  Provide,
  Inject,
  Priority,
} from '@midwayjs/decorator';
import { Context } from 'egg';
import { CreateApiDoc } from '@midwayjs/swagger';

@Provide()
@Priority(-1)
@Controller('/', { tagName: 'Welcome', description: 'Welcome Router' })
export class HomeController {
  @Inject()
  logger;

  @Inject()
  ctx: Context;

  @Inject()
  baseDir;

  @(CreateApiDoc().summary('welcome page').description('欢迎页').build())
  @Get('/*')
  async home(): Promise<string> {
    return 'Hi, This is a Midwayjs server for Rax App !';
  }
}
