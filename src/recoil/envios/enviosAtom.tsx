import { atom } from "recoil"
import { getData } from "../../functions/GetDataHora"

const dataAtual = getData()

export const statusFilterAtom = atom({
    key: 'statusFilterAtom',
    default: 'Enviados'
})

export const dtInicialFilterAtom = atom({
    key: 'dtInicialFilterAtom',
    default: dataAtual
})

export const dtFinalFiterAtom = atom({
    key: 'dtFinalFiterAtom',
    default: dataAtual
})

export const lojaCodigoFilterAtom = atom({
    key: 'lojaCodigoFilterAtom',
    default: null
})

export const enviosFilterAtom = atom({
    key: 'enviosFilterAtom',
    default: { dataInicial: dataAtual, dataFinal: dataAtual, status: 'S', lojCnpj: '' }
})
