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
}

export default api;