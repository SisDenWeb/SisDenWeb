async function get_initial_data() {
  const response = await fetch(
    "../../script/initial_data.json"
  );
  const data = await response.json();
  return data;
}

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

async function starter_database(callback = null) {
  const dadosIniciais = await get_initial_data();
  dadosIniciais.infos.last_case_id = dadosIniciais.cases.length;

  alert("i'm restarting database :)");
  salvarDados(dadosIniciais.admin, "admin");
  salvarDados(dadosIniciais.employers, "employer");
  salvarDados(dadosIniciais.cases, "case");
  salvarDados(dadosIniciais.infos, "info");

  if(callback){
    callback();
  }
}

// did this to restart database if empty andddd now i can just call starter_database() :)
function database_empty() {
  if (
    recuperarDados("admin") == null ||
    recuperarDados("employer") == null ||
    recuperarDados("case") == null ||
    recuperarDados("info") == null
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

  const logradouro = document.getElementById("res-logradouro")?.value || "";
  const numero = document.getElementById("res-numero")?.value
  
  if(caso.residencia.numero == 210){
    console.debug("210");
    caso.residencia.geo1 = "-20.277086"
    caso.residencia.geo2 = "-50.255206"
  }

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
  info_db.login_info.username = login.username;
  info_db.login_info.id = login.id;

  salvarDados(info_db, "info");
}

function get_login_info() {
  let login_info = recuperarDados("info").login_info;
  if (login_info.username == "" && login_info.id == 0) {
    window.location.href = "../index.html";
  }
  return login_info;
}

document.addEventListener("DOMContentLoaded", async () => {
  window.rst = starter_database;
});

const SESSION_TIMEOUT = 10 * 60 * 1000; // 10 minutos em milissegundos
const SESSION_KEY = "sessionTimestamp";

function resetLocalStorage() {
  console.warn("🧹 Limpando localStorage (sessão expirada)");
  localStorage.clear();
  localStorage.setItem(SESSION_KEY, Date.now().toString());
  starter_database()
}

// Verifica sessão ao carregar
function checkSessionTimeout() {
  const lastSession = localStorage.getItem(SESSION_KEY);

  if (!lastSession) {
    resetLocalStorage();
  } else {
    const elapsed = Date.now() - parseInt(lastSession, 10);

    if (elapsed > SESSION_TIMEOUT) {
      resetLocalStorage();
    } else {
      // Atualiza timestamp (mantém sessão ativa)
      localStorage.setItem(SESSION_KEY, Date.now().toString());
    }
  }
}

// Atualiza timestamp quando há atividade
function refreshSessionOnActivity() {
  const updateTimestamp = () => {
    localStorage.setItem(SESSION_KEY, Date.now().toString());
  };

  ["click", "keypress", "mousemove", "scroll", "touchstart"].forEach(event =>
    window.addEventListener(event, updateTimestamp)
  );
}

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
  checkSessionTimeout();
  refreshSessionOnActivity();
});
