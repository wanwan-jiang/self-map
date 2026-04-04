import { defineMongooseModel } from "#nuxt/mongoose";
import { object } from "zod";

/** 单维度文档：`levels` 下键为 h / n / l，值为该等级说明文案 */
interface EnneagramInfo {
  domain: string;
  domainName: string;
  no: string;
  desc: string;
}

export const EnneagramInfo = defineMongooseModel<EnneagramInfo>("enneagraminfos", {
  domain: { type: String, required: true, unique: true },
  domainName: { type: String, required: true },
  no: { type: String, required: true },
  desc: { type: String, required: true },
});
