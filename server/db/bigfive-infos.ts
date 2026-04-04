import { defineMongooseModel } from "#nuxt/mongoose";
import { object } from "zod";

/** 单维度文档：`levels` 下键为 h / n / l，值为该等级说明文案 */
interface BigFiveInfo {
  domain: string;
  levels: Record<string, string>;
}

export const BigFiveInfo = defineMongooseModel<BigFiveInfo>("bigfiveinfos", {
  domain: { type: String, required: true, unique: true },
  levels: { type: object, required: true },
});
