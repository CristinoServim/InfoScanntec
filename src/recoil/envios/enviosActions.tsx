import axios from "axios";

export async function enviosFilter(objFilter: any) {
    try {
        const res = await axios.post("http://192.168.253.94:5001/v1-ibra/movimentospdvenviados", {sdaDataBaixaIni: objFilter.dataInicial, sdaDataBaixaFin: objFilter.dataFinal, sdaEnvioScanntec: objFilter.status});
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
        const res = await axios.post("http://192.168.253.94:5001/v1-ibra/reenviar", enviosReq);
        console.log(res)
        return res.data
    } catch (error) {
        return error
    }
}
