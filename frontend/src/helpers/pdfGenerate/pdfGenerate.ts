async function adicionarImagensAoPDF(imagens: File[], doc: any) {
  const larguraPagina = 210; // Largura da página A4 em mm
  const margem = 10; // Margem de 10 mm em cada lado
  let yOffset = margem; // Posição vertical inicial para as imagens

  for (const imagem of imagens) {
    const reader = new FileReader();
    await new Promise<void>((resolve) => {
      reader.onload = (e) => {
        const imgData = e.target?.result as string;
        const img = new Image();
        img.src = imgData;

        img.onload = () => {
          // Verificar se as dimensões da imagem são válidas
          if (img.width <= 0 || img.height <= 0) {
            console.error("Dimensões inválidas para a imagem:", imagem.name);
            resolve();
            return;
          }

          // Calcular a proporção da imagem
          const proporcao = img.height / img.width;

          // Definir a largura da imagem como 100% da página (com margens)
          const larguraImagem = larguraPagina - 2 * margem;
          const alturaImagem = larguraImagem * proporcao;

          // Verificar se a imagem cabe na página atual
          if (yOffset + alturaImagem > 297 - margem) {
            // 297 mm é a altura da página A4
            doc.addPage(); // Adiciona uma nova página
            yOffset = margem; // Reinicia o yOffset para o topo da nova página
          }

          // Adicionar a imagem ao PDF
          doc.addImage(
            imgData,
            "JPEG",
            margem,
            yOffset,
            larguraImagem,
            alturaImagem
          );

          // Atualizar o yOffset para a próxima imagem
          yOffset += alturaImagem + margem; // Adiciona uma margem de 10 mm entre as imagens
          resolve();
        };

        img.onerror = () => {
          console.error("Erro ao carregar a imagem:", imagem.name);
          resolve();
        };
      };
      reader.readAsDataURL(imagem);
    });
  }
}
function pdfToBlob(doc: any) {
  return doc.output("blob");
}

function addTextPdf(doc: any, texto: string, yOffset: number = 20) {
  doc.text(texto, 10, yOffset); // Adiciona o texto na posição (10, yOffset)
}

export { adicionarImagensAoPDF, pdfToBlob, addTextPdf };
