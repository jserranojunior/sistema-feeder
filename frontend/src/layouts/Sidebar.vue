<template>
  <div class="menu p-4 overflow-y-auto w-80 text-neutral-content border-r border-neutral bg-blue-900 t ">
          <router-link class="btn-sm mt-1 btn text-gray-600 bg-gray-200 hover:bg-gray-400 " :to="'/'">Home</router-link>
          <router-link class="btn-sm mt-1 btn text-gray-600 bg-gray-200 hover:bg-gray-400 " :to="'/login'" v-if="!auth.checkStateToken()">Login</router-link>
          <router-link class="btn-sm mt-1 btn text-gray-600 bg-gray-200 hover:bg-gray-400 " :to="'/cadastro'" v-if="!auth.checkStateToken()">Cadastro</router-link>
          <router-link class="btn-sm mt-1 btn text-gray-600 bg-gray-200 hover:bg-gray-400 " :to="'/financeiro'" v-if="acl.checkIfExisteRoutes(4) && auth.checkStateToken()">Financeiro


          </router-link>

          <router-link class="btn-sm mt-1 btn text-gray-600 bg-gray-200 hover:bg-gray-400 " :to="'/financeiro'" v-if="auth.checkStateToken()">Depósito</router-link>
              
                <router-link class="btn-sm mt-1 btn text-gray-600 bg-gray-200 hover:bg-gray-400 " :to="'/financeiro'" v-if=" auth.checkStateToken()">Extrato</router-link>
                <router-link class="btn-sm mt-1 btn text-gray-600 bg-gray-200 hover:bg-gray-400 " :to="'/financeiro'" v-if="auth.checkStateToken()">Transferência</router-link>
                     <router-link class="btn-sm mt-1 btn text-gray-600 bg-gray-200 hover:bg-gray-400 " :to="'/usuarios'" v-if="acl.checkIfExisteRoutes(5) && auth.checkStateToken()">Usuários
                     </router-link>
          <div class="btn-sm mt-1 btn btn-secondary" @click="sair()" v-if="auth.checkStateToken()">Sair
          </div> 
  </div>
</template>

<script lang="ts" setup>
import { onBeforeMount, watch } from "@vue/runtime-core";
import useStore from "../helpers/stores/store"
let {auth, router, acl} = useStore()
function redirectPageTo(url:string){ 
    console.log("Redirecionando")
    router.push({ path: url })              
  }
 function sair(){
      auth.Logout()
      acl.clearRoutesEnableWithUserAcls()
      redirectPageTo("/login")
  }

onBeforeMount(async ()=>{
  await auth.isLogged().then(async()=>{
    await acl.getUserAcl().then(() => {
          acl.generateRoutesEnableWithUserAcls();
        })
  })
})
</script>
