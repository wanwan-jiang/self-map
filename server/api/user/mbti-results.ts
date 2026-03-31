import { UserResults } from "../../db/user-results";
import { requireAuthUser } from "../../utils/requireAuthUser";

interface MbtiResultItem {
  id: string;
  userId: string;
  mbti: string;
  stats: Record<string, number>;
  createdAt: string;
}

interface SuccessBody {
  success: true;
  data: {
    items: MbtiResultItem[];
  };
}

/**
 * @description 当前登录用户的 MBTI 测试记录列表（按时间倒序）。
 */
export default defineEventHandler(async (event): Promise<SuccessBody> => {
  const { userId } = await requireAuthUser(event);

  const docs = await UserResults.find({ userId })
    .sort({ createdAt: -1 })
    .lean()
    .exec();

  const items: MbtiResultItem[] = docs.map((doc) => ({
    id: String(doc._id),
    userId: doc.userId,
    mbti: doc.mbti,
    stats: doc.stats,
    createdAt: doc.createdAt instanceof Date ? doc.createdAt.toISOString() : String(doc.createdAt),
  }));

  return {
    success: true,
    data: { items },
  };
});
