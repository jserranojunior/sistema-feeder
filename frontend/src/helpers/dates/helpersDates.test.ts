import { dateUStoJs } from "./helpersDates";
const americanDate = new Date("2021-03-15");
test("Se o valor for padão americano retorna no formato javascript", () => {
  expect(dateUStoJs("2021-03-15")).toEqual("2021-03-15");
});

test("Se o valor for padão brazileiro retorna o mesmo valor", () => {
  expect(dateUStoJs("15-07-2021")).toStrictEqual("15-07-2021");
});
