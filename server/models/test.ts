import { defineMongooseModel } from "#nuxt/mongoose";

interface Test {
  name: string;
  birthday: string;
  password: string;
}

export const Test = defineMongooseModel<Test>("tests", {
  name: { type: String, required: true },
  birthday: { type: String, required: true },
  password: { type: String, required: true },
});
