import { UserRiasecResults } from "../../db/user-riasec-results";
import { requireAuthUser } from "../../utils/requireAuthUser";

interface RiasecResultItem {
  id: string;
  userId: string;
  type: string;
  stats: Record<string, number>;
  createdAt: string;
}

interface SuccessBody {
  success: true;
  data: RiasecResultItem[];
}

/**
 * @description 当前登录用户的 RIASEC 测试记录列表（按时间倒序）。
 */
export default defineEventHandler(async (event): Promise<SuccessBody> => {
  const { userId } = await requireAuthUser(event);

  const docs = await UserRiasecResults.find({ userId }).sort({ createdAt: -1 }).lean().exec();

  const items: RiasecResultItem[] = docs.map((doc) => ({
    id: String(doc._id),
    userId: doc.userId,
    type: doc.type,
    stats: doc.stats as Record<string, number>,
    createdAt: doc.createdAt instanceof Date ? doc.createdAt.toISOString() : String(doc.createdAt),
  }));

  return {
    success: true,
    data: items,
  };
});
