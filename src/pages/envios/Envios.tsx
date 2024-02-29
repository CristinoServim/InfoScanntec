import { Box, Typography } from '@mui/material';
import { useAuth } from '../../shared/contexts/AuthContext';
import { useEffect } from 'react';
import axios from 'axios';


export const Envios = () => {

    const { usuarioLogado } = useAuth();
    
    const getEnvios = async () => {
        const res = await axios.post("http://192.168.253.94:5001/v1-ibra/movimentospdvenviados", {sdaDataBaixaIni: "2024-02-28", sdaDataBaixaFin: "2024-02-29"});
        console.log(res)
    }

    useEffect(() => {
        if (usuarioLogado) {
            console.log("EFFECT")
            getEnvios()
        }
    }, [usuarioLogado])

    return (
        <>
            <Box sx={{ backgroundColor: 'green', borderRadius: 1, boxShadow: '0 4px 7px rgba(0, 0, 0, 0.4)' }}>
                <Typography color='primary' variant='h5' sx={{ padding: 2, paddingLeft: 3, marginBottom: 3, color: 'white', fontSize: 27 }}>Envios</Typography>
            </Box>

        </>
    );
};