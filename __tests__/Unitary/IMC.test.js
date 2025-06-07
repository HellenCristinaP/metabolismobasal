
const { calcIMC, calcTMB } = require("../../public/scripts/scripts.cjs");
const { calcTabelaIMC } = require("../../public/scripts/scripts_PT.cjs");

describe("IMC functions", () => {
  describe("calcIMC", () => {
    it("should return null when weight or height is not provided", () => {
      const imc = calcIMC();

      expect(imc).toBeNull();
    });

    it("should return a valid IMC result when provided with valid weight and height", () => {
      const imc = calcIMC(90, 160);

      expect(imc).toBe("35.16");
    });

    it("should return null when provided with invalid weight or height values", () => {
      const imc = calcIMC(-70, 175);

      expect(imc).toBeNull();
    });

    it("should return the IMC calculation as a string", () => {
      const imc = calcIMC(70, 175);

      expect(typeof imc).toBe("string");
    });
  });

  describe("calcTMB function", () => {
    it("should calculate TMB for a male with normal activity level", () => {
      const result = calcTMB(70, 25, 175, "Masculino");

      expect(result).toEqual([
        [1673.75, 2008.5, 2301.40625, 2594.3125, 2887.21875, 3180.125],
        [2123.75, 1223.75],
      ]);
    });

    it("should calculate TMB for a female with normal activity level", () => {
      const result = calcTMB(65, 28, 170, "Feminino");

      expect(result).toEqual([
        [1411.5, 1693.8, 1940.8125, 2187.8250000000003, 2434.8375, 2681.85],
        [1861.5, 961.5],
      ]);
    });

    it("should calculate TMB for a female with sedentary lifestyle", () => {
      const result = calcTMB(60, 30, 160, "Female");

      expect(result).toEqual([
        [1289, 1546.8, 1772.375, 1997.95, 2223.525, 2449.1],
        [1739, 839],
      ]);
    });

    it("should return null when any negative number is provided", () => {
      const result = calcTMB(80, -35, 180, "Masculino");

      expect(result).toBeNull();
    });
  });

  describe("calcTabelaIMC function", () => {
    it("returns IMC category for a given IMC value", () => {
      const resultTabelaIMC = calcTabelaIMC(27);

      expect(resultTabelaIMC).toBe("Sobrepeso");
    });
  });
});
=======
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

