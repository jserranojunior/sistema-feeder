import { reactive } from "vue";

export const store = reactive({
  fieldsNotas: {
    nome_nota: "",
    caminho_nota: "",
    foto_nota: "" as any,
  },
});
