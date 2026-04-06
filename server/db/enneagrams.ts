import { defineMongooseModel } from "#nuxt/mongoose";

interface Enneagram {
  id: string;
}
//enneagramexamples
export const Enneagram = defineMongooseModel<Enneagram>("enneagrams", {
  id: { type: String, required: true, unique: true },
});
