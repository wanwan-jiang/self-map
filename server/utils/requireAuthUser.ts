import type { H3Event } from 'h3';
import { Users } from '../db/users';

export interface AuthUserContext {
  userId: string;
  username: string;
}

/**
 * @description 从 nuxt-auth-utils 会话解析当前用户，并关联 Users 文档主键。
 */
export async function requireAuthUser(event: H3Event): Promise<AuthUserContext> {
    const session = await getUserSession(event);
    const username = session.user?.username;
    if (!username || typeof username !== 'string') {
        throw createError({
            statusCode: 401,
            statusMessage: '未登录',
        });
    }

    const user = await Users.findOne({ username }).lean();
    if (!user) {
        throw createError({
            statusCode: 401,
            statusMessage: '用户不存在',
        });
    }

    return {
        userId: String(user._id),
        username,
    };
}
