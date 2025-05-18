// Funcoes para estilos

function openCaseModal() {
  document.getElementById("case-modal").classList.remove("hidden");
}

function closeCaseModal() {
  document.getElementById("case-modal").classList.add("hidden");
}

function toggleSinais() {
  const value = document.querySelector('input[name="sinais"]:checked')?.value;
  const checkboxes = document.querySelectorAll(".sinais");
  checkboxes.forEach((cb) => (cb.disabled = value === "2"));
}

function toggleDoencas() {
  const value = document.querySelector('input[name="doencas"]:checked')?.value;
  const checkboxes = document.querySelectorAll(".doencas");
  checkboxes.forEach((cb) => (cb.disabled = value === "2"));
}

function toggleHospitalizacao() {
  const value = document.querySelector(
    'input[name="hospitalizacao"]:checked'
  )?.value;
  const inputs = document.querySelectorAll("#dadosHospitalizacao input");

  inputs.forEach((input) => {
    input.disabled = value !== "1";
  });
}

function mostrarDatas() {
  const valor = document.getElementById("evolucao").value;
  document
    .getElementById("campoObito")
    .classList.toggle("hidden", !["2", "3", "4"].includes(valor));
  document
    .getElementById("campoEncerramento")
    .classList.toggle("hidden", !["1", "9"].includes(valor));
}

function verificarApresentacao() {
  const valor = document.getElementById("classificacao").value;
  document
    .getElementById("apresentacaoClinica")
    .classList.toggle("hidden", valor === "5" || valor === "");
}

function toggleSinaisAlarme(ativo) {
  document.getElementById("sintomasAlarme").disabled = !ativo;
  document.getElementById("dataAlarme").disabled = !ativo;
}

function toggleDengueGrave(ativo) {
  document.getElementById("sintomasGrave").disabled = !ativo;
  document.getElementById("dataGravidade").disabled = !ativo;
}


// cases data handler

function refreshCasos() {
  const casos = recuperarDados("case"); // Recupera os casos do localStorage ou backend
  const lista = document.getElementById("casos-list");
  lista.innerHTML = "";

  casos.forEach((caso) => {
    const html = `
      <div class="flex items-start justify-between border-b pb-2">
        <div>
          <p class="font-medium">${caso.notificacao_individual.nome_paciente}</p>
          <p class="text-sm text-gray-700">Número do caso: ${caso.id}</p>
        </div>
        <div class="flex flex-col space-y-2">
          <button data-id="${caso.id}" onclick="deletarCaso(${caso.id})" class="deletar-caso bg-gray-400 text-black px-4 py-1 rounded">
            Deletar
          </button>
          <button data-id="${caso.id}" onclick="openModalEditarCaso(${caso.id})" class="editar-caso bg-gray-400 text-black px-4 py-1 rounded">
            Editar
          </button>
        </div>
      </div>
    `;
    lista.insertAdjacentHTML("beforeend", html);
  });
}

function openModalEditarCaso(id){
  let caso = find_caso_by_id(id);
  preencherFichaCompleta(caso);
  openCaseModal();
}

refreshCasos()


function preencherFichaCompleta(json) {
  // Helper para marcar radio
  function setRadio(name, value) {
    const radios = document.querySelectorAll(`input[name="${name}"]`);
    radios.forEach((radio) => {
      radio.checked = radio.value == value;
    });
  }

  // Helper para marcar checkboxes com base em uma lista de valores
  function setCheckboxes(className, values) {
    document.querySelectorAll(`input.${className}`).forEach((cb) => {
      cb.checked = values.includes(cb.value);
    });
  }

  // Dados Gerais
  document.getElementById("tipo-notificacao").value =
    json.dados_gerais.tipo_notificacao || "";
  document.getElementById("agravo-doenca").value = json.dados_gerais.agravo_doenca || "";
  document.getElementById("cid10").value = json.dados_gerais.cid10 || "";
  document.getElementById("data-notificacao").value =
    json.dados_gerais.data_notificacao || "";
  document.getElementById("uf-notificacao").value = json.dados_gerais.uf || "";
  document.getElementById("municipio-notificacao").value =
    json.dados_gerais.municipio_notificacao || "";
  document.getElementById("unidade-saude").value = json.dados_gerais.unidade_saude || "";
  document.getElementById("codigo-unidade").value = json.dados_gerais.codigo_unidade || "";
  document.getElementById("codigo-ibge").value = json.dados_gerais.codigo_ibge || "";
  document.getElementById("data-primeiros-sintomas").value =
    json.dados_gerais.data_primeiros_sintomas || "";

  // Notificação Individual
  document.getElementById("nome-paciente").value = json.notificacao_individual.nome_paciente || "";
  document.getElementById("data-nascimento").value = json.notificacao_individual.data_nascimento || "";
  document.getElementById("idade").value = json.notificacao_individual.idade || "";
  document.getElementById("sexo").value = json.notificacao_individual.sexo || "";
  document.getElementById("gestante").value = json.notificacao_individual.gestante || "";
  document.getElementById("raca-cor").value = json.notificacao_individual.raca_cor || "";
  document.getElementById("escolaridade").value = json.notificacao_individual.escolaridade || "";
  document.getElementById("cartao-sus").value = json.notificacao_individual.cartao_sus || "";
  document.getElementById("nome-mae").value = json.notificacao_individual.nome_mae || "";

  // Residência
  document.getElementById("res-telefone").value = json.residencia.telefone || "";
  document.getElementById("res-uf").value = json.residencia.uf || "";
  document.getElementById("res-municipio").value = json.residencia.municipio || "";
  document.getElementById("res-codigo-ibge").value = json.residencia.codigo_ibge || "";
  document.getElementById("res-distrito").value = json.residencia.distrito || "";
  document.getElementById("res-bairro").value = json.residencia.bairro || "";
  document.getElementById("res-logradouro").value = json.residencia.logradouro || "";
  document.getElementById("res-codigo-logradouro").value =
    json.residencia.codigo_logradouro || "";
  document.getElementById("res-numero").value = json.residencia.numero || "";
  document.getElementById("res-complemento").value = json.residencia.complemento || "";
  document.getElementById("res-geo1").value = json.residencia.geo1 || "";
  document.getElementById("res-geo2").value = json.residencia.geo2 || "";
  document.getElementById("res-referencia").value = json.residencia.referencia || "";
  document.getElementById("res-cep").value = json.residencia.cep || "";
  document.getElementById("res-zona").value = json.residencia.zona || "";
  document.getElementById("res-pais").value = json.residencia.pais_estrangeiro || "";

  // Investigação
  document.getElementById("data-investigacao").value =
    json.investigacao.data_investigacao || "";
  document.getElementById("ocupacao").value = json.investigacao.ocupacao || "";

  // Dados Clínicos
  setRadio("sinais", json.dados_clinicos.sinais_clinicos?.possui ? "1" : "2");
  setCheckboxes("sinais", json.dados_clinicos.sinais_clinicos?.lista || []);
  setRadio("doencas", json.dados_clinicos.doencas_pre_existentes?.possui ? "1" : "2");
  setCheckboxes("doencas", json.dados_clinicos.doencas_pre_existentes?.lista || []);

  // Exames Laboratoriais
  document.getElementById("chikungunya-s1-data").value =
    json.exames_laboratoriais.sorologia_chikungunya?.coleta_s1 || "";
  document.getElementById("chikungunya-s1-resultado").value =
    json.exames_laboratoriais.sorologia_chikungunya?.resultado_s1 || "";
  document.getElementById("chikungunya-s2-data").value =
    json.exames_laboratoriais.sorologia_chikungunya?.coleta_s2 || "";
  document.getElementById("chikungunya-s2-resultado").value =
    json.exames_laboratoriais.sorologia_chikungunya?.resultado_s2 || "";
  document.getElementById("prnt-data").value = json.exames_laboratoriais.prnt?.coleta || "";
  document.getElementById("prnt-resultado").value = json.exames_laboratoriais.prnt?.resultado || "";
  document.getElementById("dengue-igm-data").value =
    json.exames_laboratoriais.sorologia_dengue?.coleta || "";
  document.getElementById("dengue-igm-resultado").value =
    json.exames_laboratoriais.sorologia_dengue?.resultado || "";
  document.getElementById("isolamento-data").value =
    json.exames_laboratoriais.isolamento?.coleta || "";
  document.getElementById("isolamento-resultado").value =
    json.exames_laboratoriais.isolamento?.resultado || "";
  document.getElementById("ns1-data").value = json.exames_laboratoriais.ns1?.coleta || "";
  document.getElementById("ns1-resultado").value = json.exames_laboratoriais.ns1?.resultado || "";
  document.getElementById("rtpcr-data").value = json.exames_laboratoriais.rt_pcr?.coleta || "";
  document.getElementById("rtpcr-resultado").value =
    json.exames_laboratoriais.rt_pcr?.resultado || "";
  document.getElementById("sorotipo").value = json.exames_laboratoriais.sorotipo || "";
  document.getElementById("histopatologia").value = json.exames_laboratoriais.histopatologia || "";
  document.getElementById("imunoquimica").value = json.exames_laboratoriais.imunohistoquimica || "";

  // Hospitalização
  setRadio("hospitalizacao", json.hospitalizacao.ocorreu || "");
  document.getElementById("dataInternacao").value = json.hospitalizacao.data_internacao || "";
  document.getElementById("ufHospital").value = json.hospitalizacao.uf || "";
  document.getElementById("municipioHospital").value = json.hospitalizacao.municipio || "";
  document.getElementById("codigoIBGEHospital").value = json.hospitalizacao.codigo_ibge || "";
  document.getElementById("nomeHospital").value = json.hospitalizacao.nome_hospital || "";
  document.getElementById("codigoHospital").value = json.hospitalizacao.codigo_hospital || "";
  document.getElementById("telefoneHospital").value = json.hospitalizacao.telefone || "";

  // Conclusão
  setRadio("autoctone", json.conclusao.autoctone || "");
  document.getElementById("conclusao-uf").value = json.conclusao.localProvavel?.uf || "";
  document.getElementById("conclusao-pais").value =
    json.conclusao.localProvavel?.pais || "";
  document.getElementById("conclusao-municipio").value =
    json.conclusao.localProvavel?.municipio || "";
  document.getElementById("conclusao-ibge").value =
    json.conclusao.localProvavel?.codigo_ibge || "";
  document.getElementById("conclusao-distrito").value =
    json.conclusao.localProvavel?.distrito || "";
  document.getElementById("conclusao-bairro").value =
    json.conclusao.localProvavel?.bairro || "";
  document.getElementById("classificacao").value = json.conclusao.classificacao || "";
  document.getElementById("criterio-confirmacao").value =
    json.conclusao.criterio_confirmacao || "";
  if (json.conclusao.apresentacao_clinica) {
    document.getElementById("apresentacao-clinica").value =
      json.conclusao.apresentacao_clinica;
    document.getElementById("apresentacaoClinica").classList.remove("hidden");
  }
  document.getElementById("evolucao").value = json.conclusao.evolucao || "";
  document.getElementById("data-obito").value = json.conclusao.data_obito || "";
  document.getElementById("data-encerramento").value =
    json.conclusao.data_encerramento || "";

  // Sinais de Alarme
  setRadio("sinaisAlarme", json.dengue_com_sinais_de_alarme.apresentou || "");
  setCheckboxes("sintoma-alarme", json.dengue_com_sinais_de_alarme.sintomas || []);
  document.getElementById("data-alarme-inicio").value = json.dengue_com_sinais_de_alarme.data_inicio || "";

  // Dengue Grave
  setRadio("dengueGrave", json.dengue_grave.apresentou || "");
  setCheckboxes("dg-extravasamento", json.dengue_grave.extravasamento_grave_de_plasma || []);
  setCheckboxes("dg-sangramento", json.dengue_grave.sangramento_grave || []);
  setCheckboxes("dg-orgao", json.dengue_grave.comprometimento_orgao || []);
  document.getElementById("dg-outros").value = json.dengue_grave.outros || "";
  document.getElementById("dataGravidade").value = json.dengue_grave.data_inicio || "";

  // Informações Complementares
  setRadio("deslocamento", json.informacoes_complementares.deslocamento || "");
  document.getElementById("data-local").value = json.informacoes_complementares.data_local || "";
  document.getElementById("vacina-febre").value =
    json.informacoes_complementares.vacina_febre_amarela || "";
  document.getElementById("dengue-anterior").value = json.informacoes_complementares.dengue_anterior || "";
  document.getElementById("pressao").value = json.informacoes_complementares.pressao_arterial || "";
  setRadio("laco", json.informacoes_complementares.prova_laco || "");
  setRadio("ictericia", json.informacoes_complementares.ictericia || "");
  setRadio("hemograma", json.informacoes_complementares.hemograma || "");
  document.getElementById("hemo1-data").value = json.informacoes_complementares.hemograma_1?.data || "";
  document.getElementById("hemo1-plaquetas").value =
    json.informacoes_complementares.hemograma_1?.plaquetas || "";
  document.getElementById("hemo1-leucocitos").value =
    json.informacoes_complementares.hemograma_1?.leucocitos || "";
  document.getElementById("hemo1-hematocrito").value =
    json.informacoes_complementares.hemograma_1?.hematocrito || "";
  document.getElementById("hemo2-data").value = json.informacoes_complementares.hemograma_2?.data || "";
  document.getElementById("hemo2-plaquetas").value =
    json.informacoes_complementares.hemograma_2?.plaquetas || "";
  document.getElementById("hemo2-leucocitos").value =
    json.informacoes_complementares.hemograma_2?.leucocitos || "";
  document.getElementById("hemo2-hematocrito").value =
    json.informacoes_complementares.hemograma_2?.hematocrito || "";
  setRadio("risco", json.informacoes_complementares.classificacao_risco || "");

  // Investigador
  document.getElementById("investigador-municipio").value =
    json.investigador.municipio_unidade || "";
  document.getElementById("investigador-cod-unidade").value =
    json.investigador.cod_unidade || "";
  document.getElementById("investigador-nome").value = json.investigador.nome || "";
  document.getElementById("investigador-funcao").value = json.investigador.funcao || "";
}

function getFichaCompleta() {
  return {
    dados_gerais: getDadosGerais(),
    notificacao_individual: getNotificacaoIndividual(),
    residencia: getDadosResidencia(),
    investigacao: getDadosInvestigacao(),
    dados_clinicos: getDadosClinicos(),
    exames_laboratoriais: getExamesLaboratoriais(),
    hospitalizacao: getDadosHospitalizacao(),
    conclusao: getConclusao(),
    dengue_com_sinais_de_alarme: getSinaisAlarme(),
    dengue_grave: getDengueGrave(),
    informacoes_complementares: getInformacoesComplementares(),
    investigador: getInvestigador(),
  };
}

function getDadosGerais() {
  return {
    tipo_notificacao: document.getElementById("tipo-notificacao").value,
    agravo_doenca: document.getElementById("agravo-doenca").value,
    cid10: document.getElementById("cid10").value,
    data_notificacao: document.getElementById("data-notificacao").value,
    uf: document.getElementById("uf-notificacao").value,
    municipio_notificacao: document.getElementById("municipio-notificacao")
      .value,
    unidade_saude: document.getElementById("unidade-saude").value,
    codigo_unidade: document.getElementById("codigo-unidade").value,
    codigo_ibge: document.getElementById("codigo-ibge").value,
    data_primeiros_sintomas: document.getElementById("data-primeiros-sintomas")
      .value,
  };
}

function getNotificacaoIndividual() {
  return {
    nome_paciente: document.getElementById("nome-paciente").value,
    data_nascimento: document.getElementById("data-nascimento").value,
    idade: parseInt(document.getElementById("idade").value),
    sexo: document.getElementById("sexo").value,
    gestante: document.getElementById("gestante").value,
    raca_cor: document.getElementById("raca-cor").value,
    escolaridade: document.getElementById("escolaridade").value,
    cartao_sus: document.getElementById("cartao-sus").value,
    nome_mae: document.getElementById("nome-mae").value,
  };
}

function getDadosResidencia() {
  return {
    telefone: document.getElementById("res-telefone").value,
    uf: document.getElementById("res-uf").value,
    municipio: document.getElementById("res-municipio").value,
    codigo_ibge: document.getElementById("res-codigo-ibge").value,
    distrito: document.getElementById("res-distrito").value,
    bairro: document.getElementById("res-bairro").value,
    logradouro: document.getElementById("res-logradouro").value,
    codigo_logradouro: document.getElementById("res-codigo-logradouro").value,
    numero: document.getElementById("res-numero").value,
    complemento: document.getElementById("res-complemento").value,
    geo1: document.getElementById("res-geo1").value,
    geo2: document.getElementById("res-geo2").value,
    referencia: document.getElementById("res-referencia").value,
    cep: document.getElementById("res-cep").value,
    zona: document.getElementById("res-zona").value,
    pais_estrangeiro: document.getElementById("res-pais").value,
  };
}

function getDadosInvestigacao() {
  return {
    data_investigacao: document.getElementById("data-investigacao").value,
    ocupacao: document.getElementById("ocupacao").value,
  };
}

function getDadosClinicos() {
  const sinaisSelecionado = document.querySelector(
    'input[name="sinais"]:checked'
  );
  const doencasSelecionado = document.querySelector(
    'input[name="doencas"]:checked'
  );

  const sinaisClinicos = [];
  document.querySelectorAll("input.sinais:checked").forEach((cb) => {
    sinaisClinicos.push(cb.value);
  });

  const doencasPreExistentes = [];
  document.querySelectorAll("input.doencas:checked").forEach((cb) => {
    doencasPreExistentes.push(cb.value);
  });

  return {
    sinais_clinicos: {
      possui: sinaisSelecionado ? sinaisSelecionado.value === "1" : null,
      lista: sinaisSelecionado ? sinaisClinicos : null,
    },
    doencas_pre_existentes: {
      possui: doencasSelecionado ? doencasSelecionado.value === "1" : null,
      lista: doencasSelecionado ? doencasPreExistentes : null,
    },
  };
}

function getExamesLaboratoriais() {
  return {
    sorologia_chikungunya: {
      coleta_s1: document.getElementById("chikungunya-s1-data").value,
      resultado_s1: document.getElementById("chikungunya-s1-resultado").value,
      coleta_s2: document.getElementById("chikungunya-s2-data").value,
      resultado_s2: document.getElementById("chikungunya-s2-resultado").value,
    },
    prnt: {
      coleta: document.getElementById("prnt-data").value,
      resultado: document.getElementById("prnt-resultado").value,
    },
    sorologia_dengue: {
      coleta: document.getElementById("dengue-igm-data").value,
      resultado: document.getElementById("dengue-igm-resultado").value,
    },
    isolamento: {
      coleta: document.getElementById("isolamento-data").value,
      resultado: document.getElementById("isolamento-resultado").value,
    },
    ns1: {
      coleta: document.getElementById("ns1-data").value,
      resultado: document.getElementById("ns1-resultado").value,
    },
    rt_pcr: {
      coleta: document.getElementById("rtpcr-data").value,
      resultado: document.getElementById("rtpcr-resultado").value,
    },
    sorotipo: document.getElementById("sorotipo").value,
    histopatologia: document.getElementById("histopatologia").value,
    imunohistoquimica: document.getElementById("imunoquimica").value,
  };
}

function getDadosHospitalizacao() {
  const hospitalizacaoSelecionada =
    document.querySelector('input[name="hospitalizacao"]:checked')?.value ||
    null;

  const dadosHospital = {
    ocorreu: hospitalizacaoSelecionada,
    data_internacao: null,
    uf: null,
    municipio: null,
    codigo_ibge: null,
    nome_hospital: null,
    codigo_hospital: null,
    telefone: null,
  };

  if (hospitalizacaoSelecionada === "1") {
    // Só coleta se a opção "Sim" estiver marcada
    dadosHospital.data_internacao =
      document.getElementById("dataInternacao").value;
    dadosHospital.uf = document.getElementById("ufHospital").value;
    dadosHospital.municipio =
      document.getElementById("municipioHospital").value;
    dadosHospital.codigo_ibge =
      document.getElementById("codigoIBGEHospital").value;
    dadosHospital.nome_hospital = document.getElementById("nomeHospital").value;
    dadosHospital.codigo_hospital =
      document.getElementById("codigoHospital").value;
    dadosHospital.telefone = document.getElementById("telefoneHospital").value;
  }

  return dadosHospital;
}

function getConclusao() {
  return {
    autoctone: document.querySelector('input[name="autoctone"]:checked').value,
    localProvavel: {
      uf: document.getElementById("conclusao-uf").value,
      pais: document.getElementById("conclusao-pais").value,
      municipio: document.getElementById("conclusao-municipio").value,
      codigo_ibge: document.getElementById("conclusao-ibge").value,
      distrito: document.getElementById("conclusao-distrito").value,
      bairro: document.getElementById("conclusao-bairro").value,
    },
    classificacao: document.getElementById("classificacao").value,
    criterio_confirmacao: document.getElementById("criterio-confirmacao").value,
    apresentacao_clinica:
      document.getElementById("apresentacao-clinica")?.value || null,
    evolucao: document.getElementById("evolucao").value,
    data_obito: document.getElementById("data-obito")?.value || null,
    data_encerramento:
      document.getElementById("data-encerramento")?.value || null,
  };
}

function getSinaisAlarme() {
  const resposta =
    document.querySelector('input[name="sinaisAlarme"]:checked')?.value || null;
  const sintomasSelecionados = [];

  document.querySelectorAll(".sintoma-alarme:checked").forEach((checkbox) => {
    sintomasSelecionados.push(checkbox.value);
  });

  const dataInicio =
    document.getElementById("data-alarme-inicio")?.value || null;

  return {
    apresentou: resposta, // "1" para sim, "2" para não
    sintomas: sintomasSelecionados,
    data_inicio: dataInicio,
  };
}

function getDengueGrave() {
  const resposta =
    document.querySelector('input[name="dengueGrave"]:checked')?.value || null;

  const extravasamento = [];
  document
    .querySelectorAll(".dg-extravasamento:checked")
    .forEach((cb) => extravasamento.push(cb.value));

  const sangramentos = [];
  document
    .querySelectorAll(".dg-sangramento:checked")
    .forEach((cb) => sangramentos.push(cb.value));

  const orgaos = [];
  document
    .querySelectorAll(".dg-orgao:checked")
    .forEach((cb) => orgaos.push(cb.value));

  const outros = document.getElementById("dg-outros").value || null;
  const dataInicio = document.getElementById("dataGravidade").value || null;

  return {
    apresentou: resposta,
    extravasamento_grave_de_plasma: extravasamento,
    sangramento_grave: sangramentos,
    comprometimento_orgao: orgaos,
    outros: outros,
    data_inicio: dataInicio,
  };
}

function getInformacoesComplementares() {
  const getRadioValue = (name) =>
    document.querySelector(`input[name="${name}"]:checked`)?.value || null;

  return {
    deslocamento: getRadioValue("deslocamento"),
    data_local: document.getElementById("data-local").value,
    vacina_febre_amarela: document.getElementById("vacina-febre").value,
    dengue_anterior: document.getElementById("dengue-anterior").value,
    pressao_arterial: document.getElementById("pressao").value,
    prova_laco: getRadioValue("laco"),
    ictericia: getRadioValue("ictericia"),
    hemograma: getRadioValue("hemograma"),
    hemograma_1: {
      data: document.getElementById("hemo1-data").value,
      plaquetas: document.getElementById("hemo1-plaquetas").value,
      leucocitos: document.getElementById("hemo1-leucocitos").value,
      hematocrito: document.getElementById("hemo1-hematocrito").value,
    },
    hemograma_2: {
      data: document.getElementById("hemo2-data").value,
      plaquetas: document.getElementById("hemo2-plaquetas").value,
      leucocitos: document.getElementById("hemo2-leucocitos").value,
      hematocrito: document.getElementById("hemo2-hematocrito").value,
    },
    classificacao_risco: getRadioValue("risco"),
  };
}

function getInvestigador() {
  return {
    municipio_unidade: document.getElementById("investigador-municipio").value,
    cod_unidade: document.getElementById("investigador-cod-unidade").value,
    nome: document.getElementById("investigador-nome").value,
    funcao: document.getElementById("investigador-funcao").value,
  };
}
