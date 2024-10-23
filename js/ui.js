import api from "./api.js";

const ui = {

    async preencherFormulario(pensamentoID){
        const pensamento = await api.buscarPensamentoPorId(pensamentoID)
        document.getElementById('pensamento-id').value = pensamento.id
        document.getElementById('pensamento-conteudo').value = pensamento.conteudo
        document.getElementById('pensamento-autoria').value = pensamento.autoria
    },

    async renderizarPensamentos(pensamentoFiltrado = null){
        const listaPensamentos = document.getElementById("lista-pensamentos")
        const mensagemVazia = document.getElementById('mensagem-vazia')
        listaPensamentos.innerHTML = ""

        try{

            let pensamentoParaRenderizar
            if(pensamentoFiltrado){
                pensamentoParaRenderizar = pensamentoFiltrado;
            }else{
                pensamentoParaRenderizar = await api.buscarPensamentos()
            }

            if(pensamentoParaRenderizar.length === 0){
                mensagemVazia.style.display = "block";
            } else {
                mensagemVazia.style.display = "none";
                pensamentoParaRenderizar.forEach(ui.adicionarPensamentoNaLista)
            }
        }
        catch(error){
            alert('Error ao renderizar pensamentos')
            throw error
        }
    },

    adicionarPensamentoNaLista(pensamento){
        const listaPensamentos = document.getElementById("lista-pensamentos")
        const li = document.createElement("li")
        li.setAttribute("data-id", pensamento.id)
        li.classList.add("li-pensamento")
        
        const iconeIMG = document.createElement('img')
        iconeIMG.classList.add('icone-aspas')
        iconeIMG.src = 'assets/imagens/aspas-azuis.png'
        iconeIMG.alt = 'Aspas azuis'

        const pensamentoConteudo = document.createElement("div");
        pensamentoConteudo.classList.add("pensamento-conteudo")
        pensamentoConteudo.textContent = pensamento.conteudo;

        const pensamentoAutoria = document.createElement('div');
        pensamentoAutoria.classList.add("pensamento-autoria")
        pensamentoAutoria.textContent = pensamento.autoria;

        const botaoEditar = document.createElement('button');
        botaoEditar.classList.add('botao-editar')
        botaoEditar.onclick = () => ui.preencherFormulario(pensamento.id)

        const iconeEditar = document.createElement('img');
        iconeEditar.src = 'assets/imagens/icone-editar.png'
        iconeEditar.alt = 'Editar'
        botaoEditar.appendChild(iconeEditar);

        const botaoExcluir = document.createElement('button');
        botaoExcluir.classList.add('botao-excluir')
        botaoExcluir.onclick = async () => {
            try{
                await api.deletarPensamento(pensamento.id)
                ui.renderizarPensamentos()
            } catch {
                alert("Erro ao excluir pensamento")
            }
            
        }

        const iconeExcluir = document.createElement('img');
        iconeExcluir.src = 'assets/imagens/icone-excluir.png'
        iconeExcluir.alt = 'Excluir'
        botaoExcluir.appendChild(iconeExcluir);
        
        const icones = document.createElement("div")
        icones.classList.add("icones")
        icones.appendChild(botaoEditar)
        icones.appendChild(botaoExcluir)

        li.appendChild(iconeIMG)
        li.appendChild(pensamentoConteudo)
        li.appendChild(pensamentoAutoria)
        li.appendChild(icones)
        listaPensamentos.appendChild(li)
    },

    limparFormulario(){
        document.getElementById("pensamento-form").reset();
    },


}

export default ui;