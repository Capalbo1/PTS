// script.js

document.addEventListener('DOMContentLoaded', function() {
  // Configurar o botão de PDF
  const btnPdf = document.getElementById('btnPdf');
  
  btnPdf.addEventListener('click', function() {
    // Obter os dados do formulário
    const form = document.getElementById('triagemForm');
    const formData = new FormData(form);
    
    // Criar um novo documento PDF
    const doc = new jsPDF();
    
    // Configurações do PDF
    doc.setFont('helvetica');
    doc.setFontSize(12);
    
    // Título do documento
    doc.setFontSize(16);
    doc.setTextColor(40);
    doc.text('Projeto Terapêutico Singular - Respostas da Triagem', 105, 15, null, null, 'center');
    doc.setFontSize(12);
    doc.text(new Date().toLocaleDateString(), 105, 22, null, null, 'center');
    
    // Linha divisória
    doc.line(20, 25, 190, 25);
    
    // Posição inicial para o conteúdo
    let y = 35;
    
    // Adicionar cada resposta ao PDF
    for (const [key, value] of formData.entries()) {
      // Pular campos vazios (exceto para observações)
      if (value === '' && key !== 'observacoes') continue;
      
      // Formatando a chave (pergunta) para melhor legibilidade
      const formattedKey = formatKey(key);
      
      // Adicionar ao PDF
      doc.setFont('helvetica', 'bold');
      doc.text(`${formattedKey}:`, 20, y);
      
      doc.setFont('helvetica', 'normal');
      const lines = doc.splitTextToSize(value.toString(), 160);
      doc.text(lines, 30, y + 7);
      
      // Atualizar a posição Y para a próxima pergunta
      y += (lines.length * 7) + 10;
      
      // Adicionar uma quebra de página se necessário
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
    }
    
    // Salvar o PDF
    doc.save('Respostas_Triagem_PTS.pdf');
  });
  
  // Função para formatar as chaves (nomes dos campos) para um texto mais legível
  function formatKey(key) {
    const replacements = {
      'nome': 'Nome completo',
      'idade': 'Idade',
      'sexo': 'Sexo',
      'dependente': 'Paciente é dependente',
      'suporte': 'Suporte assistencial adequado',
      'acamado': 'Paciente é acamado',
      'oxigenio': 'Faz uso de oxigênio domiciliar',
      'problema_psicologico': 'Possui problemas psicológicos',
      'observacoes': 'Observações'
    };
    
    return replacements[key] || key;
  }
});