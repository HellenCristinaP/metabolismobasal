const { calcIMC, calcTMB } = require('../../public/scripts/scripts.cjs');
const { calcTabelaIMC } = require('../../public/scripts/scripts_PT.cjs');

// Função que inclui a personalização de metas
function calcTMBComMetas(peso, idade, altura, sexo, objetivo) {
  let tmb = calcTMB(peso, idade, altura, sexo);

  // Ajuste de calorias com base no objetivo
  switch (objetivo) {
    case 'manter':
      return tmb;  // Manter peso
    case 'perder':
      return tmb - 500;  // Perder peso com déficit de 500 calorias
    case 'ganhar':
      return tmb + 500;  // Ganho de massa com excesso de 500 calorias
    default:
      return tmb;  // Se nenhum objetivo for selecionado, manter é o padrão
  }
}

// Testes
describe('calcIMC', () => {
  test('aplicação possui IMC', () => {
    const imc = calcIMC();
    expect(imc);
  });

  test('aplicação retorna o cálculo do imc', () => {
    const imc = calcIMC(70, 175);
    expect(imc).toBe('22.86');
  });

  test('aplicação não permite valores nulos', () => {
    const imc = calcIMC(-70, 175);
    expect(imc).toBeNull();
  });

  test('aplicação que retorna o resultado dos cálculos do TMB com metas', () => {
    const tmbManter = calcTMBComMetas(70, 21, 171, 'Masculino', 'manter');
    expect(tmbManter).toBeCloseTo(1729.25);

    const tmbPerder = calcTMBComMetas(70, 21, 171, 'Masculino', 'perder');
    expect(tmbPerder).toBeCloseTo(1229.25);

    const tmbGanhar = calcTMBComMetas(70, 21, 171, 'Masculino', 'ganhar');
    expect(tmbGanhar).toBeCloseTo(2229.25);
  });
});
    expect(tmb[0][4]).toBe(2878.59375)
  })

  test('aplicação que retorna o resultado das tabelas do IMC', () => {
    const resultTabelaIMC = calcTabelaIMC(27)
    expect(resultTabelaIMC).toBe('Sobrepeso')
  })
})
