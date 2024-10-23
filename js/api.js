const URL_API = "http://localhost:3000"
const api = {
    async buscarPensamentos() {
        try{
            const response = await axios.get(`${URL_API}/pensamentos`)
            return await response.data
        }
        catch(error){
            alert('Erro ao buscar pensamentos')
            throw error
        }
    },

    async salvarPensamento(pensamento) {
        try{
            const response = await axios.post(`${URL_API}/pensamentos`, pensamento)
            return await response.data
        }
        catch(error){
            alert('Erro ao buscar pensamentos')
            throw error
        }
    },
    async buscarPensamentoPorId(pensamentoID) {
        try{
            const response = await axios.get(`${URL_API}/pensamentos/${pensamentoID}`)
            return await response.data
        }
        catch(error){
            alert('Erro ao buscar pensamento')
            throw error
        }
    },

    async editarPensamento(pensamento) {
        try{
            const response = await axios.put(`${URL_API}/pensamentos/${pensamento.id}`, pensamento)
            return await response.data
        }
        catch(error){
            alert('Erro ao editar pensamentos')
            throw error
        }
    },
    async deletarPensamento(id) {
        try{
            const response = await axios.delete(`${URL_API}/pensamentos/${id}`)
        }
        catch(error){
            alert('Erro ao excluir pensamentos no server')
            throw error
        }
    },

    async buscarPensamentoPorTermo(termo){
        try{
            const pensamentos = await this.buscarPensamentos()
            const termoEmMinusculas  = termo.toLowerCase()
    
            const pensamentosFiltrados = pensamentos.filter(pensamento => {
                return (pensamento.conteudo.toLowerCase().includes(termoEmMinusculas) || pensamento.autoria.toLowerCase().includes(termoEmMinusculas))
            })
            return pensamentosFiltrados
        }catch(error){
            alert("Erro ao filtrar pensamentos")
            throw error;
        }
    },

    async atualizarFavorito(id, favorito) {
        try {
            const response = await axios.patch(`${URL_API}/pensamentos/${id}`, { favorito })
            return response.data
        } catch (error) {
            alert("Erro ao favoritar")
            throw error;
        }
    }
}

export default api;