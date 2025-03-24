import ClassUseApiConnect from "../../../helpers/http/useApiConnect";
const ApiConnect = new ClassUseApiConnect();

export const httpAcl = () => {
  async function getUserAcl() {
    const urlApi = `/useracl`;
    return await ApiConnect.get(urlApi)
      .then((res: any) => {
        return res.data;
      })
      .catch((res: any) => {
        return res;
      });
  }
  return { getUserAcl };
};
