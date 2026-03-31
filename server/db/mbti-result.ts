import { defineMongooseModel } from "#nuxt/mongoose";
import { object } from "zod";

interface MbtiResult {
  type: string;
  title: string;
  desc: string;
  character: object;
}

export const MbtiResult = defineMongooseModel<MbtiResult>("results", {
  type: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  desc: { type: String, required: true },
  character: { type: object, required: true },
});
