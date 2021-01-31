import { Provide } from '@midwayjs/decorator';
import { Result } from '../interface';

/**
 * 全局进度标记 processFlag {0:空闲, 1:正在推理, 2:正在渲染}
 */
export let processFlag = 0;

/**
 * (method) FlagService.getFlag(): FlagResult
 * 获取 全局进度标记 processFlag
 *
 * (method) FlagService.setFlag(flag: number): FlagResult
 * 设置 全局进度标记 processFlag
 */
@Provide()
export class FlagService {
  // processFlag: number;

  getFlag(): Result {
    return {
      success: true,
      msg: `OK, now flag=${processFlag}`,
      data: processFlag,
    };
  }

  setFlag(flag: number): Result {
    const success = [0, 1, 2].indexOf(flag) !== -1;
    if (success) processFlag = flag;

    return {
      success,
      msg: `${
        success ? 'OK' : 'flag should be 0 or 1 or 2'
      }, now flag=${processFlag}`,
      data: processFlag,
    };
  }
}
