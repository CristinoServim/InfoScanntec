import { useEffect, useState } from 'react';
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { TxtFieldForm } from '../../shared/components/textfield/TextFieldForm';
import { ButtonGeneric } from '../../shared/components/button/ButtonGeneric';
import { yupResolver } from '@hookform/resolvers/yup'; // Certifique-se de importar desta forma
import axios from 'axios';
import { useAuth } from '../../shared/contexts/AuthContext';


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
    lojaCodigoScanntech1: number,

    lojaNome2: string | null,
    lojaCodigo2: number,
    lojaCodigoScanntech2: number,

    lojaNome3: string | null,
    lojaCodigo3: number,
    lojaCodigoScanntech3: number,

    lojaNome4: string | null,
    lojaCodigo4: number,
    lojaCodigoScanntech4: number,

    lojaNome5: string | null,
    lojaCodigo5: number,
    lojaCodigoScanntech5: number,

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

    const onSubmit = async (data: any) => {
        const lojasAtivas = [];

        for (let i = 1; i <= 5; i++) {
            const lojaNome = data[`lojaNome${i}`];
            const lojaCodigo = data[`lojaCodigo${i}`];
            const lojaCodigoScanntech = data[`lojaCodigoScanntech${i}`];

            if (lojaCodigo !== undefined && lojaCodigoScanntech !== undefined) {
                lojasAtivas.push({
                    lojaNome,
                    lojaCodigo,
                    lojaCodigoScanntech
                });
                delete data[`lojaCodigo${i}`]
                delete data[`lojaCodigoScanntech${i}`]
                delete data[`lojaNome${i}`]

            }
            else {
                console.log(`Loja ${i} não foi inserida em lojas ativas, pois um dos códigos não foi informado!`)
            }
        }

        data.lojasAtivas = lojasAtivas;

        console.log(data);

        try {
            const res = await axios.post("http://localhost:5001/v1-ibra/configurascanntec", data);

            if (res.status === 200) {
                console.log("MANDOU PRO BACKEND");
            } else {
                console.log("DEU RUIM ENVIAR PRO BACKEND");
            }
        } catch (error) {
            console.error("Erro ao enviar para o servidor:", error);
        }
    };


    const excluirLoja = (index: number) => {
        console.log(index)
        if (index === 0) {
            console.log("Exclusão falhou, pois é obrigatório o envio de pelomenos uma loja!")
        }
        else {
            setLojas((lojas) => lojas.filter((_, i) => i !== index))
        }
    }

    const { usuarioLogado } = useAuth();
    const usuario = JSON.stringify(usuarioLogado, null, 2)

    console.log("USUARIO : " + usuario)

    useEffect(() => {
        if (usuarioLogado !== null) {
            // setValue('empresa', usuarioLogado.empresa)
            // setValue('local', usuarioLogado.local)
            reset(usuarioLogado)
        }
    }, [])

    return (

        <Grid container direction={'row'}>
            <form onSubmit={handleSubmit(onSubmit)} id='form-principal'>


                <Grid item xs={12} md={12} lg={12} xl={12} sx={{}}>


                    <Typography color='primary' variant='h4' sx={{ padding: 3, marginBottom: 3, }}>Configuração</Typography>

                    <Card sx={{ margin: 2 }}>
                        <CardContent>
                            <Typography variant='h5' sx={{ borderBottom: 'solid 1px black', marginBottom: 3 }}>Informações gerais</Typography>
                            <Grid container direction='row' spacing={1.5}>
                                <Grid item xs={12} md={6} lg={6} xl={6}>
                                    <TxtFieldForm label='Empresa' name='empresa' control={control} />
                                </Grid>
                                <Grid item xs={12} md={6} lg={6} xl={6}>
                                    <TxtFieldForm label='Local' name='local' control={control} />
                                </Grid>
                                <Grid item xs={12} md={6} lg={6} xl={6}>
                                    <TxtFieldForm label='Usuário' name='usuario' control={control} />
                                </Grid>
                                <Grid item xs={12} md={6} lg={6} xl={6}>
                                    <TxtFieldForm label='Senha' name='senha' control={control} type='password' />
                                </Grid>
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
                            <Typography variant='h5' sx={{ borderBottom: 'solid 1px black', marginBottom: 3 }}>Lojas ativas</Typography>
                            {lojas.map((loja, index) => (
                                <Box key={index} sx={{ marginBottom: 3 }}>
                                    <Grid container direction='row' spacing={1.5}>
                                        <Grid item xs={12} md={4} lg={3.4} xl={3.4}>
                                            <TxtFieldForm label='Nome' name={`lojaNome${index + 1}`} control={control} />
                                        </Grid>
                                        <Grid item xs={12} md={4} lg={3.3} xl={3.3}>
                                            <TxtFieldForm label='Código' name={`lojaCodigo${index + 1}`} control={control} />
                                        </Grid>
                                        <Grid item xs={12} md={4} lg={3.3} xl={3.3}>
                                            <TxtFieldForm label='Código Scanntech' name={`lojaCodigoScanntech${index + 1}`} control={control} />
                                        </Grid>
                                        <Grid item xs={12} md={12} lg={2} xl={2} sx={{ marginTop: '3px' }}>
                                            <ButtonGeneric title={'Excluir'} typeStyle='excluir' fullWidth type='button' onClick={() => excluirLoja(index)} />
                                        </Grid>
                                    </Grid>
                                </Box>
                            ))}

                            {lojas.length < 5 &&
                                <ButtonGeneric title={'Adicionar loja'} typeStyle='adicionar' onClick={(novaLoja: Loja) => setLojas([...lojas, novaLoja])} type='button' fullWidth />
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


                <Grid item xs={12} md={12} lg={12} xl={12} sx={{ margin: 2 }}>
                    <Box style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <ButtonGeneric title={"Cadastrar"} typeStyle="gravar" form={'form-principal'} />
                    </Box>
                </Grid>
            </form>

        </Grid>
    );
};