<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold text-center mb-6">Upload de Nota</h1>
    <div class="bg-base-200 p-6 rounded-lg shadow-md">
      <div class="form-control mb-4">
        <label for="numero_nota" class="label">
          <span class="label-text">Número da Nota:</span>
        </label>
        <input
          type="text"
          id="numero_nota"
          v-model="fieldsNotas.nome_nota"
          required
          class="input input-bordered w-full"
        />
      </div>
      <div class="form-control mb-4">
        <label for="caminho_nota" class="label">
          <span class="label-text">Caminho para Salvar:</span>
        </label>
        <input
          type="text"
          id="caminho_nota"
          v-model="fieldsNotas.caminho_nota"
          required
          class="input input-bordered w-full"
        />
      </div>
      <div class="form-control mb-4">
        <label for="foto_nota_fiscal" class="label">
          <span class="label-text">Foto da Nota Fiscal:</span>
        </label>
        <input
          type="file"
          id="foto_nota_fiscal"
          @change="onFileChangeNotaFiscal"
          required
          class="file-input file-input-bordered w-full"
        />
      </div>
      <div class="form-control mb-4">
        <label for="foto_caminhao" class="label">
          <span class="label-text">Foto do Caminhão:</span>
        </label>
        <input
          type="file"
          id="foto_caminhao"
          @change="onFileChangeCaminhao"
          required
          class="file-input file-input-bordered w-full"
        />
      </div>
      <div class="form-control mb-6">
        <label for="fotos_da_carga" class="label">
          <span class="label-text">Fotos da Carga:</span>
        </label>
        <input
          type="file"
          id="fotos_da_carga"
          @change="onFileChangeCarga"
          multiple
          required
          class="file-input file-input-bordered w-full"
        />
      </div>
      <button
        @click="enviarPDF()"
        class="btn btn-primary w-full"
        v-if="!isLoading"
      >
        <span>Enviar PDF</span>
      </button>

      <button class="btn btn-warning w-full" v-else>
        <span>
          <span class="loading loading-spinner"></span>Aguarde, enviando PDF...
        </span>
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useNotas } from "./composables/useNotas";

const { fieldsNotas, enviarPDF, isLoading } = useNotas();

const onFileChangeNotaFiscal = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    fieldsNotas.foto_nota_fiscal = input.files[0];
  }
};

const onFileChangeCaminhao = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    fieldsNotas.foto_caminhao = input.files[0];
  }
};

const onFileChangeCarga = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    fieldsNotas.fotos_da_carga = Array.from(input.files);
  }
};
</script>
