import axios from "axios";
import { API_ENDPOINTS } from "../../config/apiConfig";

export async function enviosFilter(objFilter: any) {
    try {
        const res = await axios.post(API_ENDPOINTS.movimentospdvenviados, { sdaDataBaixaIni: objFilter.dataInicial, sdaDataBaixaFin: objFilter.dataFinal, sdaEnvioScanntec: objFilter.status });
        console.log(res)
        return res.data
    } catch (error) {
        return []
    }
}

export async function reenviar(envios: any) {
    try {
        const enviosReq = envios.map((envio: any) => {
            return {
                usuCodigo: envio.USU_CODIGO,
                sdaNumero: envio.SDA_NUMERO
            }
        })
        const res = await axios.post(API_ENDPOINTS.reenviar, enviosReq);
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

