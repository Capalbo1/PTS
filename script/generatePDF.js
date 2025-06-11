// script/generatePDF.js
function generatePDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF('p', 'mm', 'a4');
  const margin = 10;
  let verticalPosition = margin;
  const lineHeight = 7;
  
  // Título do documento
  doc.setFontSize(18);
  doc.text('Relatório de Anamnese', 105, verticalPosition, { align: 'center' });
  verticalPosition += 15;

  // Processar todas as perguntas
  const questionGroups = document.querySelectorAll('.question-group');
  
  questionGroups.forEach(group => {
    const questionText = group.querySelector('.question-text').textContent;
    const answer = getAnswer(group);
    
    // Quebra de texto para linhas longas
    const lines = doc.splitTextToSize(`${questionText}: ${answer}`, 180);
    
    lines.forEach(line => {
      if (verticalPosition > 280) {
        doc.addPage();
        verticalPosition = margin;
      }
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.text(line, margin, verticalPosition);
      verticalPosition += lineHeight;
    });
    
    verticalPosition += 5; // Espaço entre perguntas
  });

  doc.save('anamnese.pdf');
}

function getAnswer(container) {
  const answers = [];

  // Coletar respostas principais
  const mainQuestion = container.querySelector('.main-question');
  if (mainQuestion) {
    // Respostas de radio/select
    const checkedInput = mainQuestion.querySelector('input:checked');
    if (checkedInput) {
      answers.push(checkedInput.nextSibling.textContent.trim());
    }
    
    const select = mainQuestion.querySelector('select');
    if (select && select.value) {
      answers.push(select.options[select.selectedIndex].text);
    }
  }

  // Coletar subrespostas visíveis
  const subQuestions = container.querySelectorAll('.subquestion');
  subQuestions.forEach(sub => {
    if (window.getComputedStyle(sub).display !== 'none') {
      // Inputs de texto
      const textInputs = sub.querySelectorAll('input[type="text"], input[type="number"]');
      textInputs.forEach(input => {
        if (input.value) answers.push(`${input.previousElementSibling.textContent}: ${input.value}`);
      });

      // Checkboxes e radios
      const checkedSubInputs = sub.querySelectorAll('input:checked');
      checkedSubInputs.forEach(input => {
        answers.push(input.nextSibling.textContent.trim());
      });

      // Selects
      const subSelects = sub.querySelectorAll('select');
      subSelects.forEach(select => {
        if (select.value) {
          answers.push(`${select.previousElementSibling.textContent}: ${select.options[select.selectedIndex].text}`);
        }
      });
    }
  });

  return answers.join(', ') || 'Não respondido';
}

// Vinculando ao formulário
document.getElementById('formulario').addEventListener('submit', function(e) {
  e.preventDefault();
  generatePDF();
});