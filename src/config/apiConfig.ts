
const API_BASE_URL: string = "http://192.168.253.94:5001";

// const API_BASE_URL: string = "http://17.1.1.0:5001";
const API_VERSAO: string = "v1-ibra";

// Definindo endpoints como parte de um objeto
export const API_ENDPOINTS = {
    loginscanntec: `${API_BASE_URL}/${API_VERSAO}/loginscanntec`,
    cadastroscanntech: `${API_BASE_URL}/${API_VERSAO}/cadastroscanntech`,
    configurascanntec: `${API_BASE_URL}/${API_VERSAO}/configurascanntec`,
    movimentospdvenviados: `${API_BASE_URL}/${API_VERSAO}/movimentospdvenviados`,
    reenviar: `${API_BASE_URL}/${API_VERSAO}/reenviar`
};