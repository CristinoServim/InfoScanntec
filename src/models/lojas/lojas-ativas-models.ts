type stringornull = string | null;
export class LojasAtiva {
    lojaNome: stringornull
    lojaCodigo: number
    lojaCodigoScanntech: number

    constructor(
        lojaNome: stringornull,
        lojaCodigo: number,
        lojaCodigoScanntech: number,
    ) {
        this.lojaNome = lojaNome,
            this.lojaCodigo = lojaCodigo,
            this.lojaCodigoScanntech = lojaCodigoScanntech

    }

}