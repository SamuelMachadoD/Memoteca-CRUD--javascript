import api from "./api.js";
import ui from "./ui.js";

const pensamentoSet = new Set()

async function adicionarChaveAoPensamento(){
    try {
        const pensamentos = await api.buscarPensamentos()
        pensamentos.forEach(element => {
              const chavePensamento = 
                `${element.conteudo.trim().toLowerCase()}-${element.autoria.trim().toLowerCase()}`
            pensamentoSet.add(chavePensamento)
        });
    } catch (error) {
        alert('Erro ao adicionar chave ao pensamento!')
    }
}

function removerEspacos(string) {
  return string.replaceAll(/\s+/g, "");
}

const regexConteudo = /^[A-Za-z\s]{10,}$/;
//Regex que aceita letras de A ate Z maiusculas e minusculas, espaços ( \s ) e tem um minimo de 10 caracteres, não possui maximo
const regexAutoria = /^[A-Za-z]{3,15}$/;
//Regex que aceita letras de A ate Z maiusculas e minusculas com um minimo de 3 caracteres e um maximo de 15

function validarConteudo(texto) {
  return regexConteudo.test(texto);
}

function validarAutoria(texto) {
  return regexAutoria.test(texto);
}

document.addEventListener("DOMContentLoaded", () => {
  ui.renderizarPensamentos();
  adicionarChaveAoPensamento();

  const formularioPensamento = document.getElementById("pensamento-form");
  const botaoCancelar = document.getElementById("botao-cancelar");
  const inputBusca = document.getElementById("campo-busca");
  botaoCancelar.addEventListener("click", manipularCancelamento);
  formularioPensamento.addEventListener("submit", manipularSubmissaoFormulario);
  inputBusca.addEventListener("input", manipularBusca);
});

function manipularCancelamento() {
  ui.limparFormulario();
}

async function manipularSubmissaoFormulario(event) {
  event.preventDefault();
  const id = document.getElementById("pensamento-id").value;
  const conteudo = document.getElementById("pensamento-conteudo").value;
  const autoria = document.getElementById("pensamento-autoria").value;
  const data = document.getElementById("pensamento-data").value;

  const conteudoSemEspaco = removerEspacos(conteudo);
  const autoriaSemEspaco = removerEspacos(autoria);

  if (!validarConteudo(conteudoSemEspaco)) {
    alert(
      "Entrada de conteudo invalida! Minimo de 10 caracteres, sem caracteres especiais ou numeros"
    );
    return;
  }
  if (!validarAutoria(autoriaSemEspaco)) {
    alert(
      "Entrada de autoria invalida! Minimo de 3 caracteres, Maximo de 15, sem caracteres especiais, numeros ou espaços"
    );
    return;
  }

  if (!validarData(data)) {
    alert("Data invalida!");
  }

  const chaveNovoPensamento = 
  `${conteudo.trim().toLowerCase()}-${autoria.trim().toLowerCase()}`

  if(pensamentoSet.has(chaveNovoPensamento)) {
    alert("Esse pensamento ja existe!")
    return
  }

  try {
    if (id) {
      await api.editarPensamento({ id, conteudo, autoria, data });
    } else {
      await api.salvarPensamento({ conteudo, autoria, data });
    }
    ui.renderizarPensamentos();
  } catch {
    alert("Erro ao salvar pensamento");
  }
}

async function manipularBusca() {
  const termoBusca = document.getElementById("campo-busca").value;
  try {
    const pensamentosFiltrados = await api.buscarPensamentoPorTermo(termoBusca);
    ui.renderizarPensamentos(pensamentosFiltrados);
  } catch (error) {
    alert("Erro ao realizar busca");
  }
}

function validarData(data) {
  const dataAtual = new Date();
  const dataInserida = new Date(data);
  return dataInserida <= dataAtual;
}
