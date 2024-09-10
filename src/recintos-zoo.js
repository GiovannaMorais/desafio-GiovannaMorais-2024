class RecintosZoo {
  constructor() {
    this.recintos = [
      {
        numero: 1,
        bioma: "savana",
        tamanho: 10,
        animais: [{ especie: "macaco", quantidade: 3, tamanho: 1 }],
      },
      { numero: 2, bioma: "floresta", tamanho: 5, animais: [] },
      {
        numero: 3,
        bioma: "savana e rio",
        tamanho: 7,
        animais: [{ especie: "gazela", quantidade: 1, tamanho: 2 }],
      },
      { numero: 4, bioma: "rio", tamanho: 8, animais: [] },
      {
        numero: 5,
        bioma: "savana",
        tamanho: 9,
        animais: [{ especie: "leao", quantidade: 1, tamanho: 3 }],
      },
    ];

    this.animais = {
      LEAO: { tamanho: 3, biomas: ["savana"], carnivoro: true },
      LEOPARDO: { tamanho: 2, biomas: ["savana"], carnivoro: true },
      CROCODILO: { tamanho: 3, biomas: ["rio"], carnivoro: true },
      MACACO: { tamanho: 1, biomas: ["savana", "floresta"], carnivoro: false },
      GAZELA: { tamanho: 2, biomas: ["savana"], carnivoro: false },
      HIPOPOTAMO: { tamanho: 4, biomas: ["savana", "rio"], carnivoro: false },
    };
  }

  analisaRecintos(especieAnimal, quantidade) {
    const infoAnimal = this.animais[especieAnimal];
    if (!infoAnimal) {
      return { erro: "Animal inválido" };
    }

    if (quantidade <= 0) {
      return { erro: "Quantidade inválida" };
    }

    const recintosViaveis = [];

    this.recintos.forEach((recinto) => {
      const biomasRecinto = recinto.bioma.split(" e ");
      const biomaCompativel = biomasRecinto.some((bioma) =>
        infoAnimal.biomas.includes(bioma)
      );
      if (!biomaCompativel) {
        return;
      }

      let espacoOcupado = recinto.animais.reduce(
        (total, animal) => total + animal.quantidade * animal.tamanho,
        0
      );

      const existeOutraEspecie = recinto.animais.some(
        (animal) => animal.especie.toUpperCase() !== especieAnimal
      );

      if (existeOutraEspecie) {
        espacoOcupado += 1;
      }

      const espacoRestante = recinto.tamanho - espacoOcupado;
      const espacoNecessario = infoAnimal.tamanho * quantidade;

      const existeCarnivoro = recinto.animais.some(
        (animal) => this.animais[animal.especie.toUpperCase()].carnivoro
      );

      if (
        (existeCarnivoro && especieAnimal !== "HIPOPOTAMO") ||
        (infoAnimal.carnivoro && recinto.animais.length > 0)
      ) {
        return;
      }

      if (espacoRestante >= espacoNecessario) {
        recintosViaveis.push(
          `Recinto ${recinto.numero} (espaço livre: ${
            espacoRestante - espacoNecessario
          } total: ${recinto.tamanho})`
        );
      }
    });

    if (recintosViaveis.length === 0) {
      return { erro: "Não há recinto viável" };
    }

    return { recintosViaveis };
  }
}

export { RecintosZoo as RecintosZoo };
