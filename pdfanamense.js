
    document.addEventListener('DOMContentLoaded', function() {
      const form = document.getElementById('triagemForm');
      const resultadoDiv = document.getElementById('resultado');
      const resumoDiv = document.getElementById('resumo');
      const btnPdf = document.getElementById('btnPdf');
      const sugestaoTexto = document.getElementById('sugestaoTexto');
      const btnReset = document.getElementById('btnReset');
      
      // Obter a data atual
      const hoje = new Date();
      const dataFormatada = hoje.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
      
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Coletar dados do formulário
        const formData = {
          nome: this.nome.value,
          idade: this.idade.value,
          sexo: this.sexo.value,
          dependente: this.querySelector('[name="dependente"]:checked').value,
          suporte: this.querySelector('[name="suporte"]:checked').value,
          acamado: this.querySelector('[name="acamado"]:checked').value,
          oxigenio: this.querySelector('[name="oxigenio"]:checked').value,
          problema_psicologico: this.querySelector('[name="problema_psicologico"]:checked').value,
          observacoes: this.observacoes.value,
          data: dataFormatada
        };
        
        // Validar se todos os campos obrigatórios foram preenchidos
        if (!formData.nome || !formData.idade || !formData.sexo) {
          alert('Por favor, preencha todos os campos obrigatórios.');
          return;
        }
        
        // Exibir resumo na div
        resumoDiv.innerHTML = `
          <div class="resumo-item"><strong>Nome:</strong> ${formData.nome}</div>
          <div class="resumo-item"><strong>Idade:</strong> ${formData.idade}</div>
          <div class="resumo-item"><strong>Sexo:</strong> ${formData.sexo}</div>
          <div class="resumo-item"><strong>Data da Triagem:</strong> ${formData.data}</div>
          <div class="resumo-item"><strong>Dependente:</strong> ${formData.dependente}</div>
          <div class="resumo-item"><strong>Suporte assistencial:</strong> ${formData.suporte}</div>
          <div class="resumo-item"><strong>Acamado:</strong> ${formData.acamado}</div>
          <div class="resumo-item"><strong>Uso de oxigênio:</strong> ${formData.oxigenio}</div>
          <div class="resumo-item"><strong>Problemas psicológicos:</strong> ${formData.problema_psicologico}</div>
          <div class="resumo-item"><strong>Observações:</strong> ${formData.observacoes || 'Nenhuma observação registrada'}</div>
        `;
        
        // Gerar sugestão do profissional
        let sugestao = "Com base nas informações fornecidas, ";
        
        if (formData.dependente === 'sim' || formData.acamado === 'sim') {
          sugestao += "recomendamos um nível de cuidado mais intensivo devido à dependência física do paciente. ";
        } else {
          sugestao += "o paciente demonstra independência nas atividades básicas. ";
        }
        
        if (formData.suporte === 'nao') {
          sugestao += "Observamos que o suporte assistencial é inadequado, sugerimos envolvimento familiar ou contratação de cuidador. ";
        }
        
        if (formData.oxigenio === 'sim') {
          sugestao += "O uso de oxigênio domiciliar requer monitoramento constante e treinamento dos cuidadores. ";
        }
        
        if (formData.problema_psicologico === 'sim') {
          sugestao += "A presença de problemas psicológicos indica a necessidade de acompanhamento especializado em saúde mental. ";
        }
        
        sugestaoTexto.textContent = sugestao;
        
        resultadoDiv.style.display = 'block';
      });
      
      // Botão para gerar PDF
      btnPdf.addEventListener('click', function() {
        gerarPDF();
      });
      
      // Botão para resetar formulário
      btnReset.addEventListener('click', function() {
        resultadoDiv.style.display = 'none';
      });
      
      // Função para gerar PDF
      function gerarPDF() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        // Adicionar cabeçalho
        doc.setFontSize(18);
        doc.setTextColor(44, 110, 181); // Cor azul
        doc.text("Relatório de Triagem", 105, 20, null, null, 'center');
        
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.text(`Data: ${dataFormatada}`, 15, 30);
        
        // Adicionar informações do paciente
        doc.setFontSize(14);
        doc.setTextColor(58, 158, 253); // Azul claro
        doc.text("Informações do Paciente", 15, 45);
        
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.text(`Nome: ${form.nome.value}`, 20, 55);
        doc.text(`Idade: ${form.idade.value}`, 20, 63);
        doc.text(`Sexo: ${form.sexo.value}`, 20, 71);
        
        // Adicionar respostas
        doc.setFontSize(14);
        doc.setTextColor(58, 158, 253);
        doc.text("Respostas da Triagem", 15, 85);
        
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        let y = 95;
        
        const perguntas = [
          {pergunta: "Paciente é dependente?", resposta: form.querySelector('[name="dependente"]:checked').value},
          {pergunta: "Suporte assistencial adequado?", resposta: form.querySelector('[name="suporte"]:checked').value},
          {pergunta: "Paciente é acamado?", resposta: form.querySelector('[name="acamado"]:checked').value},
          {pergunta: "Faz uso de oxigênio domiciliar?", resposta: form.querySelector('[name="oxigenio"]:checked').value},
          {pergunta: "Possui problemas psicológicos?", resposta: form.querySelector('[name="problema_psicologico"]:checked').value}
        ];
        
        perguntas.forEach(item => {
          doc.text(`• ${item.pergunta}: ${item.resposta}`, 20, y);
          y += 8;
        });
        
        // Adicionar observações
        if (form.observacoes.value) {
          doc.setFontSize(14);
          doc.setTextColor(58, 158, 253);
          doc.text("Observações", 15, y + 10);
          
          doc.setFontSize(12);
          doc.setTextColor(0, 0, 0);
          const splitObservacoes = doc.splitTextToSize(form.observacoes.value, 170);
          doc.text(splitObservacoes, 20, y + 20);
          y += 20 + (splitObservacoes.length * 5);
        }
        
        // Adicionar sugestão do profissional
        doc.setFontSize(14);
        doc.setTextColor(243, 113, 33); // Cor laranja
        doc.text("Sugestão do Profissional", 15, y + 30);
        
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        const splitSugestao = doc.splitTextToSize(sugestaoTexto.textContent, 170);
        doc.text(splitSugestao, 20, y + 40);
        
        // Adicionar rodapé
        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        doc.text("Documento gerado pelo Sistema CRV Soluções", 105, 280, null, null, 'center');
        
        // Salvar PDF
        doc.save(`triagem_${form.nome.value.replace(/\s+/g, '_')}.pdf`);
      }
    });
