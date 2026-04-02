import { defineMongooseModel } from "#nuxt/mongoose";

interface Enneagram {
  id: string;
}

export const Enneagram = defineMongooseModel<Enneagram>("enneagramexamples", {
  id: { type: String, required: true, unique: true },
});
