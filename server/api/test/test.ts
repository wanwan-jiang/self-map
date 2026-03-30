import { Test } from "../../db/test";
export default defineEventHandler(async (event) => {
  const test = await Test.find({});
  //   .select(["name", "birthday"])
  //   .limit(10)
  //   .lean();
  return test;
});
