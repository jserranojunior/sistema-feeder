<template>
         
              <div class="z-2 w-full text-sm p-3 btn-install-pwa cursor-pointer hover:bg-blue-900 bg-gray-800 text-center" @click="installPwa()">
                <span class="text-left font-bold">Aplicativo disponível para instalação </span>
                <div class="btn btn-primary btn-sm "  @click="installPwa()">Instalar</div>
              </div>
          

</template>

<script lang="ts">import { reactive,onMounted } from 'vue';

 export default {
setup()
{

  let state = reactive({
    pwaAlert: {} as any,
    myPrompt: {} as any,
  })
    function installPwa(){
      console.log("Instalar");
    state.myPrompt.prompt();
  }

  function setServiceWork(){
    if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js").then(
    function () {
      console.log("Registrado com sucesso o servicework, disponível para instalação");
    },
    function () {
      console.log("Problema ao fazer o registros");
    }
  );
} else {
  console.log("CLIENT: service worker is not supported.");
}
  }

  onMounted(()=>{
    setServiceWork()
    window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    state.myPrompt = e;
  });
})
  return{ installPwa }
}

 }
</script>
