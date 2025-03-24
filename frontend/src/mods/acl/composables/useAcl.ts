import { toRefs } from "vue";
import { store } from "./storeAcl";
import { httpAcl } from "./httpAcl";
export const useAcl = () => {
  function checkIfExisteRoutes(rotaID: number) {
    if (store.rotasEnableServidor.includes(rotaID)) {
      return true;
    } else {
      return false;
    }
  }

  function joinAclPublic() {
    if (store.userAcl && store.userAcl[0]) {
      store.userAcl.unshift(store.publicRoutes[0]);
    } else {
      store.userAcl = store.publicRoutes;
    }
  }

  async function getUserAcl(FuncHttpAcl = httpAcl) {
    let useHttpAcl = await FuncHttpAcl().getUserAcl();
    store.userAcl = useHttpAcl.data;
  }

  function clearRoutesEnableWithUserAcls() {
    store.rotasEnableServidor = [];
    store.userAcl = [];
    generateRoutesEnableWithUserAcls();
  }
  function generateRoutesEnableWithUserAcls() {
    joinAclPublic();
    store.userAcl.forEach((acl: any) => {
      acl.Routes.forEach((rota: any) => {
        if (!store.rotasEnableServidor.includes(rota)) {
          store.rotasEnableServidor.push(rota);
        }
      });
    });
  }

  return {
    ...toRefs(store),
    checkIfExisteRoutes,
    generateRoutesEnableWithUserAcls,
    getUserAcl,
    joinAclPublic,
    clearRoutesEnableWithUserAcls,
  };
};
