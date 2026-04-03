import { defineMongooseModel } from "#nuxt/mongoose";

interface UserMbtiStats {
  EI: number;
  E: number;
  I: number;
  SN: number;
  S: number;
  N: number;
  TF: number;
  T: number;
  F: number;
  JP: number;
  J: number;
  P: number;
}

interface UserMbtiResult {
  userId: string;
  type: string;
  stats: UserMbtiStats;
  createdAt: Date;
}

export const UserMbtiResults = defineMongooseModel<UserMbtiResult>("usermbtiresults", {
  userId: { type: String, required: true },
  type: { type: String, required: true },
  stats: { type: Object, required: true },
  createdAt: { type: Date, required: true },
});
