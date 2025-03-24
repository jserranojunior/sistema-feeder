import ClassUseApiConnect from "../../../helpers/http/useApiConnect";
const ApiConnect = new ClassUseApiConnect();

export function useHttpNotas() {
  async function cadastrar(data: Record<string, unknown>) {
    const urlApi = "/upload";
    return await ApiConnect.postWithoutToken(urlApi, data)
      .then((res: any) => {
        return res;
      })
      .catch((res: any) => {
        return res;
      });
  }

  return { cadastrar };
}
