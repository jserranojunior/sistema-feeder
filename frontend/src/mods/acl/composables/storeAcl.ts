import { reactive } from "vue";

export const store = reactive({
  rotasEnableServidor: [] as number[],
  publicRoutes: [
    {
      ID: 0,
      Name: "Public",
      Routes: [0, 1, 2, 3, 4],
    },
  ],
  userAcl: [] as any,
});
