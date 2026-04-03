import { z } from "zod";
import { UserMbtiResults } from "../../db/user-mbti-results";
import { requireAuthUser } from "../../utils/requireAuthUser";

const bodySchema = z.object({
  type: z
    .string()
    .trim()
    .length(4)
    .regex(/^[EI][SN][TF][JP]$/i, "mbti 须为四字母类型"),
  stats: z.object({
    EI: z.number(),
    E: z.number(),
    I: z.number(),
    SN: z.number(),
    S: z.number(),
    N: z.number(),
    TF: z.number(),
    T: z.number(),
    F: z.number(),
    JP: z.number(),
    J: z.number(),
    P: z.number(),
  }),
});

interface SuccessBody {
  success: true;
  data: {
    id: string;
    userId: string;
    type: string;
    stats: Record<string, number>;
    createdAt: string;
  };
}

/**
 * @description 为当前登录用户写入一条 MBTI 测试结果（userId 以服务端会话为准，不信任客户端传入）。
 */
export default defineEventHandler(async (event): Promise<SuccessBody> => {
  const { userId } = await requireAuthUser(event);

  let body: unknown;
  try {
    body = await readBody(event);
  } catch {
    throw createError({
      statusCode: 400,
      statusMessage: "无效的 JSON 请求体",
    });
  }

  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) {
    throw createError({
      statusCode: 400,
      statusMessage: parsed.error.issues[0]?.message ?? "参数无效",
    });
  }

  const type = parsed.data.type.toUpperCase();
  const stats = parsed.data.stats;
  const created = await UserMbtiResults.create({
    userId,
    type,
    stats,
    createdAt: new Date(),
  });

  return {
    success: true,
    data: {
      id: String(created._id),
      userId,
      type,
      stats,
      createdAt: created.createdAt.toISOString(),
    },
  };
});
