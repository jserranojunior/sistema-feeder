<template>
  <div
    class="text-neutral rounded-xl w-full z-10 px-2 flex flex-wrap justify-between items-center mx-2"
  >
    <div class="flex-1">
      <!-- <label
        for="my-drawer"
        class="btn btn-sm btn-primary drawer-button cursor-pointer"
      >
        <svg
          viewBox="0 0 100 80"
          width="18"
          height="18"
          class="fill-current text-neutral-content"
        >
          <rect width="100" height="20" />
          <rect y="30" width="100" height="20" />
          <rect y="60" width="100" height="20" /></svg
      ></label> -->
      <!--           <router-link :to="'/'"><span class="title-sefro ml-4 text-xl text-white">SEFRO</span></router-link>
 -->
      <slot name="title"></slot>
    </div>
    <div class="flex-none">
      <nav :class="'flex flex-wrap my-auto'">
        <router-link
          class="btn-sm mx-1 btn btn-primary text-white"
          v-if="!auth.checkStateToken()"
          :to="'/'"
          >Home</router-link
        >
        <!-- <router-link
          class="btn-sm mx-1 btn btn-primary text-white"
          :to="'/'"
          v-if="!auth.checkStateToken()"
          >Login</router-link
        > -->
        <!--  <router-link
          class="btn-sm mx-1 btn btn-primary text-white"
          :to="'/cadastro'"
          v-if="!auth.checkStateToken()"
          >Cadastro</router-link
        > -->
        <!-- <router-link class="btn-sm mx-1 btn btn-primary text-white" :to="'/'"
          >Notas
        </router-link -->

        <!-- <router-link
          class="btn-sm mx-1 btn btn-primary text-white"
          :to="'/usuarios'"
          v-if="acl.checkIfExisteRoutes(5) && auth.checkStateToken()"
          >Usuários
        </router-link>
        <div
          class="btn-sm mx-1 btn btn-secondary"
          @click="sair()"
          v-if="auth.checkStateToken()"
        >
          Sair
        </div> -->
      </nav>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeMount, watch } from "@vue/runtime-core";
import useStore from "../helpers/stores/store";
let { auth, router, acl } = useStore();
function redirectPageTo(url: string) {
  console.log("Redirecionando");
  router.push({ path: url });
}
function sair() {
  auth.Logout();
  acl.clearRoutesEnableWithUserAcls();
  redirectPageTo("/login");
}

onBeforeMount(() => {
  auth.isLogged();
});
</script>
