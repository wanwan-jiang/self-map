import { defineMongooseModel } from "#nuxt/mongoose";

interface Riasec {
  id: string;
}
//riasecexamples
export const Riasec = defineMongooseModel<Riasec>("riasecs", {
  id: { type: String, required: true, unique: true },
});
