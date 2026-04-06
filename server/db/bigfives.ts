import { defineMongooseModel } from "#nuxt/mongoose";

interface BigFive {
  id: string;
}
//bigfivesexamples  bigfives
export const BigFive = defineMongooseModel<BigFive>("bigfives", {
  id: { type: String, required: true, unique: true },
});
