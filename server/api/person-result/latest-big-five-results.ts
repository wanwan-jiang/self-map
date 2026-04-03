import { UserBigFiveResults } from "../../db/user-bigfive-results";
import { requireAuthUser } from "../../utils/requireAuthUser";

interface UserBigFiveStats {
  domain: string;
  average: number;
  level: "h" | "n" | "l";
}

interface BigFiveResultItem {
  id: string;
  userId: string;
  stats: UserBigFiveStats;
  type: string;
  createdAt: string;
}

interface SuccessBody {
  success: true;
  data: BigFiveResultItem[];
}

/**
 * @description 当前登录用户的大五人格测试记录列表（按时间倒序）。
 */
export default defineEventHandler(async (event): Promise<SuccessBody> => {
  const { userId } = await requireAuthUser(event);

  const docs = await UserBigFiveResults.find({ userId }).sort({ createdAt: -1 }).lean().exec();

  const items: BigFiveResultItem[] = docs.map((doc) => ({
    id: String(doc._id),
    userId: doc.userId,
    stats: doc.stats,
    type: doc.type,
    createdAt: doc.createdAt instanceof Date ? doc.createdAt.toISOString() : String(doc.createdAt),
  }));

  return {
    success: true,
    data: items,
  };
});
