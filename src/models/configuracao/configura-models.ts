

export class ConfiguraModels {
    empresa: number
    local: number
    usuario: string
    senha: string
    intervaloSincronizacao: number
    horaFechamento: string
    urlBase: string
    urlRecebimento: string
    urlEnvio: string
    lojasAtivas: []

    constructor(
        empresa: number,
        local: number,
        usuario: string,
        senha: string,
        intervaloSincronizacao: number,
        horaFechamento: string,

        urlBase: string,
        urlRecebimento: string,
        urlEnvio: string,
        lojasAtivas: []) {
        this.local = local,
            this.usuario = usuario,
            this.senha = senha,
            this.intervaloSincronizacao = intervaloSincronizacao,
            this.horaFechamento = horaFechamento,
            this.urlBase = urlBase,
            this.urlRecebimento = urlRecebimento,
            this.urlEnvio = urlEnvio,
            this.lojasAtivas = lojasAtivas,
            this.empresa = empresa
    }
}