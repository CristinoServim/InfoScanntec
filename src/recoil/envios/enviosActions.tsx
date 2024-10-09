import axios from "axios";
import { API_ENDPOINTS } from "../../config/apiConfig";

export async function enviosFilter(objFilter: any) {
    try {
        console.log(objFilter)
        const res = await axios.post(API_ENDPOINTS.movimentospdvenviados, { sdaDataBaixaIni: objFilter.dataInicial, sdaDataBaixaFin: objFilter.dataFinal, sdaEnvioScanntec: objFilter.status, lojCnpj: objFilter.lojCnpj });
        return res.data
    } catch (error) {
        throw error;
    }
}

export async function reenviar(iap_codempresaapi: number, iap_local: number, iap_usuario: string, iap_senha: string, loj_cnpj: string, caixas: number[]) {
    try {
        const res = await axios.post(API_ENDPOINTS.reenviar, {lojaCodigo: iap_codempresaapi, lojaLocal: iap_local, usuario: iap_usuario, senha: iap_senha, lojaCnpj: loj_cnpj, caixas: caixas})
        return res
    } catch (error) {
        return error
    }
}

// const frete = 100 // 200
// const itens = []
// const contadorQuantidades = 0


// const inserirItem(item: any) {
//     contadorQuantidades += item.quantidade
//     itens.push(item)

//     if(contadorQuantidades > 2){
//         frete += 100*item.quantidade
//     }
// }

// const inserirItem2(item: any) {
//     const quantidadeTotal = 0
//     itens.forEach((item: any) => {
//         quantidadeTotal += item.quantidade
//     })
//     if(quantidadeTotal > 2){
//         frete += 100
//     }

//  itens.push(item)
// }

