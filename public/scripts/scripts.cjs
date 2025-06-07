function validarEntradas(peso, altura, idade) {
  if (isNaN(peso) || peso < 1 || peso > 499) {
    alert("Peso inválido. Por favor, insira um valor entre 1 e 499 kg.");
    return false;
  }
  if (isNaN(altura) || altura < 1 || altura > 299) {
    alert("Altura inválida. Por favor, insira um valor entre 1 e 299 cm.");
    return false;
  }
  if (isNaN(idade) || idade < 1 || idade > 119) {
    alert("Idade inválida. Por favor, insira um valor entre 1 e 119 anos.");
    return false;
  }
  return true;
}

function obterDadosDoFormulario() {
  const genero = selecionaGeneroDoUsuario('genero');
  const peso = Number(document.getElementById('peso').value);
  const altura = Number(document.getElementById('altura').value);
  const idade = Number(document.getElementById('idade').value);

  if (!validarEntradas(peso, altura, idade)) {
    return null;
  }
  return { peso: peso, altura: altura, idade: idade, genero: genero };
}

function calcular(event) {
  event.preventDefault();
  const dadosFormulario = obterDadosDoFormulario();

  if (!dadosFormulario) {
    return;
  }

  const tmb = calcTMB(dadosFormulario.peso, dadosFormulario.idade, dadosFormulario.altura, dadosFormulario.genero);
  const niveisAtividade = calcularNiveisDeAtividade(tmb);
  const metasPeso = calcularMetasDePeso(tmb);
  const dadosIMC = calcIMC(dadosFormulario.peso, dadosFormulario.altura);

  mostrarResultados(niveisAtividade, metasPeso, dadosIMC);
};

function mostrarResultados(niveisAtividade, metasPeso, dadosIMC) {
  document.querySelectorAll('.result-item').forEach((item, index) => {
    item.innerHTML = Math.ceil(niveisAtividade[index]);
  });

  document.querySelectorAll('.result-peso').forEach((item, index) => {
    item.innerHTML = Math.ceil(metasPeso[index]);
  });

  document.getElementById('imc').innerHTML = dadosIMC;
  const chaveClassificacaoIMC = calcTabelaIMC(dadosIMC);
  const textoClassificacaoIMC = window.mensagensIMC && window.mensagensIMC[chaveClassificacaoIMC] ? window.mensagensIMC[chaveClassificacaoIMC] : chaveClassificacaoIMC;
  document.getElementById('imc_classification').innerHTML = textoClassificacaoIMC;
  document.getElementById('result-data').style.visibility = 'visible';
};

function selecionaGeneroDoUsuario(id) {
  const select = document.getElementById(id);
  return select.options[select.selectedIndex].value;
};

/* função para calcular a taxa metabólica basal e o nível de calorias necessárias
de acordo com a prática esportiva*/
function calcTMB(peso, idade, altura, genero) {
  const tmb =
    genero === 'Masculino'
      ? 10 * peso + 6.25 * altura - 5 * idade + 5
      : 10 * peso + 6.25 * altura - 5 * idade - 161;
  return tmb;
};

function calcularNiveisDeAtividade(tmb) {
  const sedentario = 1.2 * tmb;
  const exercicioLeve = 1.375 * tmb;
  const moderado = 1.55 * tmb;
  const ativo = 1.725 * tmb;
  const superAtivo = 1.9 * tmb;
  return [tmb, sedentario, exercicioLeve, moderado, ativo, superAtivo];
}

function calcularMetasDePeso(tmb) {
  const ganharPeso = tmb + 450;
  const perderPeso = tmb - 450;
  return [ganharPeso, perderPeso];
}

function calcIMC(peso, altura) {
  if (peso <= 0 || altura <= 0) {
    return null;
  };

  const alturaMetros = altura / 100;
  const imc = peso / (alturaMetros * alturaMetros);

  return imc.toFixed(2);
};

function calcTabelaIMC(imcValue) {
  const imc = parseFloat(imcValue);

  if (isNaN(imc)) {
    // This case should ideally not be reached if calcIMC always returns a valid number string or null
    // and if null from calcIMC is handled before calling calcTabelaIMC.
    // However, providing a fallback key is safer.
    return 'imc.unknown';
  }

  if (imc < 18.5) return 'imc.thinness';
  if (imc >= 18.5 && imc <= 24.9) return 'imc.normal';
  if (imc >= 25 && imc <= 29.9) return 'imc.overweight';
  if (imc >= 30 && imc <= 34.9) return 'imc.obesity1';
  if (imc >= 35 && imc <= 39.9) return 'imc.obesity2';
  if (imc >= 40) return 'imc.obesity3';

  return 'imc.unknown'; // Default fallback for values outside defined ranges
}

module.exports = {
  calcIMC,
  calcTMB,
  validarEntradas,
  obterDadosDoFormulario,
  calcularNiveisDeAtividade,
  calcularMetasDePeso,
  calcTabelaIMC
};