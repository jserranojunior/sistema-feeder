import { store } from "./storeRoutes";

test("Testando se existe rota", () => {
  expect(store.routes[0]).toBeTruthy();
});

test("Testando se existe rota /", () => {
  expect(store.routes[1].path == "/").toBeTruthy();
});
