import { Box, Grid, Typography } from '@mui/material';
import { enviosSelector } from '../../recoil/envios/enviosSelector';
import TablePaginated, { ITablePaginatedColumn } from '../../shared/components/tables/TablePaginated';
import { useState } from 'react';
import { VerdeEscuro } from '../../assets/colors/CoresPadroes';


export const Envios = () => {

    const [envio, setEnvio] = useState(null)

    const columnsEnvios: ITablePaginatedColumn[] = [
        {
            field: "SDA_DATABAIXA",
            label: 'Data',
            align: 'left',
            width: '20%',
            enableOrder: true,
            mask: 'data'
        },
        {
            field: "USU_CODIGO",
            label: 'Caixa',
            align: 'right',
            width: '20%',
            enableOrder: true,
        },
        {
            field: "SDA_NUMERO",
            label: 'Número Saída',
            align: 'right',
            width: '20%',
            enableOrder: true,
        },
        {
            field: "NUMERO",
            label: 'Número Envio',
            align: 'right',
            width: '20%',
            enableOrder: true,
        },
        {
            field: "TOTAL",
            label: 'Total',
            align: 'right',
            width: '20%',
            enableOrder: true,
        },
    ]

    return (
        <>
            <Box sx={{ backgroundColor: VerdeEscuro, borderRadius: 1, boxShadow: '0 4px 7px rgba(0, 0, 0, 0.4)' }}>
                <Typography color='primary' variant='h5' sx={{ padding: 2, paddingLeft: 3, marginBottom: 3, color: 'white', fontSize: 27 }}>Envios</Typography>
            </Box>
            <Grid item xs={12} md={12} lg={12} xl={12} sx={{ margin: 3 }}>
                <TablePaginated columns={columnsEnvios} selectorRecoil={enviosSelector} item={envio} setItem={setEnvio} titleToolbar='Enviados' />
            </Grid>
        </>
    );
};