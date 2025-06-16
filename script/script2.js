// Função para mostrar ou esconder uma seção com base no clique do rádio
function toggleSection(id, show) {
  const element = document.getElementById(id);
  if (element) {
    element.classList.toggle("hidden", !show);
  }
}

// Função para mostrar ou esconder campos relacionados ao PICC conforme a dificuldade do AVP
function togglePICC(selectElement) {
  const piccDiv = document.getElementById("piccCampos");
  if (selectElement.value === "dificil") {
    piccDiv.classList.remove("hidden");
  } else {
    piccDiv.classList.add("hidden");
  }
}

// Impede envio do formulário e exibe os dados (opcional)
document.getElementById("formulario").addEventListener("submit", function (e) {
  e.preventDefault();
  const formData = new FormData(this);
  const dados = {};
  formData.forEach((value, key) => {
    if (dados[key]) {
      // Se já existe, transforma em array
      if (!Array.isArray(dados[key])) {
        dados[key] = [dados[key]];
      }
      dados[key].push(value);
    } else {
      dados[key] = value;
    }
  });
  console.log("Dados do formulário:", dados);
  alert("Formulário enviado! Confira os dados no console.");
});
