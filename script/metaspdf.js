// Função para gerar PDF das metas
function gerarPDFMetas() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  
  // Configurações iniciais
  let y = 20;
  const pageHeight = doc.internal.pageSize.height;
  const margin = 15;
  
  // Título do documento
  doc.setFontSize(18);
  doc.text("Metas do Paciente", 105, y, null, null, 'center');
  y += 15;
  
  // Coletar todas as metas
  const todasMetas = [
    ...document.querySelectorAll('.resumo-item, .meta-padrao-item')
  ];
  
  // Separar metas realizadas e pendentes
  const realizadas = [];
  const pendentes = [];
  
  todasMetas.forEach(meta => {
    const checkbox = meta.querySelector('.resumo-checkbox');
    const texto = meta.querySelector('.resumo-texto').innerText;
    
    if (checkbox.checked) {
      realizadas.push(texto);
    } else {
      pendentes.push(texto);
    }
  });
  
  // Adicionar seção de Metas Realizadas
  if (realizadas.length > 0) {
    doc.setFontSize(14);
    doc.setTextColor(0, 100, 0); // Verde
    doc.text("✓ Metas Realizadas:", margin, y);
    y += 8;
    
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0); // Preto
    
    realizadas.forEach((meta, index) => {
      if (y > pageHeight - 20) {
        doc.addPage();
        y = margin;
      }
      
      doc.text(`• ${meta}`, margin, y);
      y += 8;
    });
    y += 5;
  }
  
  // Adicionar seção de Metas Pendentes
  if (pendentes.length > 0) {
    if (y > pageHeight - 30) {
      doc.addPage();
      y = margin;
    }
    
    doc.setFontSize(14);
    doc.setTextColor(200, 0, 0); // Vermelho
    doc.text("⨯ Metas Pendentes:", margin, y);
    y += 8;
    
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0); // Preto
    
    pendentes.forEach((meta, index) => {
      if (y > pageHeight - 20) {
        doc.addPage();
        y = margin;
      }
      
      doc.text(`• ${meta}`, margin, y);
      y += 8;
    });
  }
  
  // Salvar o PDF
  doc.save("metas_paciente.pdf");
}

// Adicionar evento ao botão
document.addEventListener('DOMContentLoaded', function() {
  const botaoPDF = document.getElementById('gerar-pdf-metas');
  if (botaoPDF) {
    botaoPDF.addEventListener('click', gerarPDFMetas);
  }
});