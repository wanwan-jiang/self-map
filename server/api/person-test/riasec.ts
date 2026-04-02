import { Riasec } from "../../db/riasecs";

/** MongoDB lean 文档：业务 id 可能缺失，需与前端 MbtiQuestion.id 对齐 */
interface LeanRiasecDoc {
  _id: unknown;
  id?: string;
}

export default defineEventHandler(async () => {
  const docs = (await Riasec.find({}).lean()) as LeanRiasecDoc[];
  return docs.map((doc) => ({
    ...doc,
    id: doc.id && doc.id.length > 0 ? doc.id : String(doc._id),
  }));
});
