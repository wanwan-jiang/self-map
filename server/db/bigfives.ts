import { defineMongooseModel } from "#nuxt/mongoose";

interface BigFive {
  id: string;
}

export const BigFive = defineMongooseModel<BigFive>("bigfivesexamples", {
  id: { type: String, required: true, unique: true },
});
