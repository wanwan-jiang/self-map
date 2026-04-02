import { z } from "zod";
import { UserBigFiveResults } from "../../db/user-bigfive-results";
import { requireAuthUser } from "../../utils/requireAuthUser";

/** 与前端 `BigFiveStatItem` 一致：各维度汇总分与等级，非常模百分位。 */
const bigFiveStatItemSchema = z.object({
  domain: z.string(),
  domainName: z.string(),
  score: z.number(),
  count: z.number(),
  average: z.number(),
  level: z.enum(["h", "n", "l"]),
});

const bodySchema = z.object({
  stats: z.array(bigFiveStatItemSchema),
  type: z.string(),
});

interface SuccessBody {
  success: true;
  data: {
    id: string;
    userId: string;
    stats: object[];
    type: string;
    createdAt: string;
  };
}

/**
 * @description 为当前登录用户写入一条 Big Five 测试结果（userId 以服务端会话为准，不信任客户端传入）。
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

  const stats = parsed.data.stats;
  const type = parsed.data.type;
  console.log("type", type);
  const created = await UserBigFiveResults.create({
    userId,
    stats,
    type,
    createdAt: new Date(),
  });

  return {
    success: true,
    data: {
      id: String(created._id),
      userId,
      stats,
      type,
      createdAt: created.createdAt.toISOString(),
    },
  };
});
