import { defineMongooseModel } from "#nuxt/mongoose";

interface Riasec {
  id: string;
}

export const Riasec = defineMongooseModel<Riasec>("riasecexamples", {
  id: { type: String, required: true, unique: true },
});
