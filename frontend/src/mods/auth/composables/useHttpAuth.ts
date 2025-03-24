import ClassUseApiConnect from "../../../helpers/http/useApiConnect";
const ApiConnect = new ClassUseApiConnect();

export function useHttpAuth() {
  async function login(data: Record<string, unknown>) {
    const urlApi = "/login";
    return await ApiConnect.postWithoutToken(urlApi, data)
      .then((res: any) => {
        return res;
      })
      .catch((res: any) => {
        return res;
      });
  }

  return { login };
}
