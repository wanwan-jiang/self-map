import { MbtiInfo } from "../../db/mbti-infos";

interface MbtiStats {
  EI?: number;
  E?: number;
  I?: number;
  SN?: number;
  S?: number;
  N?: number;
  TF?: number;
  T?: number;
  F?: number;
  JP?: number;
  J?: number;
  P?: number;
}

interface SubmitBody {
  type?: string;
  stats?: MbtiStats;
}

export default defineEventHandler(async (event) => {
  const body = await readBody<SubmitBody>(event);
  const type = body?.type?.trim().toUpperCase();
  const stats = body?.stats ?? {};

  if (!type) {
    throw createError({
      statusCode: 400,
      statusMessage: "type必须",
    });
  }
  if (!stats) {
    throw createError({
      statusCode: 400,
      statusMessage: "stats必须",
    });
  }

  const result = await MbtiInfo.findOne({ type }).lean();
  if (!result) {
    throw createError({
      statusCode: 404,
      statusMessage: `未发现类型: ${type}`,
    });
  }

  return {
    type: result.type,
    title: result.title,
    desc: result.desc,
    character: result.character,
    stats: body?.stats ?? null,
  };
});
