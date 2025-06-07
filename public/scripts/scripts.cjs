
function calcular(event) {
  event.preventDefault();
  const peso = Number(document.getElementById("peso").value);
  const idade = Number(document.getElementById("idade").value);
  const altura = Number(document.getElementById("altura").value);
  const genero = selecionaGeneroDoUsuario("genero");
  const dados = calcTMB(peso, idade, altura, genero);
  const dadosIMC = calcIMC(peso, altura);
  const ganhoMassaMin = peso * 0.8;
  const ganhoMassaMax = peso * 1.4;
  const ganharMassa = [ganhoMassaMin, ganhoMassaMax];


  mostrarResultados(dados, dadosIMC);
}

function mostrarResultados(dados, dadosIMC) {
  document.querySelectorAll(".result-item").forEach((item, index) => {

    item.innerHTML = Math.ceil(dados[0][index]);
  });

  document.querySelectorAll(".result-peso").forEach((item, index) => {
    item.innerHTML = Math.ceil(dados[1][index]);
  });

  document.getElementById("imc").innerHTML = Math.ceil(dadosIMC);
  document.getElementById("imc_classification").innerHTML =
    calcTabelaIMC(dadosIMC);
  document.getElementById("result-data").style.visibility = "visible";
}

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
  document.getElementById('result-obj').style.visibility = 'visible';

  document.getElementById('ganhar_massa').innerHTML = ganharMassa.map((item) => {
    return Math.ceil(item);
  }).join(' ~ ');
};


function selecionaGeneroDoUsuario(id) {
  const select = document.getElementById(id);
  return select.options[select.selectedIndex].value;
}

/* Function to calculate basal metabolic rate and the level of necessary calories
according to physical activity */
const calcTMB = (weight, age, height, gender) => {
  const unknownGender = gender !== "Masculino" && gender !== "Feminino";
  const invalidProps = weight < 0 || age < 0 || height < 0;


  if (invalidProps || unknownGender) {
    return null;
  }

  const result = gender === "Masculino"
      ? 10 * weight + 6.25 * height - 5 * age + 5
      : 10 * weight + 6.25 * height - 5 * age - 161;
  const basal = result;
  const sedentary = 1.2 * result;
  const lightExercise = 1.375 * result;
  const moderate = 1.55 * result;
  const active = 1.725 * result;
  const veryActive = 1.9 * result;
  const gainWeight = result + 450;
  const loseWeight = result - 450;

  const resultData = [
    [basal, sedentary, lightExercise, moderate, active, veryActive],
    [gainWeight, loseWeight],
  ];

  return resultData;
};

const calcIMC = (weight, height) => {
  const isValidWeight = !isNaN(weight) && weight > 0;
  const isValidHeight = !isNaN(height) && height > 0;

  if (!isValidWeight || !isValidHeight) {

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
  }

  const heightInMeters = height / 100;
  const imc = weight / (heightInMeters * heightInMeters);

  return imc.toFixed(2);
};

module.exports = { calcIMC, calcTMB };

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

