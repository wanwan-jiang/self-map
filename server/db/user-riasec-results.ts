import { defineMongooseModel } from "#nuxt/mongoose";

interface RiasecDimensionScore {
  score: number;
  max: number;
}

interface UserRiasecResult {
  userId: string;
  type: string;
  stats: Record<string, RiasecDimensionScore>;
  createdAt: Date;
}

export const UserRiasecResults = defineMongooseModel<UserRiasecResult>("userriasecresults", {
  userId: { type: String, required: true },
  type: { type: String, required: true },
  stats: { type: Object, required: true },
  createdAt: { type: Date, required: true },
});
