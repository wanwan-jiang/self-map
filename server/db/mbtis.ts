import { defineMongooseModel } from "#nuxt/mongoose";

interface Mbti {
  id: string;
}

export const Mbti = defineMongooseModel<Mbti>("mbtiexamples", {
  id: { type: String, required: true, unique: true },
});
