import { Provide } from '@midwayjs/decorator';
import { IUserOptions } from '../interface';
import { randomNum } from '../util/';

@Provide()
export class UserService {
  async getUser(options: IUserOptions) {
    return {
      id: options.id,
      username: 'mockedName',
      phone: '12345678901',
      email: 'xxx.xxx@xxx.com',
    };
  }

  async getUsers(options: IUserOptions) {
    const users = [];
    const length = randomNum(4, 10);
    for (let i = 0; i < length; i++)
      users.push({
        id: randomNum(i * 50, i * 100 + 1) + 10086000,
        username: 'mockedName',
        phone: '12345678901',
        email: 'xxx.xxx@xxx.com',
      });

    return users;
  }
}
