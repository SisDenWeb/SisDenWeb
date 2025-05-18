// Dados iniciais de exemplo
const dadosIniciais = {
  admin: {
    admin: "admin123",
    root: "toor",
  },
  employers: [
    {
      name: "Carlos Silva",
      id: 123,
      cpf: "032.093.090-23",
      password: "123",
    },
    {
      name: "Fernanda Lima",
      id: 67890,
      cpf: "072.063.040-23",
      password: "xyz456",
    },
  ],
  cases: [
    {
      id: 1,
      dados_gerais: {
        tipo_notificacao: "Individual",
        agravo_doenca: "1 - Dengue",
        cid10: "A90",
        data_notificacao: "2025-04-21",
        uf: "SP",
        municipio_notificacao: "São Paulo",
        unidade_saude: "UBS Central",
        codigo_unidade: "123456",
        codigo_ibge: "3550308",
        data_primeiros_sintomas: "2025-04-18",
      },
      notificacao_individual: {
        nome_paciente: "Maria Souza",
        data_nascimento: "1990-03-12",
        idade: 35,
        sexo: "F",
        gestante: "2º Trimestre",
        raca_cor: "Parda",
        escolaridade: "6 - Ensino médio completo",
        cartao_sus: String("898001160138957"),
        nome_mae: "Ana Souza",
      },
      residencia: {
        telefone: "11 99999-1234",
        uf: "SP",
        municipio: "São Paulo",
        codigo_ibge: "3550308",
        distrito: "Sé",
        bairro: "Centro",
        logradouro: "Rua das Flores",
        codigo_logradouro: "67890",
        numero: "150",
        complemento: "Apto 203",
        geo1: "-23.5505",
        geo2: "-46.6333",
        referencia: "Próximo à praça central",
        cep: "01001-000",
        zona: "1 - Urbana",
        pais_estrangeiro: "",
      },
      investigacao: {
        data_investigacao: "2025-04-19",
        ocupacao: "Professora",
      },
      dados_clinicos: {
        sinais_clinicos: {
          possui: true,
          lista: ["Febre", "Cefaleia", "Náuseas"],
        },
        doencas_pre_existentes: {
          possui: true,
          lista: ["Diabetes", "Hipertensão arterial"],
        },
      },
      exames_laboratoriais: {
        sorologia_chikungunya: {
          coleta_s1: "2025-04-20",
          resultado_s1: "2 - Negativo",
          coleta_s2: "2025-04-22",
          resultado_s2: "2 - Negativo",
        },
        prnt: {
          coleta: "2025-04-21",
          resultado: "2 - Não Reagente",
        },
        sorologia_dengue: {
          coleta: "2025-04-20",
          resultado: "1 - Positivo",
        },
        isolamento: {
          coleta: "2025-04-20",
          resultado: "3 - Inconclusivo",
        },
        ns1: {
          coleta: "2025-04-19",
          resultado: "1 - Positivo",
        },
        rt_pcr: {
          coleta: "2025-04-20",
          resultado: "1 - Positivo",
        },
        sorotipo: "1 - DENV1",
        histopatologia: "4 - Não Realizado",
        imunohistoquimica: "4 - Não Realizado",
      },
      hospitalizacao: {
        ocorreu: "1",
        data_internacao: "2025-04-20",
        uf: "SP",
        municipio: "São Paulo",
        codigo_ibge: "3550308",
        nome_hospital: "Hospital Municipal Central",
        codigo_hospital: "HMC-001",
        telefone: "11 3222-4455",
      },
      conclusao: {
        autoctone: "1",
        localProvavel: {
          uf: "SP",
          pais: "Brasil",
          municipio: "São Paulo",
          codigo_ibge: "3550308",
          distrito: "Sé",
          bairro: "Centro",
        },
        classificacao: "10",
        criterio_confirmacao: "1",
        apresentacao_clinica: "1",
        evolucao: "1",
        data_obito: null,
        data_encerramento: "2025-04-25",
      },
      dengue_com_sinais_de_alarme: {
        apresentou: "1",
        sintomas: ["Vômitos persistentes", "Letargia ou irritabilidade"],
        data_inicio: "2025-04-19",
      },
      dengue_grave: {
        apresentou: "1",
        extravasamento_grave_de_plasma: [
          "Pulso débil ou PA convergente",
          "Acúmulo de líquidos com insuficiência respiratória",
        ],
        sangramento_grave: ["Hematêmese"],
        comprometimento_orgao: ["AST/ALT > 1.000"],
        outros: "Insuficiência hepática leve",
        data_inicio: "2025-04-20",
      },
      informacoes_complementares: {
        deslocamento: "sim",
        data_local: "2025-04-10 / Rio de Janeiro",
        vacina_febre_amarela: "2019-03-15",
        dengue_anterior: "2022-02",
        pressao_arterial: "120/80 - 110/70",
        prova_laco: "positiva",
        ictericia: "nao",
        hemograma: "sim",
        hemograma_1: {
          data: "2025-04-18",
          plaquetas: "135000",
          leucocitos: "5000",
          hematocrito: "42",
        },
        hemograma_2: {
          data: "2025-04-20",
          plaquetas: "110000",
          leucocitos: "4500",
          hematocrito: "44",
        },
        classificacao_risco: "b",
      },
      investigador: {
        municipio_unidade: "São Paulo / UBS Central",
        cod_unidade: "123456",
        nome: "Dr. João Lima",
        funcao: "Médico responsável",
      },
    },
    {
      id: 2,
      dados_gerais: {
        tipo_notificacao: "Individual",
        agravo_doenca: "2 - Chikungunya",
        cid10: "A92.0",
        data_notificacao: "2025-05-10",
        uf: "RJ",
        municipio_notificacao: "Rio de Janeiro",
        unidade_saude: "UBS Copacabana",
        codigo_unidade: "789123",
        codigo_ibge: "3304557",
        data_primeiros_sintomas: "2025-05-07",
      },
      notificacao_individual: {
        nome_paciente: "Carlos Oliveira",
        data_nascimento: "1985-08-24",
        idade: 39,
        sexo: "M",
        gestante: "Não se aplica",
        raca_cor: "Branca",
        escolaridade: "8 - Superior completo",
        cartao_sus: String("898001160140275"),
        nome_mae: "Lucia Oliveira",
      },
      residencia: {
        telefone: "21 98888-5678",
        uf: "RJ",
        municipio: "Rio de Janeiro",
        codigo_ibge: "3304557",
        distrito: "Copacabana",
        bairro: "Posto 5",
        logradouro: "Avenida Atlântica",
        codigo_logradouro: "112233",
        numero: "3000",
        complemento: "Cobertura 1",
        geo1: "-22.9711",
        geo2: "-43.1822",
        referencia: "Próximo ao Forte",
        cep: "22070-000",
        zona: "1 - Urbana",
        pais_estrangeiro: "",
      },
      investigacao: {
        data_investigacao: "2025-05-08",
        ocupacao: "Engenheiro Civil",
      },
      dados_clinicos: {
        sinais_clinicos: {
          possui: true,
          lista: ["Febre", "Dor retroorbital", "Mialgia", "Exantema"],
        },
        doencas_pre_existentes: {
          possui: false,
          lista: [],
        },
      },
      exames_laboratoriais: {
        sorologia_chikungunya: {
          coleta_s1: "2025-05-09",
          resultado_s1: "1 - Positivo",
          coleta_s2: "",
          resultado_s2: "",
        },
        prnt: {
          coleta: "",
          resultado: "",
        },
        sorologia_dengue: {
          coleta: "2025-05-09",
          resultado: "2 - Negativo",
        },
        isolamento: {
          coleta: "",
          resultado: "",
        },
        ns1: {
          coleta: "",
          resultado: "",
        },
        rt_pcr: {
          coleta: "2025-05-10",
          resultado: "2 - Negativo",
        },
        sorotipo: "",
        histopatologia: "4 - Não Realizado",
        imunohistoquimica: "4 - Não Realizado",
      },
      hospitalizacao: {
        ocorreu: "2",
        data_internacao: "",
        uf: "",
        municipio: "",
        codigo_ibge: "",
        nome_hospital: "",
        codigo_hospital: "",
        telefone: "",
      },
      conclusao: {
        autoctone: "1",
        localProvavel: {
          uf: "RJ",
          pais: "Brasil",
          municipio: "Rio de Janeiro",
          codigo_ibge: "3304557",
          distrito: "Copacabana",
          bairro: "Posto 5",
        },
        classificacao: "13",
        criterio_confirmacao: "1",
        apresentacao_clinica: "1",
        evolucao: "1",
        data_obito: null,
        data_encerramento: "2025-05-15",
      },
      dengue_com_sinais_de_alarme: {
        apresentou: "2",
        sintomas: [],
        data_inicio: null,
      },
      dengue_grave: {
        apresentou: "2",
        extravasamento_grave_de_plasma: [],
        sangramento_grave: [],
        comprometimento_orgao: [],
        outros: "",
        data_inicio: null,
      },
      informacoes_complementares: {
        deslocamento: "nao",
        data_local: "",
        vacina_febre_amarela: "2017-07-12",
        dengue_anterior: "",
        pressao_arterial: "120/80",
        prova_laco: "negativa",
        ictericia: "nao",
        hemograma: "sim",
        hemograma_1: {
          data: "2025-05-08",
          plaquetas: "180000",
          leucocitos: "7000",
          hematocrito: "41",
        },
        hemograma_2: {
          data: "",
          plaquetas: "",
          leucocitos: "",
          hematocrito: "",
        },
        classificacao_risco: "a",
      },
      investigador: {
        municipio_unidade: "Rio de Janeiro / UBS Copacabana",
        cod_unidade: "789123",
        nome: "Dra. Helena Martins",
        funcao: "Médica responsável",
      },
    },
    {
      id: 3,
      dados_gerais: {
        tipo_notificacao: "Individual",
        agravo_doenca: "2 - Chikungunya",
        cid10: "A92.0",
        data_notificacao: "2025-04-13 00:00:00",
        uf: "BA",
        municipio_notificacao: "Salvador",
        unidade_saude: "UBS Salvador",
        codigo_unidade: "100003",
        codigo_ibge: "3300003",
        data_primeiros_sintomas: "2025-04-11 00:00:00",
      },
      notificacao_individual: {
        nome_paciente: "Carlos Andrade",
        data_nascimento: "1983-04-04 00:00:00",
        idade: 42,
        sexo: "F",
        gestante: "Não se aplica",
        raca_cor: "Parda",
        escolaridade: "6 - Ensino médio completo",
        cartao_sus: String("898001160142499"),
        nome_mae: "Mãe 3",
      },
      residencia: {
        telefone: "63 99247-4488",
        uf: "BA",
        municipio: "Salvador",
        codigo_ibge: "3300003",
        distrito: "Centro",
        bairro: "Bairro A",
        logradouro: "Rua X",
        codigo_logradouro: "20003",
        numero: "103",
        complemento: "Apto 3",
        geo1: "-23.5",
        geo2: "-46.6",
        referencia: "Ponto de referência",
        cep: "01003-000",
        zona: "1 - Urbana",
        pais_estrangeiro: "",
      },
      investigacao: {
        data_investigacao: "2025-04-12 00:00:00",
        ocupacao: "Servidor público",
      },
      dados_clinicos: {
        sinais_clinicos: {
          possui: true,
          lista: [
            "Mialgia",
            "Petéquias",
            "Artrite",
            "Dor nas costas",
            "Cefaleia",
          ],
        },
        doencas_pre_existentes: {
          possui: true,
          lista: ["Doenças hematológicas", "Hepatopatias", "Neoplasias"],
        },
      },
      exames_laboratoriais: {
        sorologia_chikungunya: {
          coleta_s1: "2025-04-13 00:00:00",
          resultado_s1: "1 - Positivo",
          coleta_s2: "",
          resultado_s2: "",
        },
        prnt: {
          coleta: "",
          resultado: "",
        },
        sorologia_dengue: {
          coleta: "2025-04-13 00:00:00",
          resultado: "2 - Negativo",
        },
        isolamento: {
          coleta: "",
          resultado: "",
        },
        ns1: {
          coleta: "",
          resultado: "",
        },
        rt_pcr: {
          coleta: "2025-04-13 00:00:00",
          resultado: "2 - Negativo",
        },
        sorotipo: "",
        histopatologia: "4 - Não Realizado",
        imunohistoquimica: "4 - Não Realizado",
      },
      hospitalizacao: {
        ocorreu: "2",
        data_internacao: "",
        uf: "",
        municipio: "",
        codigo_ibge: "",
        nome_hospital: "",
        codigo_hospital: "",
        telefone: "",
      },
      conclusao: {
        autoctone: "1",
        localProvavel: {
          uf: "BA",
          pais: "Brasil",
          municipio: "Salvador",
          codigo_ibge: "3300003",
          distrito: "Centro",
          bairro: "Bairro A",
        },
        classificacao: "10",
        criterio_confirmacao: "2",
        apresentacao_clinica: "1",
        evolucao: "1",
        data_obito: null,
        data_encerramento: "2025-04-18 00:00:00",
      },
      dengue_com_sinais_de_alarme: {
        apresentou: "2",
        sintomas: [],
        data_inicio: null,
      },
      dengue_grave: {
        apresentou: "2",
        extravasamento_grave_de_plasma: [],
        sangramento_grave: [],
        comprometimento_orgao: [],
        outros: "",
        data_inicio: null,
      },
      informacoes_complementares: {
        deslocamento: "nao",
        data_local: "",
        vacina_febre_amarela: "2020-01-01",
        dengue_anterior: "",
        pressao_arterial: "120/80",
        prova_laco: "negativa",
        ictericia: "nao",
        hemograma: "sim",
        hemograma_1: {
          data: "2025-04-11 00:00:00",
          plaquetas: "197044",
          leucocitos: "5220",
          hematocrito: "38",
        },
        hemograma_2: {
          data: "",
          plaquetas: "",
          leucocitos: "",
          hematocrito: "",
        },
        classificacao_risco: "a",
      },
      investigador: {
        municipio_unidade: "Salvador / UBS Salvador",
        cod_unidade: "100003",
        nome: "Dr. Investigador 3",
        funcao: "Responsável técnico",
      },
    },
    {
      id: 4,
      dados_gerais: {
        tipo_notificacao: "Individual",
        agravo_doenca: "1 - Dengue",
        cid10: "A90",
        data_notificacao: "2025-04-14 00:00:00",
        uf: "RJ",
        municipio_notificacao: "Rio de Janeiro",
        unidade_saude: "UBS Rio de Janeiro",
        codigo_unidade: "100004",
        codigo_ibge: "3300004",
        data_primeiros_sintomas: "2025-04-12 00:00:00",
      },
      notificacao_individual: {
        nome_paciente: "Luiz Alberto",
        data_nascimento: "1984-05-05 00:00:00",
        idade: 41,
        sexo: "M",
        gestante: "Não se aplica",
        raca_cor: "Parda",
        escolaridade: "6 - Ensino médio completo",
        cartao_sus: String("898001160144782"),
        nome_mae: "Mãe 4",
      },
      residencia: {
        telefone: "69 96074-1960",
        uf: "RJ",
        municipio: "Rio de Janeiro",
        codigo_ibge: "3300004",
        distrito: "Centro",
        bairro: "Bairro A",
        logradouro: "Rua X",
        codigo_logradouro: "20004",
        numero: "104",
        complemento: "Apto 4",
        geo1: "-23.5",
        geo2: "-46.6",
        referencia: "Ponto de referência",
        cep: "01004-000",
        zona: "1 - Urbana",
        pais_estrangeiro: "",
      },
      investigacao: {
        data_investigacao: "2025-04-13 00:00:00",
        ocupacao: "Servidor público",
      },
      dados_clinicos: {
        sinais_clinicos: {
          possui: true,
          lista: ["Náuseas", "Vômito"],
        },
        doencas_pre_existentes: {
          possui: true,
          lista: ["Hepatopatias", "Hipertensão arterial"],
        },
      },
      exames_laboratoriais: {
        sorologia_chikungunya: {
          coleta_s1: "2025-04-14 00:00:00",
          resultado_s1: "1 - Positivo",
          coleta_s2: "",
          resultado_s2: "",
        },
        prnt: {
          coleta: "",
          resultado: "",
        },
        sorologia_dengue: {
          coleta: "2025-04-14 00:00:00",
          resultado: "2 - Negativo",
        },
        isolamento: {
          coleta: "",
          resultado: "",
        },
        ns1: {
          coleta: "",
          resultado: "",
        },
        rt_pcr: {
          coleta: "2025-04-14 00:00:00",
          resultado: "2 - Negativo",
        },
        sorotipo: "",
        histopatologia: "4 - Não Realizado",
        imunohistoquimica: "4 - Não Realizado",
      },
      hospitalizacao: {
        ocorreu: "2",
        data_internacao: "",
        uf: "",
        municipio: "",
        codigo_ibge: "",
        nome_hospital: "",
        codigo_hospital: "",
        telefone: "",
      },
      conclusao: {
        autoctone: "1",
        localProvavel: {
          uf: "RJ",
          pais: "Brasil",
          municipio: "Rio de Janeiro",
          codigo_ibge: "3300004",
          distrito: "Centro",
          bairro: "Bairro A",
        },
        classificacao: "10",
        criterio_confirmacao: "2",
        apresentacao_clinica: "1",
        evolucao: "1",
        data_obito: null,
        data_encerramento: "2025-04-19 00:00:00",
      },
      dengue_com_sinais_de_alarme: {
        apresentou: "2",
        sintomas: [],
        data_inicio: null,
      },
      dengue_grave: {
        apresentou: "2",
        extravasamento_grave_de_plasma: [],
        sangramento_grave: [],
        comprometimento_orgao: [],
        outros: "",
        data_inicio: null,
      },
      informacoes_complementares: {
        deslocamento: "nao",
        data_local: "",
        vacina_febre_amarela: "2020-01-01",
        dengue_anterior: "",
        pressao_arterial: "120/80",
        prova_laco: "negativa",
        ictericia: "nao",
        hemograma: "sim",
        hemograma_1: {
          data: "2025-04-12 00:00:00",
          plaquetas: "126715",
          leucocitos: "8925",
          hematocrito: "44",
        },
        hemograma_2: {
          data: "",
          plaquetas: "",
          leucocitos: "",
          hematocrito: "",
        },
        classificacao_risco: "a",
      },
      investigador: {
        municipio_unidade: "Rio de Janeiro / UBS Rio de Janeiro",
        cod_unidade: "100004",
        nome: "Dr. Investigador 4",
        funcao: "Responsável técnico",
      },
    },
    {
      id: 5,
      dados_gerais: {
        tipo_notificacao: "Individual",
        agravo_doenca: "2 - Chikungunya",
        cid10: "A92.0",
        data_notificacao: "2025-04-15 00:00:00",
        uf: "MG",
        municipio_notificacao: "Belo Horizonte",
        unidade_saude: "UBS Belo Horizonte",
        codigo_unidade: "100005",
        codigo_ibge: "3300005",
        data_primeiros_sintomas: "2025-04-13 00:00:00",
      },
      notificacao_individual: {
        nome_paciente: "Antonieta Da Silva",
        data_nascimento: "1985-06-06 00:00:00",
        idade: 40,
        sexo: "F",
        gestante: "Não se aplica",
        raca_cor: "Parda",
        escolaridade: "6 - Ensino médio completo",
        cartao_sus: String("898001160147036"),
        nome_mae: "Mãe 5",
      },
      residencia: {
        telefone: "15 98763-9491",
        uf: "MG",
        municipio: "Belo Horizonte",
        codigo_ibge: "3300005",
        distrito: "Centro",
        bairro: "Bairro A",
        logradouro: "Rua X",
        codigo_logradouro: "20005",
        numero: "105",
        complemento: "Apto 5",
        geo1: "-23.5",
        geo2: "-46.6",
        referencia: "Ponto de referência",
        cep: "01005-000",
        zona: "1 - Urbana",
        pais_estrangeiro: "",
      },
      investigacao: {
        data_investigacao: "2025-04-14 00:00:00",
        ocupacao: "Servidor público",
      },
      dados_clinicos: {
        sinais_clinicos: {
          possui: true,
          lista: ["Artrite", "Cefaleia", "Náuseas", "Febre", "Petéquias"],
        },
        doencas_pre_existentes: {
          possui: true,
          lista: ["Neoplasias", "Doença acidopéptica", "Hipertensão arterial"],
        },
      },
      exames_laboratoriais: {
        sorologia_chikungunya: {
          coleta_s1: "2025-04-15 00:00:00",
          resultado_s1: "1 - Positivo",
          coleta_s2: "",
          resultado_s2: "",
        },
        prnt: {
          coleta: "",
          resultado: "",
        },
        sorologia_dengue: {
          coleta: "2025-04-15 00:00:00",
          resultado: "2 - Negativo",
        },
        isolamento: {
          coleta: "",
          resultado: "",
        },
        ns1: {
          coleta: "",
          resultado: "",
        },
        rt_pcr: {
          coleta: "2025-04-15 00:00:00",
          resultado: "2 - Negativo",
        },
        sorotipo: "",
        histopatologia: "4 - Não Realizado",
        imunohistoquimica: "4 - Não Realizado",
      },
      hospitalizacao: {
        ocorreu: "2",
        data_internacao: "",
        uf: "",
        municipio: "",
        codigo_ibge: "",
        nome_hospital: "",
        codigo_hospital: "",
        telefone: "",
      },
      conclusao: {
        autoctone: "1",
        localProvavel: {
          uf: "MG",
          pais: "Brasil",
          municipio: "Belo Horizonte",
          codigo_ibge: "3300005",
          distrito: "Centro",
          bairro: "Bairro A",
        },
        classificacao: "10",
        criterio_confirmacao: "2",
        apresentacao_clinica: "1",
        evolucao: "1",
        data_obito: null,
        data_encerramento: "2025-04-20 00:00:00",
      },
      dengue_com_sinais_de_alarme: {
        apresentou: "2",
        sintomas: [],
        data_inicio: null,
      },
      dengue_grave: {
        apresentou: "2",
        extravasamento_grave_de_plasma: [],
        sangramento_grave: [],
        comprometimento_orgao: [],
        outros: "",
        data_inicio: null,
      },
      informacoes_complementares: {
        deslocamento: "nao",
        data_local: "",
        vacina_febre_amarela: "2020-01-01",
        dengue_anterior: "",
        pressao_arterial: "120/80",
        prova_laco: "negativa",
        ictericia: "nao",
        hemograma: "sim",
        hemograma_1: {
          data: "2025-04-13 00:00:00",
          plaquetas: "197382",
          leucocitos: "7120",
          hematocrito: "41",
        },
        hemograma_2: {
          data: "",
          plaquetas: "",
          leucocitos: "",
          hematocrito: "",
        },
        classificacao_risco: "a",
      },
      investigador: {
        municipio_unidade: "Belo Horizonte / UBS Belo Horizonte",
        cod_unidade: "100005",
        nome: "Dr. Investigador 5",
        funcao: "Responsável técnico",
      },
    },
    {
      id: 6,
      dados_gerais: {
        tipo_notificacao: "Individual",
        agravo_doenca: "1 - Dengue",
        cid10: "A90",
        data_notificacao: "2025-04-16 00:00:00",
        uf: "RJ",
        municipio_notificacao: "Rio de Janeiro",
        unidade_saude: "UBS Rio de Janeiro",
        codigo_unidade: "100006",
        codigo_ibge: "3300006",
        data_primeiros_sintomas: "2025-04-14 00:00:00",
      },
      notificacao_individual: {
        nome_paciente: "Felipe Martins",
        data_nascimento: "1986-07-07 00:00:00",
        idade: 39,
        sexo: "M",
        gestante: "Não se aplica",
        raca_cor: "Parda",
        escolaridade: "6 - Ensino médio completo",
        cartao_sus: String("898001160149558"),
        nome_mae: "Mãe 6",
      },
      residencia: {
        telefone: "84 91213-9092",
        uf: "RJ",
        municipio: "Rio de Janeiro",
        codigo_ibge: "3300006",
        distrito: "Centro",
        bairro: "Bairro A",
        logradouro: "Rua X",
        codigo_logradouro: "20006",
        numero: "106",
        complemento: "Apto 6",
        geo1: "-23.5",
        geo2: "-46.6",
        referencia: "Ponto de referência",
        cep: "01006-000",
        zona: "1 - Urbana",
        pais_estrangeiro: "",
      },
      investigacao: {
        data_investigacao: "2025-04-15 00:00:00",
        ocupacao: "Servidor público",
      },
      dados_clinicos: {
        sinais_clinicos: {
          possui: true,
          lista: ["Petéquias", "Dor retroorbital", "Dor nas costas", "Náuseas"],
        },
        doencas_pre_existentes: {
          possui: true,
          lista: ["Hepatopatias", "Doença acidopéptica", "Doenças autoimunes"],
        },
      },
      exames_laboratoriais: {
        sorologia_chikungunya: {
          coleta_s1: "2025-04-16 00:00:00",
          resultado_s1: "1 - Positivo",
          coleta_s2: "",
          resultado_s2: "",
        },
        prnt: {
          coleta: "",
          resultado: "",
        },
        sorologia_dengue: {
          coleta: "2025-04-16 00:00:00",
          resultado: "2 - Negativo",
        },
        isolamento: {
          coleta: "",
          resultado: "",
        },
        ns1: {
          coleta: "",
          resultado: "",
        },
        rt_pcr: {
          coleta: "2025-04-16 00:00:00",
          resultado: "2 - Negativo",
        },
        sorotipo: "",
        histopatologia: "4 - Não Realizado",
        imunohistoquimica: "4 - Não Realizado",
      },
      hospitalizacao: {
        ocorreu: "2",
        data_internacao: "",
        uf: "",
        municipio: "",
        codigo_ibge: "",
        nome_hospital: "",
        codigo_hospital: "",
        telefone: "",
      },
      conclusao: {
        autoctone: "1",
        localProvavel: {
          uf: "RJ",
          pais: "Brasil",
          municipio: "Rio de Janeiro",
          codigo_ibge: "3300006",
          distrito: "Centro",
          bairro: "Bairro A",
        },
        classificacao: "10",
        criterio_confirmacao: "2",
        apresentacao_clinica: "1",
        evolucao: "1",
        data_obito: null,
        data_encerramento: "2025-04-21 00:00:00",
      },
      dengue_com_sinais_de_alarme: {
        apresentou: "2",
        sintomas: [],
        data_inicio: null,
      },
      dengue_grave: {
        apresentou: "2",
        extravasamento_grave_de_plasma: [],
        sangramento_grave: [],
        comprometimento_orgao: [],
        outros: "",
        data_inicio: null,
      },
      informacoes_complementares: {
        deslocamento: "nao",
        data_local: "",
        vacina_febre_amarela: "2020-01-01",
        dengue_anterior: "",
        pressao_arterial: "120/80",
        prova_laco: "negativa",
        ictericia: "nao",
        hemograma: "sim",
        hemograma_1: {
          data: "2025-04-14 00:00:00",
          plaquetas: "195435",
          leucocitos: "6953",
          hematocrito: "45",
        },
        hemograma_2: {
          data: "",
          plaquetas: "",
          leucocitos: "",
          hematocrito: "",
        },
        classificacao_risco: "a",
      },
      investigador: {
        municipio_unidade: "Rio de Janeiro / UBS Rio de Janeiro",
        cod_unidade: "100006",
        nome: "Dr. Investigador 6",
        funcao: "Responsável técnico",
      },
    },
    {
      id: 7,
      dados_gerais: {
        tipo_notificacao: "Individual",
        agravo_doenca: "2 - Chikungunya",
        cid10: "A92.0",
        data_notificacao: "2025-04-17 00:00:00",
        uf: "BA",
        municipio_notificacao: "Salvador",
        unidade_saude: "UBS Salvador",
        codigo_unidade: "100007",
        codigo_ibge: "3300007",
        data_primeiros_sintomas: "2025-04-15 00:00:00",
      },
      notificacao_individual: {
        nome_paciente: "Paulo Felipe",
        data_nascimento: "1987-08-08 00:00:00",
        idade: 38,
        sexo: "F",
        gestante: "Não se aplica",
        raca_cor: "Parda",
        escolaridade: "6 - Ensino médio completo",
        cartao_sus: String("898001160151802"),
        nome_mae: "Mãe 7",
      },
      residencia: {
        telefone: "90 91280-7180",
        uf: "BA",
        municipio: "Salvador",
        codigo_ibge: "3300007",
        distrito: "Centro",
        bairro: "Bairro A",
        logradouro: "Rua X",
        codigo_logradouro: "20007",
        numero: "107",
        complemento: "Apto 7",
        geo1: "-23.5",
        geo2: "-46.6",
        referencia: "Ponto de referência",
        cep: "01007-000",
        zona: "1 - Urbana",
        pais_estrangeiro: "",
      },
      investigacao: {
        data_investigacao: "2025-04-16 00:00:00",
        ocupacao: "Servidor público",
      },
      dados_clinicos: {
        sinais_clinicos: {
          possui: true,
          lista: ["Prova do laço positiva", "Náuseas", "Cefaleia", "Exantema"],
        },
        doencas_pre_existentes: {
          possui: true,
          lista: ["Doença renal crônica"],
        },
      },
      exames_laboratoriais: {
        sorologia_chikungunya: {
          coleta_s1: "2025-04-17 00:00:00",
          resultado_s1: "1 - Positivo",
          coleta_s2: "",
          resultado_s2: "",
        },
        prnt: {
          coleta: "",
          resultado: "",
        },
        sorologia_dengue: {
          coleta: "2025-04-17 00:00:00",
          resultado: "2 - Negativo",
        },
        isolamento: {
          coleta: "",
          resultado: "",
        },
        ns1: {
          coleta: "",
          resultado: "",
        },
        rt_pcr: {
          coleta: "2025-04-17 00:00:00",
          resultado: "2 - Negativo",
        },
        sorotipo: "",
        histopatologia: "4 - Não Realizado",
        imunohistoquimica: "4 - Não Realizado",
      },
      hospitalizacao: {
        ocorreu: "2",
        data_internacao: "",
        uf: "",
        municipio: "",
        codigo_ibge: "",
        nome_hospital: "",
        codigo_hospital: "",
        telefone: "",
      },
      conclusao: {
        autoctone: "1",
        localProvavel: {
          uf: "BA",
          pais: "Brasil",
          municipio: "Salvador",
          codigo_ibge: "3300007",
          distrito: "Centro",
          bairro: "Bairro A",
        },
        classificacao: "10",
        criterio_confirmacao: "2",
        apresentacao_clinica: "1",
        evolucao: "1",
        data_obito: null,
        data_encerramento: "2025-04-22 00:00:00",
      },
      dengue_com_sinais_de_alarme: {
        apresentou: "2",
        sintomas: [],
        data_inicio: null,
      },
      dengue_grave: {
        apresentou: "2",
        extravasamento_grave_de_plasma: [],
        sangramento_grave: [],
        comprometimento_orgao: [],
        outros: "",
        data_inicio: null,
      },
      informacoes_complementares: {
        deslocamento: "nao",
        data_local: "",
        vacina_febre_amarela: "2020-01-01",
        dengue_anterior: "",
        pressao_arterial: "120/80",
        prova_laco: "negativa",
        ictericia: "nao",
        hemograma: "sim",
        hemograma_1: {
          data: "2025-04-15 00:00:00",
          plaquetas: "139873",
          leucocitos: "6209",
          hematocrito: "45",
        },
        hemograma_2: {
          data: "",
          plaquetas: "",
          leucocitos: "",
          hematocrito: "",
        },
        classificacao_risco: "a",
      },
      investigador: {
        municipio_unidade: "Salvador / UBS Salvador",
        cod_unidade: "100007",
        nome: "Dr. Investigador 7",
        funcao: "Responsável técnico",
      },
    },
    {
      id: 8,
      dados_gerais: {
        tipo_notificacao: "Individual",
        agravo_doenca: "1 - Dengue",
        cid10: "A90",
        data_notificacao: "2025-04-18 00:00:00",
        uf: "RS",
        municipio_notificacao: "Porto Alegre",
        unidade_saude: "UBS Porto Alegre",
        codigo_unidade: "100008",
        codigo_ibge: "3300008",
        data_primeiros_sintomas: "2025-04-16 00:00:00",
      },
      notificacao_individual: {
        nome_paciente: "Eduardo Caetano",
        data_nascimento: "1988-09-09 00:00:00",
        idade: 37,
        sexo: "M",
        gestante: "Não se aplica",
        raca_cor: "Parda",
        escolaridade: "6 - Ensino médio completo",
        cartao_sus: String("898001160153407"),
        nome_mae: "Mãe 8",
      },
      residencia: {
        telefone: "82 93703-8044",
        uf: "RS",
        municipio: "Porto Alegre",
        codigo_ibge: "3300008",
        distrito: "Centro",
        bairro: "Bairro A",
        logradouro: "Rua X",
        codigo_logradouro: "20008",
        numero: "108",
        complemento: "Apto 8",
        geo1: "-23.5",
        geo2: "-46.6",
        referencia: "Ponto de referência",
        cep: "01008-000",
        zona: "1 - Urbana",
        pais_estrangeiro: "",
      },
      investigacao: {
        data_investigacao: "2025-04-17 00:00:00",
        ocupacao: "Servidor público",
      },
      dados_clinicos: {
        sinais_clinicos: {
          possui: true,
          lista: ["Náuseas", "Prova do laço positiva", "Dor retroorbital"],
        },
        doencas_pre_existentes: {
          possui: true,
          lista: ["Neoplasias", "Doença renal crônica", "Hepatopatias"],
        },
      },
      exames_laboratoriais: {
        sorologia_chikungunya: {
          coleta_s1: "2025-04-18 00:00:00",
          resultado_s1: "1 - Positivo",
          coleta_s2: "",
          resultado_s2: "",
        },
        prnt: {
          coleta: "",
          resultado: "",
        },
        sorologia_dengue: {
          coleta: "2025-04-18 00:00:00",
          resultado: "2 - Negativo",
        },
        isolamento: {
          coleta: "",
          resultado: "",
        },
        ns1: {
          coleta: "",
          resultado: "",
        },
        rt_pcr: {
          coleta: "2025-04-18 00:00:00",
          resultado: "2 - Negativo",
        },
        sorotipo: "",
        histopatologia: "4 - Não Realizado",
        imunohistoquimica: "4 - Não Realizado",
      },
      hospitalizacao: {
        ocorreu: "2",
        data_internacao: "",
        uf: "",
        municipio: "",
        codigo_ibge: "",
        nome_hospital: "",
        codigo_hospital: "",
        telefone: "",
      },
      conclusao: {
        autoctone: "1",
        localProvavel: {
          uf: "RS",
          pais: "Brasil",
          municipio: "Porto Alegre",
          codigo_ibge: "3300008",
          distrito: "Centro",
          bairro: "Bairro A",
        },
        classificacao: "10",
        criterio_confirmacao: "2",
        apresentacao_clinica: "1",
        evolucao: "1",
        data_obito: null,
        data_encerramento: "2025-04-23 00:00:00",
      },
      dengue_com_sinais_de_alarme: {
        apresentou: "2",
        sintomas: [],
        data_inicio: null,
      },
      dengue_grave: {
        apresentou: "2",
        extravasamento_grave_de_plasma: [],
        sangramento_grave: [],
        comprometimento_orgao: [],
        outros: "",
        data_inicio: null,
      },
      informacoes_complementares: {
        deslocamento: "nao",
        data_local: "",
        vacina_febre_amarela: "2020-01-01",
        dengue_anterior: "",
        pressao_arterial: "120/80",
        prova_laco: "negativa",
        ictericia: "nao",
        hemograma: "sim",
        hemograma_1: {
          data: "2025-04-16 00:00:00",
          plaquetas: "110542",
          leucocitos: "7957",
          hematocrito: "44",
        },
        hemograma_2: {
          data: "",
          plaquetas: "",
          leucocitos: "",
          hematocrito: "",
        },
        classificacao_risco: "a",
      },
      investigador: {
        municipio_unidade: "Porto Alegre / UBS Porto Alegre",
        cod_unidade: "100008",
        nome: "Dr. Investigador 8",
        funcao: "Responsável técnico",
      },
    },
    {
      id: 9,
      dados_gerais: {
        tipo_notificacao: "Individual",
        agravo_doenca: "2 - Chikungunya",
        cid10: "A92.0",
        data_notificacao: "2025-04-19 00:00:00",
        uf: "MG",
        municipio_notificacao: "Belo Horizonte",
        unidade_saude: "UBS Belo Horizonte",
        codigo_unidade: "100009",
        codigo_ibge: "3300009",
        data_primeiros_sintomas: "2025-04-17 00:00:00",
      },
      notificacao_individual: {
        nome_paciente: "Rebeca Castro",
        data_nascimento: "1989-10-10 00:00:00",
        idade: 36,
        sexo: "F",
        gestante: "Não se aplica",
        raca_cor: "Parda",
        escolaridade: "6 - Ensino médio completo",
        cartao_sus: String("898001160156996"),
        nome_mae: "Mãe 9",
      },
      residencia: {
        telefone: "61 98598-3698",
        uf: "MG",
        municipio: "Belo Horizonte",
        codigo_ibge: "3300009",
        distrito: "Centro",
        bairro: "Bairro A",
        logradouro: "Rua X",
        codigo_logradouro: "20009",
        numero: "109",
        complemento: "Apto 9",
        geo1: "-23.5",
        geo2: "-46.6",
        referencia: "Ponto de referência",
        cep: "01009-000",
        zona: "1 - Urbana",
        pais_estrangeiro: "",
      },
      investigacao: {
        data_investigacao: "2025-04-18 00:00:00",
        ocupacao: "Servidor público",
      },
      dados_clinicos: {
        sinais_clinicos: {
          possui: true,
          lista: ["Exantema", "Dor nas costas"],
        },
        doencas_pre_existentes: {
          possui: true,
          lista: ["Hipertensão arterial", "Doença acidopéptica", "Neoplasias"],
        },
      },
      exames_laboratoriais: {
        sorologia_chikungunya: {
          coleta_s1: "2025-04-19 00:00:00",
          resultado_s1: "1 - Positivo",
          coleta_s2: "",
          resultado_s2: "",
        },
        prnt: {
          coleta: "",
          resultado: "",
        },
        sorologia_dengue: {
          coleta: "2025-04-19 00:00:00",
          resultado: "2 - Negativo",
        },
        isolamento: {
          coleta: "",
          resultado: "",
        },
        ns1: {
          coleta: "",
          resultado: "",
        },
        rt_pcr: {
          coleta: "2025-04-19 00:00:00",
          resultado: "2 - Negativo",
        },
        sorotipo: "",
        histopatologia: "4 - Não Realizado",
        imunohistoquimica: "4 - Não Realizado",
      },
      hospitalizacao: {
        ocorreu: "2",
        data_internacao: "",
        uf: "",
        municipio: "",
        codigo_ibge: "",
        nome_hospital: "",
        codigo_hospital: "",
        telefone: "",
      },
      conclusao: {
        autoctone: "1",
        localProvavel: {
          uf: "MG",
          pais: "Brasil",
          municipio: "Belo Horizonte",
          codigo_ibge: "3300009",
          distrito: "Centro",
          bairro: "Bairro A",
        },
        classificacao: "10",
        criterio_confirmacao: "2",
        apresentacao_clinica: "1",
        evolucao: "1",
        data_obito: null,
        data_encerramento: "2025-04-24 00:00:00",
      },
      dengue_com_sinais_de_alarme: {
        apresentou: "2",
        sintomas: [],
        data_inicio: null,
      },
      dengue_grave: {
        apresentou: "2",
        extravasamento_grave_de_plasma: [],
        sangramento_grave: [],
        comprometimento_orgao: [],
        outros: "",
        data_inicio: null,
      },
      informacoes_complementares: {
        deslocamento: "nao",
        data_local: "",
        vacina_febre_amarela: "2020-01-01",
        dengue_anterior: "",
        pressao_arterial: "120/80",
        prova_laco: "negativa",
        ictericia: "nao",
        hemograma: "sim",
        hemograma_1: {
          data: "2025-04-17 00:00:00",
          plaquetas: "123603",
          leucocitos: "8212",
          hematocrito: "44",
        },
        hemograma_2: {
          data: "",
          plaquetas: "",
          leucocitos: "",
          hematocrito: "",
        },
        classificacao_risco: "a",
      },
      investigador: {
        municipio_unidade: "Belo Horizonte / UBS Belo Horizonte",
        cod_unidade: "100009",
        nome: "Dr. Investigador 9",
        funcao: "Responsável técnico",
      },
    },
    {
      id: 10,
      dados_gerais: {
        tipo_notificacao: "Individual",
        agravo_doenca: "1 - Dengue",
        cid10: "A90",
        data_notificacao: "2025-04-20 00:00:00",
        uf: "RJ",
        municipio_notificacao: "Rio de Janeiro",
        unidade_saude: "UBS Rio de Janeiro",
        codigo_unidade: "100010",
        codigo_ibge: "3300010",
        data_primeiros_sintomas: "2025-04-18 00:00:00",
      },
      notificacao_individual: {
        nome_paciente: "Humberto Inacio",
        data_nascimento: "1990-11-11 00:00:00",
        idade: 35,
        sexo: "M",
        gestante: "Não se aplica",
        raca_cor: "Parda",
        escolaridade: "6 - Ensino médio completo",
        cartao_sus: String("898001160159843"),
        nome_mae: "Mãe 10",
      },
      residencia: {
        telefone: "33 99613-7660",
        uf: "RJ",
        municipio: "Rio de Janeiro",
        codigo_ibge: "3300010",
        distrito: "Centro",
        bairro: "Bairro A",
        logradouro: "Rua X",
        codigo_logradouro: "20010",
        numero: "110",
        complemento: "Apto 10",
        geo1: "-23.5",
        geo2: "-46.6",
        referencia: "Ponto de referência",
        cep: "010010-000",
        zona: "1 - Urbana",
        pais_estrangeiro: "",
      },
      investigacao: {
        data_investigacao: "2025-04-19 00:00:00",
        ocupacao: "Servidor público",
      },
      dados_clinicos: {
        sinais_clinicos: {
          possui: true,
          lista: ["Artrite", "Prova do laço positiva"],
        },
        doencas_pre_existentes: {
          possui: true,
          lista: ["Doenças autoimunes"],
        },
      },
      exames_laboratoriais: {
        sorologia_chikungunya: {
          coleta_s1: "2025-04-20 00:00:00",
          resultado_s1: "1 - Positivo",
          coleta_s2: "",
          resultado_s2: "",
        },
        prnt: {
          coleta: "",
          resultado: "",
        },
        sorologia_dengue: {
          coleta: "2025-04-20 00:00:00",
          resultado: "2 - Negativo",
        },
        isolamento: {
          coleta: "",
          resultado: "",
        },
        ns1: {
          coleta: "",
          resultado: "",
        },
        rt_pcr: {
          coleta: "2025-04-20 00:00:00",
          resultado: "2 - Negativo",
        },
        sorotipo: "",
        histopatologia: "4 - Não Realizado",
        imunohistoquimica: "4 - Não Realizado",
      },
      hospitalizacao: {
        ocorreu: "2",
        data_internacao: "",
        uf: "",
        municipio: "",
        codigo_ibge: "",
        nome_hospital: "",
        codigo_hospital: "",
        telefone: "",
      },
      conclusao: {
        autoctone: "1",
        localProvavel: {
          uf: "RJ",
          pais: "Brasil",
          municipio: "Rio de Janeiro",
          codigo_ibge: "3300010",
          distrito: "Centro",
          bairro: "Bairro A",
        },
        classificacao: "10",
        criterio_confirmacao: "2",
        apresentacao_clinica: "1",
        evolucao: "1",
        data_obito: null,
        data_encerramento: "2025-04-25 00:00:00",
      },
      dengue_com_sinais_de_alarme: {
        apresentou: "2",
        sintomas: [],
        data_inicio: null,
      },
      dengue_grave: {
        apresentou: "2",
        extravasamento_grave_de_plasma: [],
        sangramento_grave: [],
        comprometimento_orgao: [],
        outros: "",
        data_inicio: null,
      },
      informacoes_complementares: {
        deslocamento: "nao",
        data_local: "",
        vacina_febre_amarela: "2020-01-01",
        dengue_anterior: "",
        pressao_arterial: "120/80",
        prova_laco: "negativa",
        ictericia: "nao",
        hemograma: "sim",
        hemograma_1: {
          data: "2025-04-18 00:00:00",
          plaquetas: "190799",
          leucocitos: "6146",
          hematocrito: "40",
        },
        hemograma_2: {
          data: "",
          plaquetas: "",
          leucocitos: "",
          hematocrito: "",
        },
        classificacao_risco: "a",
      },
      investigador: {
        municipio_unidade: "Rio de Janeiro / UBS Rio de Janeiro",
        cod_unidade: "100010",
        nome: "Dr. Investigador 10",
        funcao: "Responsável técnico",
      },
    },
  ],
  infos: {
    last_case_id: 0,
    login_info: {
      username: "",
      id: 0,
    },
  },
};

// Função para salvar os dados no localStorage
function salvarDados(dados, type) {
  try {
    switch (type) {
      case "admin":
        localStorage.setItem("sisdenData_admin_db", JSON.stringify(dados));
        break;

      case "employer":
        localStorage.setItem("sisdenData_employer_db", JSON.stringify(dados));
        break;

      case "case":
        localStorage.setItem("sisdenData_case_db", JSON.stringify(dados));
        break;

      case "info":
        localStorage.setItem("sisdenData_info_db", JSON.stringify(dados));
        break;

      default:
        throw new Error("JSON Data " + type + " is invalid");
    }
  } catch (e) {
    console.error("Erro ao salvar dados:", e);
  }
}

function recuperarDados(type) {
  try {
    let dados = [];
    switch (type) {
      case "admin":
        dados = localStorage.getItem("sisdenData_admin_db");
        return dados ? JSON.parse(dados) : null;

      case "employer":
        dados = localStorage.getItem("sisdenData_employer_db");
        return dados ? JSON.parse(dados) : null;

      case "case":
        dados = localStorage.getItem("sisdenData_case_db");
        return dados ? JSON.parse(dados) : null;

      case "info":
        dados = localStorage.getItem("sisdenData_info_db");
        return dados ? JSON.parse(dados) : null;

      default:
        throw new Error("Data Type " + type + " is invalid");
    }
  } catch (e) {
    console.error("Erro ao recuperar dados:", e);
    return null;
  }
}

function starter_database() {
  dadosIniciais.infos.last_case_id = dadosIniciais.cases.length;

  console.log("i'm restarting database :)");
  salvarDados(dadosIniciais.admin, "admin");
  salvarDados(dadosIniciais.employers, "employer");
  salvarDados(dadosIniciais.cases, "case");
  salvarDados(dadosIniciais.infos, "info");
}

// did this to restart database if empty andddd now i can just call starter_database() :)
function database_empty() {
  if (
    recuperarDados("admin") == null &&
    recuperarDados("employers") == null &&
    recuperarDados("cases") == null
  ) {
    starter_database();
  }
}

database_empty();

///////////////////////
// DATA MANIPULATING //
///////////////////////

function levenshteinDistance(a, b) {
  const matriz = Array.from({ length: a.length + 1 }, (_, i) =>
    Array.from({ length: b.length + 1 }, (_, j) =>
      i === 0 ? j : j === 0 ? i : 0
    )
  );

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1].toLowerCase() === b[j - 1].toLowerCase() ? 0 : 1;

      matriz[i][j] = Math.min(
        matriz[i - 1][j] + 1,
        matriz[i][j - 1] + 1,
        matriz[i - 1][j - 1] + cost
      );
    }
  }

  return matriz[a.length][b.length];
}

//////////////
// Employer //
//////////////

function find_employer_by_id(employer_db, id) {
  id = parseInt(id);
  return employer_db.find((employer_db) => employer_db.id === id) || null;
}

function find_employer_by_cpf(employer_db, cpf) {
  return employer_db.find((employer_db) => employer_db.cpf === cpf) || null;
}

function find_employer_by_name(employer_db, name, threshot = 3) {
  return employer_db.filter((employer) => {
    const distance = distanciaLevenshtein(employer.name, name);
    return distance <= threshot;
  });
}

function delete_employer_by_id(id) {
  employer_db = recuperarDados("employer");

  // Filtra o array, removendo o funcionário com o ID fornecido
  employer_db = employer_db.filter((emp) => emp.id !== parseInt(id));

  salvarDados(employer_db, "employer");
}

///////////
// Cases //
///////////

function find_caso_by_id(id) {
  let case_db = recuperarDados("case");
  id = parseInt(id);
  return case_db.find((case_db) => case_db.id === id) || null;
}

function saveCaseInMemory(caso) {
  const casos_db = recuperarDados("case");
  const index = casos_db.findIndex((e) => e.id === caso.id);

  if (index !== -1) {
    casos_db[index] = caso;
  } else {
    new_case_id = recuperarDados("info").last_case_id + 1;
    caso.id = new_case_id;
    casos_db.push(caso);
    salvarDados({ last_case_id: new_case_id }, "info");
  }

  salvarDados(casos_db, "case");
}

function deleteCaseInMemory(id) {
  case_db = recuperarDados("case");

  // Filtra o array, removendo o funcionário com o ID fornecido
  case_db = case_db.filter((caso) => caso.id !== parseInt(id));

  salvarDados(case_db, "case");
}

function save_login_info(login) {
  const info_db = recuperarDados("info");
  info_db.login_info.username = login.username
  info_db.login_info.id = login.id

  salvarDados(info_db, "info")
}

function get_login_info(){
  return recuperarDados("info").login_info
}
