import { defineMongooseModel } from "#nuxt/mongoose";

interface Test {
  id: string;
  name: string;
  birthday: string;
  password: string;
}

export const Test = defineMongooseModel<Test>("tests", {
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  birthday: { type: String, required: true },
  password: { type: String, required: true },
});
