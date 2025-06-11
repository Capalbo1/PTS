const form = document.getElementById('triagemForm');
const resultadoDiv = document.getElementById('resultado');

form.addEventListener('submit', function(event) {
  event.preventDefault();

  const dependente = form.dependente.value;
  const suporte = form.suporte.value;
  const alimenta_sozinho = form.alimenta_sozinho.value;
  const acamado = form.acamado.value;
  const oxigenio = form.oxigenio.value;
  const problema_psicologico = form.problema_psicologico.value;

  const profs = new Set(['Médico', 'Enfermeiro']);

  if (dependente === 'sim') {
    profs.add('Psicólogo');
    profs.add('Assistente Social');
  }

  if (suporte === 'nao') {
    profs.add('Psicólogo');
    profs.add('Assistente Social');
  }

  if (alimenta_sozinho === 'nao') {
    profs.add('Nutricionista');
    profs.add('Assistente Social');
  }

  if (acamado === 'sim') {
    profs.add('Fisioterapeuta');
    profs.add('Nutricionista');
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

  let nivel = '';

  // Verifica se tem todos os profissionais
  if (
    profs.has('Médico') &&
    profs.has('Enfermeiro') &&
    temPsico &&
    temAssis &&
    temNutri &&
    temFisio
  ) {
    nivel = 'Nível 4 (Todos os profissionais)';
  }

  // Nível 3: tem Médico + Enfermeiro + Fisio/Nutri/Assistente
  else if (
    (temFisio || temNutri || temAssis) &&
    profs.has('Médico') &&
    profs.has('Enfermeiro')
  ) {
    nivel = 'Nível 3 (Médico, Enfermeiro, e Fisioterapeuta/Nutricionista/Assistente Social)';
  }

  // Nível 2: Médico + Enfermeiro + Psico ou Assis (sem Nutri/Fisio)
  else if (
    (temPsico || temAssis) &&
    !temNutri &&
    !temFisio
  ) {
    nivel = 'Nível 2 (Médico, Enfermeiro, Psicólogo e/ou Assistente Social)';
  }

  // Nível 1: Apenas Médico e Enfermeiro
  else {
    nivel = 'Nível 1 (Médico e Enfermeiro)';
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
