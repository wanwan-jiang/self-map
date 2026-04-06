import { defineMongooseModel } from "#nuxt/mongoose";

interface Mbti {
  id: string;
}
//mbtiexamples
export const Mbti = defineMongooseModel<Mbti>("mbtis", {
  id: { type: String, required: true, unique: true },
});
