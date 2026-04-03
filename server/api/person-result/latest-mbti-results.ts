import { UserMbtiResults } from "../../db/user-mbti-results";
import { requireAuthUser } from "../../utils/requireAuthUser";

interface UserMbtiStats {
  EI: number;
  E: number;
  I: number;
  SN: number;
  S: number;
  N: number;
  TF: number;
  T: number;
  F: number;
  JP: number;
  J: number;
  P: number;
}

interface MbtiResultItem {
  id: string;
  userId: string;
  type: string;
  stats: UserMbtiStats;
  createdAt: string;
}

interface SuccessBody {
  success: true;
  data: MbtiResultItem[];
}

/**
 * @description 当前登录用户的 MBTI 测试记录列表（按时间倒序）。
 */
export default defineEventHandler(async (event): Promise<SuccessBody> => {
  const { userId } = await requireAuthUser(event);

  const docs = await UserMbtiResults.find({ userId }).sort({ createdAt: -1 }).lean().exec();

  const items: MbtiResultItem[] = docs.map((doc) => ({
    id: String(doc._id),
    userId: doc.userId,
    type: doc.type,
    stats: doc.stats,
    createdAt: doc.createdAt instanceof Date ? doc.createdAt.toISOString() : String(doc.createdAt),
  }));

  return {
    success: true,
    data: items,
  };
});
