
    // Função para mostrar/ocultar subperguntas
    function toggleSubquestion(elementId, show) {
      const element = document.getElementById(elementId);
      if (show) {
        element.style.display = 'block';
      } else {
        element.style.display = 'none';
        // Limpar campos quando a subpergunta é ocultada
        const inputs = element.querySelectorAll('input, select');
        inputs.forEach(input => {
          if (input.type === 'checkbox' || input.type === 'radio') {
            input.checked = false;
          } else {
            input.value = '';
          }
        });
      }
    }
    
    // Função específica para o PICC
    function togglePICC(select) {
      const piccSection = document.getElementById('picc-details');
      if (select.value === 'dificil') {
        piccSection.style.display = 'block';
      } else {
        piccSection.style.display = 'none';
        // Limpar os radios do PICC
        const piccRadios = document.querySelectorAll('input[name="picc"]');
        piccRadios.forEach(radio => radio.checked = false);
      }
    }
    
