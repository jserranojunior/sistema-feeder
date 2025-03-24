import { useRegister } from "./useRegister";

const {
  setStoreError,
  checkFieldsIsValid,
  setStateFields,
  confirmPassword,
  checkSamePassword,
  fields,
  erro,
  Register,
  phoneCode,
  joinCodeAndProne,
} = useRegister();

test("joinCodeAndProne", () => {
  phoneCode.value = "+55";
  fields.value.cellphone = "(11)94643-9695";
  joinCodeAndProne();
  expect(fields.value.cellphone == "+55(11)94643-9695").toBeTruthy();
});

test("Register return false teste confirmFields", async () => {
  fields.value.name = "";
  fields.value.password = "123";
  confirmPassword.value = "123";
  const register = await Register();
  expect(register).toBeFalsy();
});

test("Register return false teste ConfirmPassword", async () => {
  fields.value.name = "Jorge";
  fields.value.password = "123";
  const register = await Register();
  expect(register).toBeFalsy();
});

test("Register return false same email", async () => {
  fields.value.name = "Jorge";
  fields.value.email = "jorgeserranojunior@gmail.com";
  fields.value.password = "123";
  confirmPassword.value = "123";
  const register = await Register();
  expect(register).toBeFalsy();
});

/* test("Register return true", async () => {
  fields.value.name = "Teste";
  fields.value.email = "teste@gmail.com";
  fields.value.password = "123";
  confirmPassword.value = "123";
  const register = await Register();
  expect(register).toBeTruthy();
}); */

test("setStoreError check set erro", () => {
  setStoreError("Falha ao conectar");
  expect(erro.value).toBe("Falha ao conectar");
});
test("checkFieldsIsValid  false", () => {
  setStateFields({
    email: "",
    password: "",
    name: "",
  });
  expect(checkFieldsIsValid()).toBe(false);
});
test("setStateFields to be true", () => {
  setStateFields({
    email: "jorgeserranojunior@gmail.com",
    password: "123",
    name: "Jorge",
  });
  expect(
    fields.value.email == "jorgeserranojunior@gmail.com" &&
      fields.value.password == "123" &&
      fields.value.name == "Jorge"
  ).toBeTruthy();
});
test("checkFieldsIsValid  true", () => {
  setStateFields({
    email: "jorgeserranojunior@gmail.com",
    password: "123",
    name: "Jorge",
  });
  confirmPassword.value = "one";
  expect(checkFieldsIsValid()).toBeTruthy();
});

test("checkSamePassword return false", () => {
  fields.value.password = "123";
  confirmPassword.value = "12";
  expect(checkSamePassword()).toBeFalsy();
});

test("checkSamePassword return true", () => {
  fields.value.password = "123";
  confirmPassword.value = "123";
  expect(checkSamePassword()).toBeTruthy();
});

test("checkFieldsIsValid return true", () => {
  fields.value.name = "";
  fields.value.password = "123";
  confirmPassword.value = "123";
  expect(checkFieldsIsValid()).toBeFalsy();
});
