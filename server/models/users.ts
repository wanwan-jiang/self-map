import { defineMongooseModel } from "#nuxt/mongoose";

interface Users {
  username: string;
  email: string;
  password: string;
  agreeTerms: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export const Users = defineMongooseModel<Users>("users", {
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  agreeTerms: { type: Boolean, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
