import { defineMongooseModel } from "#nuxt/mongoose";

interface UserBigFiveResult {
  userId: string;
  stats: Record<string, number>;
  type: string;
  createdAt: Date;
}

export const UserBigFiveResults = defineMongooseModel<UserBigFiveResult>("userbigfiveresults", {
  userId: { type: String, required: true },
  stats: { type: Object, required: true },
  type: { type: String, required: true },
  createdAt: { type: Date, required: true },
});
