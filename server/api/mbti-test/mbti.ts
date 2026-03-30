import { Mbti } from "../../db/mbtis";

/** MongoDB lean 文档：业务 id 可能缺失，需与前端 MbtiQuestion.id 对齐 */
interface LeanMbtiDoc {
  _id: unknown;
  id?: string;
}

export default defineEventHandler(async () => {
  const docs = (await Mbti.find({}).lean()) as LeanMbtiDoc[];
  return docs.map((doc) => ({
    ...doc,
    id: doc.id && doc.id.length > 0 ? doc.id : String(doc._id),
  }));
});
