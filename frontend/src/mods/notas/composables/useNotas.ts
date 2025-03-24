import { reactive, ref } from "vue";
import jsPDF from "jspdf";
import axios from "axios";
import {
  adicionarImagensAoPDF,
  pdfToBlob,
  addTextPdf,
} from "../../../helpers/pdfGenerate/pdfGenerate";

export function useNotas() {
  const fieldsNotas = reactive({
    nome_nota: "",
    caminho_nota: "",
    foto_nota_fiscal: null as File | null,
    foto_caminhao: null as File | null,
    fotos_da_carga: [] as File[],
  });

  const isLoading = ref(false); // Estado de carregamento

  async function generatePDF() {
    const doc = new jsPDF();

    // Adicionar o número da nota
    doc.text(`Número da Nota: ${fieldsNotas.nome_nota}`, 10, 10);

    let yOffset = 20; // Posição vertical inicial após o número da nota

    // Adicionar a foto da nota fiscal
    if (fieldsNotas.foto_nota_fiscal) {
      doc.text("Foto da Nota", 10, yOffset);
      yOffset += 10; // Aumentar o yOffset para a imagem

      const imgData = await fileToDataURL(fieldsNotas.foto_nota_fiscal);
      const img = await loadImage(imgData);

      const proporcao = img.height / img.width;
      const larguraImagem = 190; // Largura da imagem com margens
      const alturaImagem = larguraImagem * proporcao;

      if (yOffset + alturaImagem > 297 - 10) {
        // Verificar se a imagem cabe na página
        doc.addPage();
        yOffset = 10;
      }

      doc.addImage(imgData, "JPEG", 10, yOffset, larguraImagem, alturaImagem);
      yOffset += alturaImagem + 10; // Aumentar o yOffset para a próxima seção
    }

    // Adicionar a foto do caminhão
    if (fieldsNotas.foto_caminhao) {
      doc.text("Foto do Caminhão", 10, yOffset);
      yOffset += 10;

      const imgData = await fileToDataURL(fieldsNotas.foto_caminhao);
      const img = await loadImage(imgData);

      const proporcao = img.height / img.width;
      const larguraImagem = 190;
      const alturaImagem = larguraImagem * proporcao;

      if (yOffset + alturaImagem > 297 - 10) {
        doc.addPage();
        yOffset = 10;
      }

      doc.addImage(imgData, "JPEG", 10, yOffset, larguraImagem, alturaImagem);
      yOffset += alturaImagem + 10;
    }

    // Adicionar as fotos da carga
    if (fieldsNotas.fotos_da_carga.length > 0) {
      doc.text("Fotos da Carga", 10, yOffset);
      yOffset += 10;

      for (const foto of fieldsNotas.fotos_da_carga) {
        const imgData = await fileToDataURL(foto);
        const img = await loadImage(imgData);

        const proporcao = img.height / img.width;
        const larguraImagem = 190;
        const alturaImagem = larguraImagem * proporcao;

        if (yOffset + alturaImagem > 297 - 10) {
          doc.addPage();
          yOffset = 10;
        }

        doc.addImage(imgData, "JPEG", 10, yOffset, larguraImagem, alturaImagem);
        yOffset += alturaImagem + 10;
      }
    }

    // Converter o PDF para Blob
    return pdfToBlob(doc);
  }

  // Função auxiliar para converter File para Data URL
  function fileToDataURL(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);
    });
  }

  // Função auxiliar para carregar uma imagem
  function loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error("Erro ao carregar a imagem"));
      img.src = src;
    });
  }

  async function enviarPDF() {
    isLoading.value = true; // Ativar o estado de carregamento

    try {
      const pdfBlob = await generatePDF();

      // Criar o FormData
      const formData = new FormData();
      formData.append("numero_nota", fieldsNotas.nome_nota);
      formData.append("caminho_nota", fieldsNotas.caminho_nota);
      formData.append("foto_nota", pdfBlob, "nota_fiscal.pdf");

      // Enviar os dados para a API
      const response = await axios.post(
        "http://localhost:8000/notas",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Resposta da API:", response.data);
    } catch (error) {
      console.error("Erro ao enviar dados para a API:", error);
    } finally {
      isLoading.value = false; // Desativar o estado de carregamento
    }
  }

  return { fieldsNotas, enviarPDF, isLoading };
}
