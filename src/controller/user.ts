/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  Inject,
  Controller,
  Get,
  Provide,
  Param,
  RequestIP,
  RequestPath,
  App,
} from '@midwayjs/decorator';
import { CreateApiDoc } from '@midwayjs/swagger';
import { Application, Context } from 'egg';

@Provide()
@Controller('/api', { tagName: 'Mock Users', description: 'Users Router' })
export class APIController {
  @App()
  app: Application;

  @Inject()
  ctx: Context;

  @Inject()
  userService;

  @Inject()
  logger;

  @(CreateApiDoc()
    .summary('get users list')
    // .description('This is a open api for get users list')
    .description('获取用户列表')
    .build())
  @Get('/users', { middleware: ['reportMiddleware'] })
  async getUsers(
    @Param() id: number,
    @RequestPath() p: string,
    @RequestIP() ip: string
  ) {
    const users = await this.userService.getUsers({ id });
    console.log(`getUsers users: ${users}`);
    this.logger.info(`path: ${p}`);
    this.logger.info(`ip: ${ip}`);
    // console.log('this.app.getEnv()', this.app.getEnv());
    return { success: true, message: 'OK', data: users };
  }

  @(CreateApiDoc()
    .summary('get user by id')
    .param('user id', {
      required: true,
      example: '123',
    })
    // .description('This is a open api for get user by id')
    .description('获取特定id的用户')
    .build())
  @Get('/users/:id')
  async getUser(@Param() id: number) {
    const user = await this.userService.getUser({ id });
    this.logger.info(`getUser id: ${id}`);
    return { success: true, message: 'OK', data: user };
  }
}
