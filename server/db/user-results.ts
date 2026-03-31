import { defineMongooseModel } from "#nuxt/mongoose";

interface MbtiResult {
  userId: string;
  mbti: string;
  stats: Record<string, number>;
  createdAt: Date;
}

export const UserResults = defineMongooseModel<MbtiResult>("userResults", {
  userId: { type: String, required: true },
  mbti: { type: String, required: true },
  stats: { type: Object, required: true },
  createdAt: { type: Date, required: true },
});
