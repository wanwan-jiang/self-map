import { defineMongooseModel } from "#nuxt/mongoose";

interface Mbti {
  id: string;
}

export const Mbti = defineMongooseModel<Mbti>("examples", {
  id: { type: String, required: true, unique: true },
});
