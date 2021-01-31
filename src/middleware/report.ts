import { Provide } from '@midwayjs/decorator';
import { IWebMiddleware, IMidwayWebNext } from '@midwayjs/web';
import { Context } from 'egg';
import { UserService } from '../service/user';

@Provide()
export class ReportMiddleware implements IWebMiddleware {
  resolve() {
    return async (ctx: Context, next: IMidwayWebNext) => {
      const startTime = Date.now();

      const userService = await ctx.requestContext.getAsync<UserService>(
        'userService'
      );
      // TODO userService.xxxx
      console.log('startTime', startTime);
      console.log('userService', userService);
      await next();
      console.log(Date.now() - startTime);
    };
  }
}
