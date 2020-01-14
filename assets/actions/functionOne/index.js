import sum from "../utils/sum";

export function logAndReturnSumOf(a, b) {
  const add = sum(a + b);
  console.log({ add });
  return add;
}
