import { z } from "zod";
import { UserRiasecResults } from "../../db/user-riasec-results";
import { requireAuthUser } from "../../utils/requireAuthUser";

const bodySchema = z.object({
  type: z.string().trim().min(1, "type 不能为空"),
  stats: z.record(z.string(), z.number()),
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
 * @description 为当前登录用户写入一条 RIASEC 测试结果（userId 以服务端会话为准）。
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

  const type = parsed.data.type;
  const stats = parsed.data.stats;
  const created = await UserRiasecResults.create({
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
