import { selector } from "recoil";
import { enviosFilterAtom, lojaCodigoFilterAtom } from "./enviosAtom";
import { enviosFilter } from "./enviosActions";

export const enviosSelector = selector({
    key: 'enviosSelector',
    get: async ({ get }) => {
        const searchObj : any = get(enviosFilterAtom);
        let envios =  await enviosFilter(searchObj)
        if(searchObj.lojaCodigo){
            envios =  envios.filter((e: any) => e.LOJ_CODIGO === parseInt(searchObj.lojaCodigo))
        }
        return envios
    }
})
