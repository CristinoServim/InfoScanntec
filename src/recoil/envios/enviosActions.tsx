import axios from "axios";
import { API_ENDPOINTS } from "../../config/apiConfig";

export async function enviosFilter(objFilter: any) {
    try {
        const res = await axios.post(API_ENDPOINTS.movimentospdvenviados, { sdaDataBaixaIni: objFilter.dataInicial, sdaDataBaixaFin: objFilter.dataFinal, sdaEnvioScanntec: objFilter.status });
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
        console.log(res)
        return res.data
    } catch (error) {
        return error
    }
}
