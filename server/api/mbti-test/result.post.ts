import { MbtiResult } from "../../db/mbti-result";

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
  mbtiType?: string;
  stats?: MbtiStats;
}

export default defineEventHandler(async (event) => {
  const body = await readBody<SubmitBody>(event);
  const mbtiType = body?.mbtiType?.trim().toUpperCase();

  if (!mbtiType) {
    throw createError({
      statusCode: 400,
      statusMessage: "mbtiType is required",
    });
  }

  const result = await MbtiResult.findOne({ type: mbtiType }).lean();
  if (!result) {
    throw createError({
      statusCode: 404,
      statusMessage: `No result found for mbtiType: ${mbtiType}`,
    });
  }

  return {
    type: result.type,
    title: result.title,
    desc: result.desc,
    stats: body?.stats ?? null,
  };
});
  