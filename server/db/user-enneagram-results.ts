import { defineMongooseModel } from "#nuxt/mongoose";

interface UserEnneagramResult {
  userId: string;
  type: string;
  stats: Record<string, number>;
  createdAt: Date;
}

export const UserEnneagramResults = defineMongooseModel<UserEnneagramResult>("userenneagramresults", {
  userId: { type: String, required: true },
  type: { type: String, required: true },
  stats: { type: Object, required: true },
  createdAt: { type: Date, required: true },
});
