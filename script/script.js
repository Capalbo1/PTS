const form = document.getElementById('triagemForm');
const resultadoDiv = document.getElementById('resultado');

form.addEventListener('submit', function(event) {
  event.preventDefault();

  const dependente = form.dependente.value;
  const suporte = form.suporte.value;
  const acamado = form.acamado.value;
  const oxigenio = form.oxigenio.value;
  const problema_psicologico = form.problema_psicologico.value;

  const profs = new Set(['Médico', 'Enfermagem','Farmácia', 'Nutrição']);

  if (dependente === 'sim') {
    profs.add('Psicólogo');
    profs.add('Assistente Social');
  }

  if (suporte === 'nao') {
    profs.add('Psicólogo');
    profs.add('Assistente Social');
  }


  if (acamado === 'sim') {
    profs.add('Fisioterapeuta');
    profs.add('Assistente Social');
  }

  if (oxigenio === 'sim') {
    profs.add('Fisioterapeuta');
  }

  if (problema_psicologico === 'sim') {
    profs.add('Psicólogo');
  }

  const profList = Array.from(profs).sort();

  const temPsico = profs.has('Psicólogo');
  const temAssis = profs.has('Assistente Social');
  const temNutri = profs.has('Nutricionista');
  const temFisio = profs.has('Fisioterapeuta');

  const totalProfs = profs.size;

  // Verificação dos níveis conforme a nova lógica
let nivel = '';

// Nível 4: tem todos os profissionais básicos + fisio + psico
if (
  profs.has('Médico') &&
  profs.has('Enfermagem') &&
  profs.has('Farmácia') &&
  profs.has('Nutrição') &&
  temFisio &&
  temPsico
) {
  nivel = 'Nível 4 (Médico, Enfermagem, Farmácia, Nutrição, Fisioterapia e Psicologia)';
}
// Nível 3: tem profissionais básicos + fisio (psico opcional)
else if (
  profs.has('Médico') &&
  profs.has('Enfermagem') &&
  profs.has('Farmácia') &&
  profs.has('Nutrição') &&
  temFisio
) {
  nivel = 'Nível 3 (Médico, Enfermagem, Farmácia, Nutrição e Fisioterapia)';
}
// Nível 2: tem profissionais básicos + psico (sem fisio)
else if (
  profs.has('Médico') &&
  profs.has('Enfermagem') &&
  profs.has('Farmácia') &&
  profs.has('Nutrição') &&
  temPsico
) {
  nivel = 'Nível 2 (Médico, Enfermagem, Farmácia, Nutrição e Psicologia)';
}
// Nível 1: apenas os profissionais básicos
else if (
  profs.has('Médico') &&
  profs.has('Enfermagem') &&
  profs.has('Farmácia') &&
  profs.has('Nutrição')
) {
  nivel = 'Nível 1 (Médico, Enfermagem, Farmácia e Nutrição)';
}
// Caso não se encaixe em nenhum nível (teoricamente não deveria acontecer)
else {
  nivel = 'Nível não determinado';
}


  // Exibe resultado
  const mensagem = `
    <p><strong>Profissionais sugeridos:</strong> ${profList.join(', ')}</p>
    <p><strong>Classificação do nível de cuidado:</strong> ${nivel}</p>
  `;

  resultadoDiv.innerHTML = mensagem;
  resultadoDiv.style.display = 'block';

  // Atualiza o campo do select
  if (nivel.includes('Nível 1')) form.nivel_cuidado.value = 'baixo';
  else if (nivel.includes('Nível 2')) form.nivel_cuidado.value = 'moderado';
  else if (nivel.includes('Nível 3')) form.nivel_cuidado.value = 'alto';
  else form.nivel_cuidado.value = 'intensivo';
});
