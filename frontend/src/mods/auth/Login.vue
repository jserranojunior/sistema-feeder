<template>
  <div>
    <div class="context">
      <span v-if="auth && auth.auth">
                <div v-if="auth.auth.erro"
                  class="my-1 block text-sm text-gray-300 text-center bg-yellow-800 border border-yellow-900 h-8 items-center p-2 rounded-lg"
                  role="alert">{{ auth.auth.erro }}</div>
                <div v-if="auth.checkStateToken()"
                  class="my-1 block text-sm text-gray-300 text-center bg-green-800 border border-green-900 h-8 items-center p-2 rounded-sm"
                  role="alert">Logado com sucesso!</div>
              </span>
      <div
        class="container mx-auto mt-32 p-8 bg-white text-black max-w-md rounded shadow-md"
      >
        <!-- Formulário de Acesso -->
        <form action="#" method="POST">
          <h2 class="text-2xl font-bold mb-4">Acesse</h2>

          <!-- E-mail -->
          <div class="mb-4">
            <label
              for="email"
              class="block text-gray-700 text-sm font-bold mb-2"
              >E-mail</label
            >
            <input
              type="email"
              id="email"
              name="email"
              v-model="auth.fields.email"
              class="w-full px-3 py-2 border rounded"
            />
          </div>

          <!-- Senha -->
          <div class="mb-4">
            <label
              for="senha"
              class="block text-gray-700 text-sm font-bold mb-2"
            
              >Senha</label
            >
            <input
              type="password"
              id="senha"
              name="senha"
              v-model="auth.fields.password"
              class="w-full px-3 py-2 border rounded"
            />
          </div>

          <!-- Esqueci minha senha -->
          <div class="mb-4">
            <a href="#" class="text-blue-500 text-sm">Esqueci minha senha</a>
          </div>

          <!-- Botão de Acesso -->
          <div class="flex">
            <div class="w-1/2 mx-1">
              <div>
                <div @click="logar()"
                  class="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-700 cursor-pointer"
                >
                  Acessar
                </div>
              </div>
            </div>
            <div class="w-1/2 mx-1">
              <router-link :to="'/cadastro'" >
                
                
                <div
                class="w-full bg-green-500 text-white p-3 rounded hover:bg-green-700 cursor-pointer"
                >
                Cadastrar
                </div>
              </router-link>


          
              
            </div>
          </div>
        </form>

        <!-- Formulário de Cadastro -->
        <div class="mt-8">
          <!-- Botão de Cadastro -->
        </div>
      </div>

     
    </div>
   

  </div>
</template>
<script setup lang="ts">
import useStore from "../../helpers/stores/store"
import { onMounted, inject, reactive } from "vue";

let {auth, router, acl} = useStore()

  function redirectPageTo(url:string){ 
    router.push({ path: url })              
  }
  function logar(){
    auth.Login().then(async (res:boolean)=>{
         if(res){
          await acl.getUserAcl().then(() => {
          acl.generateRoutesEnableWithUserAcls();
        }).then(()=>{
          redirectPageTo("/financeiro")
        });
         }
      })
  }
  onMounted(async() => {
    document.addEventListener('keyup', function (event) {
      if (event.key == "Enter") {
        logar();
      }
    });

    await auth.isLogged().then((res)=>{
      if(res == true){
        redirectPageTo("/financeiro")
      }
    })
  })


</script>