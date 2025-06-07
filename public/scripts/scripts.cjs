
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

  mostrarResultados(dados, dadosIMC, ganharMassa);
  mostrarObjetivo();
}

function mostrarObjetivo() {
  const tipoExercicio = document.getElementById("tipoExercicio");
  const tipoExercicioValue = tipoExercicio.options[tipoExercicio.selectedIndex].value;
  console.log(tipoExercicioValue);
  const lis = document.querySelectorAll(
    "#lisedentario, #liexercicioLeve, #liexercicioModerado, #liativo, #lisuperAtivo"
  );

  if (tipoExercicioValue === "sedentario") {
    lis.forEach((li) => {
      li.style.display = "none";
    });
    document.getElementById("lisedentario").style.display = "block";
  } else if (tipoExercicioValue === "exercicioLeve") {
    lis.forEach((li) => {
      li.style.display = "none";
    });
    document.getElementById("liexercicioLeve").style.display = "block";
  } else if (tipoExercicioValue === "exercicioModerado") {
    lis.forEach((li) => {
      li.style.display = "none";
    });
    document.getElementById("liexercicioModerado").style.display = "block";
  } else if (tipoExercicioValue === "ativo") {
    lis.forEach((li) => {
      li.style.display = "none";
    });
    document.getElementById("liativo").style.display = "block";
  } else if (tipoExercicioValue === "superAtivo") {
    lis.forEach((li) => {
      li.style.display = "none";
    });
    document.getElementById("lisuperAtivo").style.display = "block";
  }
}

function mostrarResultados(dados, dadosIMC, ganharMassa) {
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
  document.getElementById("result-obj").style.visibility = "visible";

  document.getElementById("ganhar_massa").innerHTML = ganharMassa
    .map((item) => {
      return Math.ceil(item);
    })
    .join(" ~ ");
}

function selecionaGeneroDoUsuario(id) {
  const select = document.getElementById(id);
  return select.options[select.selectedIndex].value;
}

/* função para calcular a taxa metabólica basal e o nível de calorias necessárias
de acordo com a prática esportiva*/
function calcTMB(peso, idade, altura, genero) {
  const res =
    genero === "Masculino"
      ? 10 * peso + 6.25 * altura - 5 * idade + 5
      : 10 * peso + 6.25 * altura - 5 * idade - 161;
  const basal = res;
  const sedentario = 1.2 * res;
  const exercicioLeve = 1.375 * res;
  const moderado = 1.55 * res;
  const ativo = 1.725 * res;
  const superAtivo = 1.9 * res;
  const ganharPeso = res + 450;
  const perderPeso = res - 450;

  const resData = [
    [basal, sedentario, exercicioLeve, moderado, ativo, superAtivo],
    [ganharPeso, perderPeso],
  ];
  return resData;
}

function calcIMC(peso, altura) {
  if (peso <= 0 || altura <= 0) {
    return null;
  }

  const heightInMeters = altura / 100;
  const imc = peso / (heightInMeters * heightInMeters);

  return imc.toFixed(2);
}

module.exports = { calcIMC, calcTMB };