/**
 * Ainda é um handler, todas as funções aqui são relacionadas a manipulação do DOM,
 * mas essa é um "mapeador" entre o formulário e o objeto de caso, apenas para facilitar
 * a extração e preenchimento dos dados.
 * É a única camada que vai conhece a estrutura do formulário HTML e do objeto de Caso.
 */

const formConfig = {
  // Campos simples: id do input → caminho no objeto
  simpleFields: {
    "id": "id",
    "tipo-notificacao": "dados_gerais.tipo_notificacao",
    "agravo-doenca": "dados_gerais.agravo_doenca",
    "cid10": "dados_gerais.cid10",
    "data-notificacao": "dados_gerais.data_notificacao",
    "uf-notificacao": "dados_gerais.uf",
    "municipio-notificacao": "dados_gerais.municipio_notificacao",
    "unidade-saude": "dados_gerais.unidade_saude",
    "codigo-unidade": "dados_gerais.codigo_unidade",
    "codigo-ibge": "dados_gerais.codigo_ibge",
    "data-primeiros-sintomas": "dados_gerais.data_primeiros_sintomas",

    "nome-paciente": "notificacao_individual.nome_paciente",
    "data-nascimento": "notificacao_individual.data_nascimento",
    "idade": "notificacao_individual.idade",
    "sexo": "notificacao_individual.sexo",
    "gestante": "notificacao_individual.gestante",
    "raca-cor": "notificacao_individual.raca_cor",
    "escolaridade": "notificacao_individual.escolaridade",
    "cartao-sus": "notificacao_individual.cartao_sus",
    "nome-mae": "notificacao_individual.nome_mae",

    "res-telefone": "residencia.telefone",
    "res-uf": "residencia.uf",
    "res-municipio": "residencia.municipio",
    "res-codigo-ibge": "residencia.codigo_ibge",
    "res-distrito": "residencia.distrito",
    "res-bairro": "residencia.bairro",
    "res-logradouro": "residencia.logradouro",
    "res-codigo-logradouro": "residencia.codigo_logradouro",
    "res-numero": "residencia.numero",
    "res-complemento": "residencia.complemento",
    "res-geo1": "residencia.geo1",
    "res-geo2": "residencia.geo2",
    "res-referencia": "residencia.referencia",
    "res-cep": "residencia.cep",
    "res-zona": "residencia.zona",
    "res-pais": "residencia.pais_estrangeiro",

    "data-investigacao": "investigacao.data_investigacao",
    "ocupacao": "investigacao.ocupacao",

    "data-obito": "conclusao.data_obito",
    "data-encerramento": "conclusao.data_encerramento",
    "classificacao": "conclusao.classificacao",
    "criterio-confirmacao": "conclusao.criterio_confirmacao",
    "apresentacao-clinica": "conclusao.apresentacao_clinica",
    "evolucao": "conclusao.evolucao",

    "data-alarme-inicio": "dengue_com_sinais_de_alarme.data_inicio",
    "dg-outros": "dengue_grave.outros",
    "dataGravidade": "dengue_grave.data_inicio",
    "data-local": "informacoes_complementares.data_local",
    "vacina-febre": "informacoes_complementares.vacina_febre_amarela",
    "dengue-anterior": "informacoes_complementares.dengue_anterior",
    "pressao": "informacoes_complementares.pressao_arterial",

    "investigador-municipio": "investigador.municipio_unidade",
    "investigador-cod-unidade": "investigador.cod_unidade",
    "investigador-nome": "investigador.nome",
    "investigador-funcao": "investigador.funcao",
  },

  // Radios: name do grupo → caminho no objeto
  radioGroups: {
    "sinais": "dados_clinicos.sinais_clinicos.possui",
    "doencas": "dados_clinicos.doencas_pre_existentes.possui",
    "hospitalizacao": "hospitalizacao.ocorreu",
    "autoctone": "conclusao.autoctone",
    "sinaisAlarme": "dengue_com_sinais_de_alarme.apresentou",
    "dengueGrave": "dengue_grave.apresentou",
    "deslocamento": "informacoes_complementares.deslocamento",
    "laco": "informacoes_complementares.prova_laco",
    "ictericia": "informacoes_complementares.ictericia",
    "hemograma": "informacoes_complementares.hemograma",
    "risco": "informacoes_complementares.classificacao_risco",
  },

  // Checkboxes: selector CSS → caminho no objeto (array)
  checkboxGroups: {
    ".sinais": "dados_clinicos.sinais_clinicos.lista",
    ".doencas": "dados_clinicos.doencas_pre_existentes.lista",
    ".sintoma-alarme": "dengue_com_sinais_de_alarme.sintomas",
    ".dg-extravasamento": "dengue_grave.extravasamento_grave_de_plasma",
    ".dg-sangramento": "dengue_grave.sangramento_grave",
    ".dg-orgao": "dengue_grave.comprometimento_orgao",
  }
};

// ====================== HELPERS ======================

function getValueByPath(obj, path) {
  if (!obj || !path) return null;
  return path.split('.').reduce((current, key) => current?.[key], obj);
}

function setValueByPath(obj, path, value) {
  if (!path) return;
  const keys = path.split('.');
  let current = obj;

  for (let i = 0; i < keys.length - 1; i++) {
    if (!current[keys[i]]) current[keys[i]] = {};
    current = current[keys[i]];
  }
  current[keys[keys.length - 1]] = value;
}

function setRadioValue(name, value) {
  document.querySelectorAll(`input[name="${name}"]`).forEach(radio => {
    radio.checked = String(radio.value) === String(value);
  });
}

function setCheckboxes(selector, values = []) {
  document.querySelectorAll(selector).forEach(checkbox => {
    checkbox.checked = values.includes(checkbox.value);
  });
}

function clearRadio(name) {
  document.querySelectorAll(`input[name="${name}"]`).forEach(r => r.checked = false);
}

function clearCheckboxes(selector) {
  document.querySelectorAll(selector).forEach(cb => cb.checked = false);
}

// ====================== PRINCIPAIS FUNÇÕES ======================

/** Preenche o formulário a partir de um objeto de caso */
export function populateForm(caso) {
  if (!caso) return;

  // 1. Campos simples
  Object.entries(formConfig.simpleFields).forEach(([id, path]) => {
    const value = getValueByPath(caso, path);
    const element = document.getElementById(id);
    if (element) element.value = value ?? "";
  });

  // 2. Radios
  Object.entries(formConfig.radioGroups).forEach(([name, path]) => {
    const value = getValueByPath(caso, path);
    setRadioValue(name, value);
  });

  // 3. Checkboxes
  Object.entries(formConfig.checkboxGroups).forEach(([selector, path]) => {
    const values = getValueByPath(caso, path) || [];
    setCheckboxes(selector, values);
  });

  // 4. Campos condicionais (mostrar/esconder)
  triggerConditionalUI();
}

/** Extrai todos os dados do formulário e retorna um objeto estruturado */
export function extractFormData() {
  const data = {};

  // Campos simples
  Object.entries(formConfig.simpleFields).forEach(([id, path]) => {
    const el = document.getElementById(id);
    if (el) {
      let value = el.value;
      // Converter idade para número
      if (id === "idade" && value) value = parseInt(value) || null;
      setValueByPath(data, path, value || null);
    }
  });

  // Radios
  Object.entries(formConfig.radioGroups).forEach(([name, path]) => {
    const checked = document.querySelector(`input[name="${name}"]:checked`);
    setValueByPath(data, path, checked ? checked.value : null);
  });

  // Checkboxes
  Object.entries(formConfig.checkboxGroups).forEach(([selector, path]) => {
    const values = [];
    document.querySelectorAll(`${selector}:checked`).forEach(cb => {
      values.push(cb.value);
    });
    setValueByPath(data, path, values);
  });

  return data;
}

/** Limpa completamente o formulário */
export function resetForm() {
  // Campos simples
  Object.keys(formConfig.simpleFields).forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = "";
  });

  // Radios
  Object.keys(formConfig.radioGroups).forEach(name => clearRadio(name));

  // Checkboxes
  Object.keys(formConfig.checkboxGroups).forEach(selector => clearCheckboxes(selector));

  // Esconde campos condicionais
  const hiddenFields = ["apresentacaoClinica", "campoObito", "campoEncerramento"];
  hiddenFields.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.add("hidden");
  });

  // Desabilita campos condicionais
  const disabledFields = ["dataInternacao", "ufHospital", "municipioHospital", "codigoIBGEHospital",
                          "nomeHospital", "codigoHospital", "telefoneHospital", "data-alarme-inicio", "dataGravidade"];
  disabledFields.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.disabled = true;
  });
}

/** Dispara as funções de UI condicional (toggle) após preencher o form */
function triggerConditionalUI() {

}

// Exporta tudo que será usado por outros arquivos
export default {
  populateForm,
  extractFormData,
  resetForm,
  triggerConditionalUI
};