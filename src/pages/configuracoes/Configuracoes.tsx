import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { TxtFieldForm } from '../../shared/components/textfield/TextFieldForm';
import { ButtonGeneric } from '../../shared/components/button/ButtonGeneric';
import { yupResolver } from '@hookform/resolvers/yup'; // Certifique-se de importar desta forma
import axios from 'axios';
import { useAuth } from '../../shared/contexts/AuthContext';
import { useState, useEffect } from 'react';
import { VerdeEscuro } from '../../assets/colors/CoresPadroes';
import { API_ENDPOINTS } from '../../config/apiConfig';

// LEMBRAR ADICIONAR CAMPOS : NUM EMPRESA E LOCAL !!!


interface Loja {
    nome: string,
    codigo: number
}

export const Configuracoes = () => {

    const [msgErroApi, setMsgErroApi] = useState<string>('')

    const validationSchema = Yup.object({

        intervaloSincronizacao: Yup.number()
            .typeError('O campo deve ser um número')
            .required('*Campo obrigatório')
            .positive('O campo deve ser um número positivo')
            .integer('O campo deve ser um número inteiro'),

        horaFechamento: Yup.string()
            .required('*Campo obrigatório'),

        lojaNome1: Yup.string()
            .nullable(),
        lojaCodigo1: Yup.number()
            .typeError('O campo deve ser um número')
            .required('*Campo obrigatório')
            .positive('O campo deve ser um número positivo')
            .integer('O campo deve ser um número inteiro'),
        lojaCodigoScanntech1: Yup.number()
            .typeError('O campo deve ser um número')
            .required('*Campo obrigatório')
            .positive('O campo deve ser um número positivo')
            .integer('O campo deve ser um número inteiro'),

        lojaNome2: Yup.string()
            .nullable(),
        lojaCodigo2: Yup.number()
            .typeError('O campo deve ser um número')
            .nullable()
            .positive('O campo deve ser um número positivo')
            .integer('O campo deve ser um número inteiro'),
        lojaCodigoScanntech2: Yup.number()
            .typeError('O campo deve ser um número')
            .nullable()
            .positive('O campo deve ser um número positivo')
            .integer('O campo deve ser um número inteiro'),

        lojaNome3: Yup.string()
            .nullable(),
        lojaCodigo3: Yup.number()
            .typeError('O campo deve ser um número')
            .nullable()
            .positive('O campo deve ser um número positivo')
            .integer('O campo deve ser um número inteiro'),
        lojaCodigoScanntech3: Yup.number()
            .typeError('O campo deve ser um número')
            .nullable()
            .positive('O campo deve ser um número positivo')
            .integer('O campo deve ser um número inteiro'),

        lojaNome4: Yup.string()
            .nullable(),
        lojaCodigo4: Yup.number()
            .typeError('O campo deve ser um número')
            .nullable()
            .positive('O campo deve ser um número positivo')
            .integer('O campo deve ser um número inteiro'),
        lojaCodigoScanntech4: Yup.number()
            .typeError('O campo deve ser um número')
            .nullable()
            .positive('O campo deve ser um número positivo')
            .integer('O campo deve ser um número inteiro'),

        lojaNome5: Yup.string()
            .nullable(),
        lojaCodigo5: Yup.number()
            .typeError('O campo deve ser um número')
            .nullable()
            .positive('O campo deve ser um número positivo')
            .integer('O campo deve ser um número inteiro'),
        lojaCodigoScanntech5: Yup.number()
            .typeError('O campo deve ser um número')
            .nullable()
            .positive('O campo deve ser um número positivo')
            .integer('O campo deve ser um número inteiro'),

        urlBase: Yup.string()
            .required("*Campo obrigatório"),
        urlRecebimento: Yup.string()
            .required("*Campo obrigatório"),
        urlEnvio: Yup.string()
            .required("*Campo obrigatório")
    });


    const { handleSubmit, control, reset, setValue } = useForm({
        // defaultValues: {senha: ''},
        resolver: yupResolver(validationSchema),
        mode: "onChange"
    });

    const lojasMapeamento: any = {
        0: {
            nome: "lojaNome1",
            codigo: "lojaCodigo1",
            codigoscanntec: "lojaCodigoScanntech1"
        },
        1: {
            nome: "lojaNome2",
            codigo: "lojaCodigo2",
            codigoscanntec: "lojaCodigoScanntech2"
        },
        2: {
            nome: "lojaNome3",
            codigo: "lojaCodigo3",
            codigoscanntec: "lojaCodigoScanntech3"
        },
        3: {
            nome: "lojaNome4",
            codigo: "lojaCodigo4",
            codigoscanntec: "lojaCodigoScanntech4"
        },
        4: {
            nome: "lojaNome5",
            codigo: "lojaCodigo5",
            codigoscanntec: "lojaCodigoScanntech5"
        },
    };

    const onSubmit = async (data: any) => {
        try {
            const res = await axios.post(API_ENDPOINTS.configurascanntec, data);

            if (res.status === 200) {
                console.log("GRAVOU");
            } else {
                console.log("DEU RUIM ENVIAR PRO BACKEND");
            }
        } catch (error) {
            console.error("Erro ao enviar para o servidor:", error);
        }
    };

    const { usuarioLogado } = useAuth();

    useEffect(() => {
        if (usuarioLogado) {
            reset(usuarioLogado)
        }
    }, [reset, setValue, usuarioLogado])

    return (

        <form onSubmit={handleSubmit(onSubmit)} id='form-principal' >

            <Box sx={{ backgroundColor: VerdeEscuro, borderRadius: 1, boxShadow: '0 4px 7px rgba(0, 0, 0, 0.4)' }}>
                <Typography color='primary' variant='h5' sx={{ padding: 2, paddingLeft: 3, marginBottom: 3, color: 'white', fontSize: 27 }}>Configurações</Typography>
            </Box>

            <Card sx={{ margin: 2 }}>
                <CardContent>
                    <Typography variant='h5' sx={{ borderBottom: 'solid 1px black', marginBottom: 3 }}>Informações operacionais</Typography>
                    <Grid container direction='row' spacing={1.5}>
                        <Grid item xs={12} md={6} lg={6} xl={6}>
                            <TxtFieldForm label='Intervalo de sincronização (min)' name='intervaloSincronizacao' control={control} />
                        </Grid>
                        <Grid item xs={12} md={6} lg={6} xl={6}>
                            <TxtFieldForm label='Hora de fechamento' name='horaFechamento' control={control} type='time' />
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            <Card sx={{ margin: 2 }}>
                <CardContent>
                    <Typography variant='h5' sx={{ borderBottom: 'solid 1px black', marginBottom: 3 }}>URL's</Typography>

                    <Grid container direction='row' spacing={1.5}>
                        <Grid item xs={12} md={12} lg={12} xl={4}>
                            <TxtFieldForm label='URL BASE' name='urlBase' control={control} />
                        </Grid>
                        <Grid item xs={12} md={12} lg={12} xl={4}>
                            <TxtFieldForm label='URL DE RECEBIMENTO' name='urlRecebimento' control={control} />
                        </Grid>
                        <Grid item xs={12} md={12} lg={12} xl={4}>
                            <TxtFieldForm label='URL DE ENVIO' name='urlEnvio' control={control} />
                        </Grid>
                    </Grid>

                </CardContent>
            </Card>

            <Grid item xs={12} md={12} lg={12} xl={12} sx={{ margin: 2 }}>
                <Box style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <ButtonGeneric title={"Salvar"} typeStyle="gravar" form={'form-principal'} />
                </Box>
            </Grid>

        </form>
    );
};