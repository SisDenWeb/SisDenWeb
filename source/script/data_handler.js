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
      notificacao: {
        tipo: "DENGUE",
        cid10: "A90",
        data_notificacao: "10/03/2025",
        dados_primeiros_sintomas: "05/03/2025",
        unidade_saude: {
          nome: "UBS CENTRAL",
          codigo: "SP654321",
        },
        municipio_notificacao: {
          uf: "SP",
          nome: "FERNANDÓPOLIS",
          codigo_ibge: "3515509",
        },
      },
      paciente: {
        nome: "ANA CLARA MENDES",
        data_nascimento: "22/04/2002",
        idade: 22,
        sexo: "Feminino",
        gestante: "1º Trimestre",
        raca_cor: "Parda",
        escolaridade: "Superior incompleto",
        cartao_sus: "703 4810 0076 002",
        nome_mae: "ROSANGELA MENDES",
      },
      residencia: {
        uf: "SP",
        municipio: "FERNANDÓPOLIS",
        codigo_ibge: "3515509",
        distrito: "Centro",
        logradouro: "Rua das Acácias",
        numero: "234",
        complemento: "Apto 12",
        bairro: "Vila Nova",
        cep: "15600230",
        ponto_referencia: "Próximo ao parque",
        telefone: "(17) 99785-4321",
        pais_reside_fora: false,
      },
      dados_clinicos: {
        data_internacao: null,
        hospitalizacao: "Não",
        municipio_hospital: null,
        nome_hospital: null,
        classificacao_final: "Dengue",
        criterio_confirmacao: "Laboratorial",
        apresentacao_clinica: "Clássica",
        evolucao_caso: "Cura",
        data_encerramento: "17/03/2025",
        sinais_clinicos: {
          dengue_com_sinais_alarme: false,
          dor_abdominal_intensa: false,
          vomitos_persistentes: false,
          acumulo_liquidos: false,
          sangramento_mucosas: false,
          letargia: false,
          aumento_hematocrito_diminui_plasma: false,
        },
        sinais_dengue_grave: {
          sangramento_grave: false,
          comprometimento_orgao: false,
          comprometimento_consciência: false,
          ast_alt_maior_que_1000: false,
        },
        data_inicio_sinais_gravidade: null,
      },
      informacoes_complementares: {
        deslocamento_15dias: true,
        data_local: "28/02/2025 - BELO HORIZONTE/MG",
        vacina_febre_amarela: true,
        doenca_anteriores: "Nenhuma",
        pressao_arterial: {
          sentado: {
            sistolica: 110,
            diastolica: 70,
          },
          deitado: {
            sistolica: 108,
            diastolica: 68,
          },
          positivo_tourniquet: false,
        },
        colab_hemograma: true,
        plaquetas: 145000,
        leucocitos: 4900,
        hematocrito: 38,
        classificacao_risco: "Grupo A",
      },
      dados_laboratoriais: {
        sorologia_igg_igm: "IgM positivo",
        exame_ns1: {
          resultado: "Negativo",
          data_coleta: "06/03/2025",
        },
        rt_pcr: {
          resultado: "Negativo",
          data_coleta: "06/03/2025",
        },
        isolamento_viral: null,
        histopatologia: null,
        imunohistoquimica: null,
        exame_outros: null,
      },
      profissional: {
        nome: "DRA. LÍVIA MORAES",
        funcao: "Infectologista",
        assinatura: "DRA. LÍVIA MORAES - CRM 543210/SP",
        codigo_unidade_saude: "SP654321",
      },
    },
    {
      notificacao: {
        tipo: "DENGUE",
        cid10: "A91",
        data_notificacao: "12/03/2025",
        dados_primeiros_sintomas: "08/03/2025",
        unidade_saude: {
          nome: "UBS VILA VERDE",
          codigo: "SP112233",
        },
        municipio_notificacao: {
          uf: "SP",
          nome: "FERNANDÓPOLIS",
          codigo_ibge: "3515509",
        },
      },
      paciente: {
        nome: "JOÃO VICTOR LIMA",
        data_nascimento: "05/01/2010",
        idade: 15,
        sexo: "Masculino",
        gestante: "Não se aplica",
        raca_cor: "Parda",
        escolaridade: "Ensino Fundamental",
        cartao_sus: "703 2982 9911 222",
        nome_mae: "KARLA LIMA",
      },
      residencia: {
        uf: "SP",
        municipio: "FERNANDÓPOLIS",
        codigo_ibge: "3515509",
        distrito: "Jardim Araguaia",
        logradouro: "Rua do Sol",
        numero: "876",
        complemento: null,
        bairro: "Jardim Araguaia",
        cep: "15600440",
        ponto_referencia: "Escola Municipal",
        telefone: "(17) 99678-1122",
        pais_reside_fora: false,
      },
      dados_clinicos: {
        data_internacao: "09/03/2025",
        hospitalizacao: "Sim",
        municipio_hospital: "FERNANDÓPOLIS",
        nome_hospital: "HOSPITAL INFANTIL SÃO LUCAS",
        classificacao_final: "Dengue 2.0 - Dengue com sinais de alarme",
        criterio_confirmacao: "Clínico",
        apresentacao_clinica: "Com sinais de alarme",
        evolucao_caso: "Cura",
        data_encerramento: "20/03/2025",
        sinais_clinicos: {
          dengue_com_sinais_alarme: true,
          dor_abdominal_intensa: true,
          vomitos_persistentes: true,
          acumulo_liquidos: false,
          sangramento_mucosas: true,
          letargia: false,
          aumento_hematocrito_diminui_plasma: false,
        },
        sinais_dengue_grave: {
          sangramento_grave: false,
          comprometimento_orgao: false,
          comprometimento_consciência: false,
          ast_alt_maior_que_1000: false,
        },
        data_inicio_sinais_gravidade: "09/03/2025",
      },
      informacoes_complementares: {
        deslocamento_15dias: false,
        data_local: null,
        vacina_febre_amarela: false,
        doenca_anteriores: "Asma",
        pressao_arterial: {
          sentado: {
            sistolica: 105,
            diastolica: 65,
          },
          deitado: {
            sistolica: 102,
            diastolica: 62,
          },
          positivo_tourniquet: false,
        },
        colab_hemograma: true,
        plaquetas: 70000,
        leucocitos: 3200,
        hematocrito: 45,
        classificacao_risco: "Grupo B",
      },
      dados_laboratoriais: {
        sorologia_igg_igm: "IgM positivo",
        exame_ns1: {
          resultado: "Positivo",
          data_coleta: "08/03/2025",
        },
        rt_pcr: {
          resultado: "Positivo",
          data_coleta: "08/03/2025",
        },
        isolamento_viral: "Dengue tipo 1",
        histopatologia: null,
        imunohistoquimica: null,
        exame_outros: "Hemograma completo",
      },
      profissional: {
        nome: "DR. RENATO FARIAS",
        funcao: "Pediatra",
        assinatura: "DR. RENATO FARIAS - CRM 654987/SP",
        codigo_unidade_saude: "SP112233",
      },
    },
    {
      notificacao: {
        tipo: "DENGUE",
        cid10: "A90",
        data_notificacao: "14/03/2025",
        dados_primeiros_sintomas: "10/03/2025",
        unidade_saude: {
          nome: "UBS SANTA RITA",
          codigo: "SP789456",
        },
        municipio_notificacao: {
          uf: "SP",
          nome: "FERNANDÓPOLIS",
          codigo_ibge: "3515509",
        },
      },
      paciente: {
        nome: "CARLOS EDUARDO SOUSA",
        data_nascimento: "15/08/1972",
        idade: 52,
        sexo: "Masculino",
        gestante: "Não se aplica",
        raca_cor: "Branca",
        escolaridade: "Ensino Médio completo",
        cartao_sus: "703 9988 1122 333",
        nome_mae: "MARTA SOUSA",
      },
      residencia: {
        uf: "SP",
        municipio: "FERNANDÓPOLIS",
        codigo_ibge: "3515509",
        distrito: "Jardim Paraíso",
        logradouro: "Av. Brasil",
        numero: "1010",
        complemento: null,
        bairro: "Jardim Paraíso",
        cep: "15600110",
        ponto_referencia: "Ao lado da padaria Pão Quente",
        telefone: "(17) 99700-4455",
        pais_reside_fora: false,
      },
      dados_clinicos: {
        data_internacao: null,
        hospitalizacao: "Não",
        municipio_hospital: null,
        nome_hospital: null,
        classificacao_final: "Dengue",
        criterio_confirmacao: "Clínico-epidemiológico",
        apresentacao_clinica: "Clássica",
        evolucao_caso: "Cura",
        data_encerramento: "22/03/2025",
        sinais_clinicos: {
          dengue_com_sinais_alarme: false,
          dor_abdominal_intensa: false,
          vomitos_persistentes: false,
          acumulo_liquidos: false,
          sangramento_mucosas: false,
          letargia: false,
          aumento_hematocrito_diminui_plasma: false,
        },
        sinais_dengue_grave: {
          sangramento_grave: false,
          comprometimento_orgao: false,
          comprometimento_consciência: false,
          ast_alt_maior_que_1000: false,
        },
        data_inicio_sinais_gravidade: null,
      },
      informacoes_complementares: {
        deslocamento_15dias: false,
        data_local: null,
        vacina_febre_amarela: true,
        doenca_anteriores: "Hipertensão",
        pressao_arterial: {
          sentado: {
            sistolica: 135,
            diastolica: 85,
          },
          deitado: {
            sistolica: 130,
            diastolica: 82,
          },
          positivo_tourniquet: false,
        },
        colab_hemograma: false,
        plaquetas: null,
        leucocitos: null,
        hematocrito: null,
        classificacao_risco: "Grupo A",
      },
      dados_laboratoriais: {
        sorologia_igg_igm: null,
        exame_ns1: {
          resultado: null,
          data_coleta: null,
        },
        rt_pcr: {
          resultado: null,
          data_coleta: null,
        },
        isolamento_viral: null,
        histopatologia: null,
        imunohistoquimica: null,
        exame_outros: null,
      },
      profissional: {
        nome: "DRA. VANESSA PRADO",
        funcao: "Clínica Geral",
        assinatura: "DRA. VANESSA PRADO - CRM 112233/SP",
        codigo_unidade_saude: "SP789456",
      },
    },
    {
      notificacao: {
        tipo: "DENGUE",
        cid10: "A91",
        data_notificacao: "16/03/2025",
        dados_primeiros_sintomas: "11/03/2025",
        unidade_saude: {
          nome: "UBS SÃO JORGE",
          codigo: "SP332211",
        },
        municipio_notificacao: {
          uf: "SP",
          nome: "FERNANDÓPOLIS",
          codigo_ibge: "3515509",
        },
      },
      paciente: {
        nome: "MARIA LUIZA FONSECA",
        data_nascimento: "03/03/1958",
        idade: 67,
        sexo: "Feminino",
        gestante: "Não se aplica",
        raca_cor: "Preta",
        escolaridade: "Fundamental incompleto",
        cartao_sus: "703 6655 8899 000",
        nome_mae: "LUCINÉIA FONSECA",
      },
      residencia: {
        uf: "SP",
        municipio: "FERNANDÓPOLIS",
        codigo_ibge: "3515509",
        distrito: "Jardim Europa",
        logradouro: "Rua Itália",
        numero: "56",
        complemento: null,
        bairro: "Jardim Europa",
        cep: "15600250",
        ponto_referencia: "Próximo ao mercado Europa",
        telefone: "(17) 99771-0066",
        pais_reside_fora: false,
      },
      dados_clinicos: {
        data_internacao: "13/03/2025",
        hospitalizacao: "Sim",
        municipio_hospital: "FERNANDÓPOLIS",
        nome_hospital: "HOSPITAL MUNICIPAL DR. LUIZ VIEIRA",
        classificacao_final: "Dengue Grave",
        criterio_confirmacao: "Laboratorial",
        apresentacao_clinica: "Grave",
        evolucao_caso: "Óbito",
        data_encerramento: "18/03/2025",
        sinais_clinicos: {
          dengue_com_sinais_alarme: true,
          dor_abdominal_intensa: true,
          vomitos_persistentes: true,
          acumulo_liquidos: true,
          sangramento_mucosas: true,
          letargia: true,
          aumento_hematocrito_diminui_plasma: true,
        },
        sinais_dengue_grave: {
          sangramento_grave: true,
          comprometimento_orgao: true,
          comprometimento_consciência: true,
          ast_alt_maior_que_1000: true,
        },
        data_inicio_sinais_gravidade: "13/03/2025",
      },
      informacoes_complementares: {
        deslocamento_15dias: false,
        data_local: null,
        vacina_febre_amarela: false,
        doenca_anteriores: "Diabetes, Insuficiência renal crônica",
        pressao_arterial: {
          sentado: {
            sistolica: 90,
            diastolica: 60,
          },
          deitado: {
            sistolica: 88,
            diastolica: 58,
          },
          positivo_tourniquet: false,
        },
        colab_hemograma: true,
        plaquetas: 25000,
        leucocitos: 1900,
        hematocrito: 52,
        classificacao_risco: "Grupo D",
      },
      dados_laboratoriais: {
        sorologia_igg_igm: "IgM positivo",
        exame_ns1: {
          resultado: "Positivo",
          data_coleta: "12/03/2025",
        },
        rt_pcr: {
          resultado: "Positivo",
          data_coleta: "12/03/2025",
        },
        isolamento_viral: "Dengue tipo 2",
        histopatologia: "Alterações compatíveis com dengue grave",
        imunohistoquimica: "Positiva",
        exame_outros: "Função hepática alterada",
      },
      profissional: {
        nome: "DR. GABRIEL ANDRADE",
        funcao: "Clínico Geral",
        assinatura: "DR. GABRIEL ANDRADE - CRM 334455/SP",
        codigo_unidade_saude: "SP332211",
      },
    },
  ],
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

      default:
        throw new Error("JSON Data " + type + " is invalid");
    }
  } catch (e) {
    console.error("Erro ao recuperar dados:", e);
    return null;
  }
}

function starter_database() {
    console.log("i'm restarting database :)");
    salvarDados(dadosIniciais.admin, "admin");
    salvarDados(dadosIniciais.employers, "employer");
    salvarDados(dadosIniciais.cases, "case");
}

// did this to restart database if empty andddd now i can just call starter_database() :)
function database_empty(){
  if (
    recuperarDados("admin") == null &&
    recuperarDados("employers") == null &&
    recuperarDados("cases") == null
  ){
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
  id = parseInt(id)
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

//////////////
// Cases //
//////////////

function find_paciente_by_cartao_sus(db, cartaoSus) {
  return (
    db.find((registro) => registro.paciente.cartao_sus === cartaoSus) || null
  );
}
