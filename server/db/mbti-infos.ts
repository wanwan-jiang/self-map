import { defineMongooseModel } from "#nuxt/mongoose";
import { object } from "zod";

interface MbtiInfo {
  type: string;
  title: string;
  desc: string;
  character: object;
}

export const MbtiInfo = defineMongooseModel<MbtiInfo>("mbtiinfos", {
  type: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  desc: { type: String, required: true },
  character: { type: object, required: true },
});
