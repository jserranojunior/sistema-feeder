<template>
  <div>
    <div class="context">
      <div class="flex items-center justify-center my-32">

        
            <div class="container mx-auto mt-8 p-8 bg-white text-black max-w-md rounded shadow-md">
              <h2 class="text-2xl font-bold mb-4">Cadastro</h2>
              <span v-if="register && register.fields">
                <div
                  v-if="register.erro"
                  class="my-1 block text-sm text-gray-300 text-center bg-yellow-800 border border-yellow-900 h-8 items-center p-2 rounded-lg"
                  role="alert"
                >
                  {{ register.erro }}
                </div>
              </span>

              <form class="form-control">

                <div class="mb-4">
    <label for="nome" class="block text-gray-700 text-sm font-bold mb-2">Nome Completo</label>
    <input v-model="register.fields.name" type="text" id="nome" name="nome" class="w-full px-3 py-2 border rounded">
</div>

<!-- E-mail -->
<div class="mb-4">
    <label for="cadastroEmail" class="block text-gray-700 text-sm font-bold mb-2">E-mail</label>
    <input v-model="register.fields.email" type="email" id="cadastroEmail" name="cadastroEmail" class="w-full px-3 py-2 border rounded">
</div>

<!-- Telefone -->
<div class="mb-4">
    <label for="telefone" class="block text-gray-700 text-sm font-bold mb-2">Telefone</label>
    <div class="flex">
                    <div class="dropdown w-auto max-w-xs ">
                      <label tabindex="0" class="btn btn-sm btn-warning h-full ">{{
                        register.phoneCode
                      }}</label>
                      <ul
                        tabindex="0"
                        class="dropdown-content menu p-2 shadow bg-white rounded-box w-52"
                      >
                        <li @click="register.phoneCode = '+55'">
                          <a>
                            <img
                              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Flag_of_Brazil.svg/33px-Flag_of_Brazil.svg.png"
                            />
                            +55
                          </a>
                        </li>
                        <li @click="register.phoneCode = '+591'">
                          <a>
                            <img
                              src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Flag_of_Bolivia.svg/33px-Flag_of_Bolivia.svg.png"
                            />
                            +591</a
                          >
                        </li>
                      
                      </ul>
                    </div>
                    <div class="w-full max-w-xs pl-2">
                      <input
                        id="cellphone"
                        v-model="register.fields.cellphone"
                        type="text"
                        class="w-full px-3 py-2 border rounded"
                        placeholder="Celular"
                        v-maska="'(##) #####-####'"
                      />
                    </div>
                  </div>
</div>


                 
              

<!-- Data de Nascimento -->
<div class="mb-4">
    <label for="dataNascimento" class="block text-gray-700 text-sm font-bold mb-2">Data de Nascimento</label>
    <input  v-maska="'##/##/####'" v-model="register.fields.dtnascimento" type="text" id="dataNascimento" name="dataNascimento" class="w-full px-3 py-2 border rounded" placeholder="dd/mm/yyyy">
</div>

<!-- Senha -->
<div class="mb-4">
    <label for="cadastroSenha" class="block text-gray-700 text-sm font-bold mb-2">Senha</label>
    <input v-model="register.fields.password" type="password" id="cadastroSenha" name="cadastroSenha" class="w-full px-3 py-2 border rounded">
</div>

<!-- Confirmação de Senha -->
<div class="mb-4">
    <label for="confirmacaoSenha" class="block text-gray-700 text-sm font-bold mb-2">Confirmação de Senha</label>
    <input v-model="register.confirmPassword" type="password" id="confirmacaoSenha" name="confirmacaoSenha" class="w-full px-3 py-2 border rounded">
</div>


              
              

              </form>
              <div class="mt-2 border-t"></div>
              <div class="flex">
        <div class="w-1/2 mx-1">
            <a href="/">
            <div  class="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-700 cursor-pointer">Acessar</div>
        </a>
        </div>
        <div class="w-1/2 mx-1">
           
            <div class="w-full bg-green-500 text-white p-3 rounded hover:bg-green-700 cursor-pointer" @click="cadastrar()">Cadastrar</div>
      
        </div>
    </div>
            </div>
      
    
      </div>
    </div>
      

  </div>
</template>
<script setup lang="ts">
import useStore from "../../helpers/stores/store";
import { onMounted, inject, reactive, watch } from "vue";
import phoneMask from '../../helpers/mask/phoneMask';

let { register, router, auth } = useStore();

function redirectPageTo(url: string) {
  router.push({ path: url });
}
function cadastrar() {
  register.Register().then(async (res: boolean) => {
    if (res) {
      await logar();
    }
  });
}
async function logar() {
  auth.fields.email = register.fields.email;
  auth.fields.password = register.fields.password;
  await auth.Login().then((res: boolean) => {
    if (res) {
      redirectPageTo("/financeiro");
    }
  });
}

function filterDataNascimento(value:string){
  var value = value.replace(/\D/g, ''); // Remove caracteres não numéricos
       if (value.length > 0) {
           value = value.replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3');
       }
      return value
}
onMounted(() => {
  document.addEventListener("keyup", (event) => {
    if (event.key == "Enter") {
      cadastrar();
    }
  });

  document.addEventListener('DOMContentLoaded', function() {
   
   // Adiciona a máscara ao campo de data
   var dataNascimentoInput = document.getElementById('dataNascimento');
});


});


</script>
