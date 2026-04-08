import * as formMapper from "./helper/helper_form_mapper.js";

const CASO_MODAL_ID = "case-modal";

// ==================== TOGGLE FUNCTIONS ====================

function toggleSinais() {
  const value = document.querySelector('input[name="sinais"]:checked')?.value;
  document
    .querySelectorAll(".sinais")
    .forEach((cb) => (cb.disabled = value === "2"));
}

function toggleDoencas() {
  const value = document.querySelector('input[name="doencas"]:checked')?.value;
  document
    .querySelectorAll(".doencas")
    .forEach((cb) => (cb.disabled = value === "2"));
}

function toggleHospitalizacao() {
  const value = document.querySelector(
    'input[name="hospitalizacao"]:checked',
  )?.value;
  document.querySelectorAll("#dadosHospitalizacao input").forEach((input) => {
    input.disabled = value !== "1";
  });
}

function toggleDatasByEvolucao() {
  const valor = document.getElementById("evolucao").value;
  document
    .getElementById("campoObito")
    .classList.toggle("hidden", !["2", "3", "4"].includes(valor));
  document
    .getElementById("campoEncerramento")
    .classList.toggle("hidden", !["1", "9"].includes(valor));
}

function toggleApresentacaoClinica() {
  const valor = document.getElementById("classificacao").value;
  document
    .getElementById("apresentacaoClinica")
    .classList.toggle("hidden", valor === "5" || valor === "");
}

// ==================== EVENTOS (delegation + change) ====================

function setupChangeListeners() {
  const changeMap = {
    'input[name="sinais"]': toggleSinais,
    'input[name="doencas"]': toggleDoencas,
    'input[name="hospitalizacao"]': toggleHospitalizacao,
    "#evolucao": toggleDatasByEvolucao,
    "#classificacao": toggleApresentacaoClinica,
  };

  Object.entries(changeMap).forEach(([selector, handler]) => {
    document.querySelectorAll(selector).forEach((el) => {
      el.addEventListener("change", handler);
    });
  });
}

// ==================== FUNÇÕES PÚBLICAS ====================

export function initCasoFormUI() {
  setupChangeListeners();
}

export function hasContainer() {
  return !!document.getElementById(CASO_MODAL_ID);
}

export function openModalAsNewCase() {
  formMapper.resetForm();
  document.getElementById(CASO_MODAL_ID).classList.remove("hidden");
}

export function openModalAsEditCase(caso) {
  if (!caso) return;
  formMapper.populateForm(caso);
  document.getElementById(CASO_MODAL_ID).classList.remove("hidden");
}

export function closeModalCase() {
  document.getElementById(CASO_MODAL_ID).classList.add("hidden");
}
