import { defineMongooseModel } from "#nuxt/mongoose";

interface MbtiResult {
  type: string;
  title: string;
  desc: string;
}

export const MbtiResult = defineMongooseModel<MbtiResult>("results", {
  type: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  desc: { type: String, required: true },
});
