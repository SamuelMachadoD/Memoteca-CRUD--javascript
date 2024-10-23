import api from "./api.js";
import ui from "./ui.js";

document.addEventListener('DOMContentLoaded', () => {
    ui.renderizarPensamentos()

    const formularioPensamento = document.getElementById('pensamento-form')
    const botaoCancelar = document.getElementById('botao-cancelar');
    const inputBusca = document.getElementById("campo-busca")
    botaoCancelar.addEventListener('click', manipularCancelamento);
    formularioPensamento.addEventListener('submit', manipularSubmissaoFormulario);
    inputBusca.addEventListener("input", manipularBusca)
})

function manipularCancelamento() {
    ui.limparFormulario();
}

async function manipularSubmissaoFormulario(event){
    event.preventDefault();
    const id = document.getElementById('pensamento-id').value
    const conteudo = document.getElementById('pensamento-conteudo').value;
    const autoria = document.getElementById('pensamento-autoria').value;
    const data = document.getElementById('pensamento-data').value;

    if(!validarData(data)){
        alert("Data invalida!")
    }
    
    try{
        if(id){
            await api.editarPensamento({ id, conteudo, autoria, data });
        }else{
            await api.salvarPensamento({ conteudo, autoria, data });
        }
        ui.renderizarPensamentos()
    }catch{
        alert('Erro ao salvar pensamento')
    }
    
}

async function manipularBusca() {
    const termoBusca = document.getElementById("campo-busca").value
    try {
        const pensamentosFiltrados = await api.buscarPensamentoPorTermo(termoBusca)
        ui.renderizarPensamentos(pensamentosFiltrados)
    } catch (error) {
        alert("Erro ao realizar busca")
    }
}

function validarData(data){
    const dataAtual = new Date();
    const dataInserida = new Date(data);
    return dataInserida <= dataAtual;
}