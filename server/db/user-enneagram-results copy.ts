import { defineMongooseModel } from "#nuxt/mongoose";

interface UserMbtiResult {
  userId: string;
  mbti: string;
  stats: Record<string, number>;
  createdAt: Date;
}

export const UserMbtiResults = defineMongooseModel<UserMbtiResult>("usermbtiresults", {
  userId: { type: String, required: true },
  mbti: { type: String, required: true },
  stats: { type: Object, required: true },
  createdAt: { type: Date, required: true },
});
