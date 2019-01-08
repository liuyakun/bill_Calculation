/**
 *  描述：定义actions
 */

import { userByToken } from '@/service/userMservice/userService';

// 导入 types
import {
  USER_INFO
} from './mutation-types';

export default {
  // 获取用户信息
  async getCurrentUser ({
                      commit
                    }) {
    // 获取用户信息
    let result = await userByToken();
    commit(USER_INFO, result.data);
  }
};
