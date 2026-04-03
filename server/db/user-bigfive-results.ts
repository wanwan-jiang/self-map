import { defineMongooseModel } from "#nuxt/mongoose";

interface UserBigFiveStats {
  domain: string;
  average: number;
  level: "h" | "n" | "l";
}

interface UserBigFiveResult {
  id: string;
  userId: string;
  stats: UserBigFiveStats;
  type: string;
  createdAt: Date;
}

export const UserBigFiveResults = defineMongooseModel<UserBigFiveResult>("userbigfiveresults", {
  userId: { type: String, required: true },
  stats: { type: Object, required: true },
  type: { type: String, required: true },
  createdAt: { type: Date, required: true },
});
