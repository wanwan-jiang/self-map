import { defineMongooseModel } from "#nuxt/mongoose";

interface UserRiasecResult {
  userId: string;
  type: string;
  stats: Record<string, number>;
  createdAt: Date;
}

export const UserRiasecResults = defineMongooseModel<UserRiasecResult>("userriasecresults", {
  userId: { type: String, required: true },
  type: { type: String, required: true },
  stats: { type: Object, required: true },
  createdAt: { type: Date, required: true },
});
