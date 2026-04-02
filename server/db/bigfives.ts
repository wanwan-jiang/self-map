import { defineMongooseModel } from "#nuxt/mongoose";

interface BigFive {
  id: string;
}

export const BigFive = defineMongooseModel<BigFive>("bigfives", {
  id: { type: String, required: true, unique: true },
});
