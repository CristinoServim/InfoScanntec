import { useState } from 'react';
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { TxtFieldForm } from '../textfield/TextFieldForm';
import { ButtonGeneric } from '../button/ButtonGeneric';
import { yupResolver } from '@hookform/resolvers/yup'; // Certifique-se de importar desta forma
import axios from 'axios';


interface IFerramentasDeConfiguracaoForm {
    empresa: number,
    local: number,
    usuario: string,
    senha: string,
    intervaloSincronizacao: number,
    horaFechamento: string,

    urlBase: string,
    urlRecebimento: string,
    urlEnvio: string,

    lojaNome1: string | null,
    lojaCodigo1: number,

    lojaNome2: string | null,
    lojaCodigo2: number,

    lojaNome3: string | null,
    lojaCodigo3: number,

    lojaNome4: string | null,
    lojaCodigo4: number,

    lojaNome5: string | null,
    lojaCodigo5: number,

    lojasAtivas: any
}

interface Loja {
    nome: string,
    codigo: number
}


export const FerramentasDeConfiguracao = () => {

    const [error, setError] = useState<boolean>(false)

    const [lojas, setLojas] = useState<Loja[]>([{ nome: '', codigo: 0 }])

    const validationSchema = Yup.object({

        empresa: Yup.number()
            .typeError('O campo deve ser um número')
            .required('*Campo obrigatório')
            .positive('O campo deve ser um número positivo')
            .integer('O campo deve ser um número inteiro'),

        local: Yup.number()
            .typeError('O campo deve ser um número')
            .required('*Campo obrigatório')
            .positive('O campo deve ser um número positivo')
            .integer('O campo deve ser um número inteiro'),

        usuario: Yup.string()
            .required('*Campo obrigatório'),

        senha: Yup.string()
            .required('*Campo obrigatório'),

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

        lojaNome2: Yup.string()
            .nullable(),
        lojaCodigo2: Yup.number()
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

        lojaNome4: Yup.string()
            .nullable(),
        lojaCodigo4: Yup.number()
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

        urlBase: Yup.string()
            .required("*Campo obrigatório"),
        urlRecebimento: Yup.string()
            .required("*Campo obrigatório"),
        urlEnvio: Yup.string()
            .required("*Campo obrigatório")
    });


    const { handleSubmit, control } = useForm({
        // defaultValues: {senha: ''},
        resolver: yupResolver(validationSchema),
        mode: "onChange"
    });

    const onSubmit = async (data: any) => {
        const lojaCodigos = [
            data.lojaCodigo1,
            data.lojaCodigo2,
            data.lojaCodigo3,
            data.lojaCodigo4,
            data.lojaCodigo5
        ].filter((codigo) => codigo !== undefined);

        data.lojasAtivas = lojaCodigos;

        console.log(data)

        const res = await axios.post("https://192.168.253.94:5001/v1-ibra/configurascanntec", data)

        if(res.status === 200) {
            console.log("MANDOU PRO BACKEND")
        }
        else{
            console.log("DEU RUIM ENVIAR PRO BACKEND")
        }
    }

    return (
        <Grid container direction={'row'}>
            <form onSubmit={handleSubmit(onSubmit)} id='form-principal'>

                <Grid item xs={12} md={12} lg={12} xl={12}>

                    <Grid item xs={12} md={12} lg={12} xl={12}>

                        {/* <Collapse in={erroBackEnd}>
                        <Box sx={{ margin: 6, marginBottom: 0 }}>
                            <AlertErrorApi errorApi={msgErroBackEnd} />
                        </Box>
                        </Collapse> */}

                        <Card sx={{ margin: 2 }}>
                            <CardContent>
                                <Typography variant='h5' sx={{ borderBottom: 'solid 1px black', marginBottom: 3 }}>Informações gerais</Typography>
                                <Grid container direction='row' spacing={1.5}>
                                    <Grid item xs={12} md={2} lg={2} xl={2}>
                                        <TxtFieldForm label='Empresa' name='empresa' control={control} />
                                    </Grid>
                                    <Grid item xs={12} md={10} lg={10} xl={10}>
                                        <TxtFieldForm label='Local' name='local' control={control} />
                                    </Grid>
                                    <Grid item xs={12} md={10} lg={10} xl={10}>
                                        <TxtFieldForm label='Usuário' name='usuario' control={control} />
                                    </Grid>
                                    <Grid item xs={12} md={10} lg={10} xl={10}>
                                        <TxtFieldForm label='Senha' name='senha' control={control} type='password' />
                                    </Grid>
                                    <Grid item xs={12} md={10} lg={10} xl={10}>
                                        <TxtFieldForm label='Intervalo de sincronização (min)' name='intervaloSincronizacao' control={control} />
                                    </Grid>
                                    <Grid item xs={12} md={10} lg={10} xl={10}>
                                        <TxtFieldForm label='Hora de fechamento' name='horaFechamento' control={control} type='time' />
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>

                        <Card sx={{ margin: 2 }}>
                            <CardContent>
                                <Typography variant='h5' sx={{ borderBottom: 'solid 1px black', marginBottom: 3 }}>Lojas ativas</Typography>
                                {lojas.map((loja, index) => (
                                    <Box key={index} sx={{ marginBottom: 3 }}>
                                        <Grid container direction='row' spacing={1.5}>
                                            <Grid item xs={12} md={4.75} lg={4.75} xl={4.75}>
                                                <TxtFieldForm label='Nome' name={`lojaNome${index + 1}`} control={control} />
                                            </Grid>
                                            <Grid item xs={12} md={4.75} lg={4.75} xl={4.75}>
                                                <TxtFieldForm label='Código' name={`lojaCodigo${index + 1}`} control={control} />
                                            </Grid>
                                            <Grid item xs={12} md={2.5} lg={2.5} xl={2.5} sx={{ marginTop: '3px' }}>
                                                <ButtonGeneric title={'Excluir'} typeStyle='excluir' fullWidth type='button' onClick={() => setLojas((lojas) => lojas.filter((_, i) => i !== index))} />
                                            </Grid>
                                        </Grid>
                                    </Box>
                                ))}

                                {lojas.length < 5 &&
                                    <ButtonGeneric title={'Adicionar loja'} typeStyle='adicionar' onClick={(novaLoja: Loja) => setLojas([...lojas, novaLoja])} type='button' />
                                }
                            </CardContent>
                        </Card>

                        <Card sx={{ margin: 2 }}>
                            <CardContent>
                                <Typography variant='h5' sx={{ borderBottom: 'solid 1px black', marginBottom: 3 }}>URL's</Typography>

                                <Grid container direction='row' spacing={1.5}>
                                    <Grid item xs={12} md={12} lg={12} xl={12}>
                                        <TxtFieldForm label='URL BASE' name='urlBase' control={control} />
                                    </Grid>
                                    <Grid item xs={12} md={12} lg={12} xl={12}>
                                        <TxtFieldForm label='URL DE RECEBIMENTO' name='urlRecebimento' control={control} />
                                    </Grid>
                                    <Grid item xs={12} md={12} lg={12} xl={12}>
                                        <TxtFieldForm label='URL DE ENVIO' name='urlEnvio' control={control} />
                                    </Grid>
                                </Grid>

                            </CardContent>
                        </Card>
                    </Grid>


                </Grid>
                <Grid item xs={12} md={12} lg={12} xl={12} sx={{ margin: 2 }}>
                    <Box style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <ButtonGeneric title={"Cadastrar"} typeStyle="gravar" form={'form-principal'} />
                    </Box>
                </Grid>
            </form>

        </Grid>
    );
};