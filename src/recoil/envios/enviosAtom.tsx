import { atom } from "recoil"


export const statusFilterAtom = atom({
    key: 'statusFilterAtom',
    default: 'Não enviados'
})

export const dtInicialFilterAtom = atom({
    key: 'dtInicialFilterAtom',
    default: ''
})

export const dtFinalFiterAtom = atom({
    key: 'dtFinalFiterAtom',
    default: ''
})

export const lojaCodigoFilterAtom = atom({
    key: 'lojaCodigoFilterAtom',
    default: 1
})

export const enviosFilterAtom = atom({
    key: 'enviosFilterAtom',
    default: { dataInicial: '', dataFinal: '', status: 'N', lojCnpj: ''}
})
