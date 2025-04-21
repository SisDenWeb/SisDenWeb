
function toggleSinais() {
    const value = document.querySelector(
        'input[name="sinais"]:checked'
    )?.value;
    const checkboxes = document.querySelectorAll(".sinais");
    checkboxes.forEach((cb) => (cb.disabled = value === "2"));
}

function toggleDoencas() {
    const value = document.querySelector(
        'input[name="doencas"]:checked'
    )?.value;
    const checkboxes = document.querySelectorAll(".doencas");
    checkboxes.forEach((cb) => (cb.disabled = value === "2"));
}


function toggleHospitalizacao() {
    const value = document.querySelector(
        'input[name="hospitalizacao"]:checked'
    )?.value;
    const inputs = document.querySelectorAll(
        "#dadosHospitalizacao input"
    );

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

function verificarApresentacao() {
    const valor = document.getElementById("classificacao").value;
    const apresentacao = document.getElementById("apresentacaoClinica");
    const sinaisAlarme = document.getElementById("sinaisAlarme");

    apresentacao.classList.toggle("hidden", valor === "5" || valor === "");

    // Ativa ou desativa o fieldset dos sinais
    sinaisAlarme.disabled = (valor === "5" || valor === "");
}
function toggleSinaisAlarme(ativo) {
    document.getElementById('sintomasAlarme').disabled = !ativo;
    document.getElementById('dataAlarme').disabled = !ativo;
}

function toggleDengueGrave(ativo) {
    document.getElementById('sintomasGrave').disabled = !ativo;
}
