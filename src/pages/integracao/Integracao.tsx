import { Box, Card, CardContent, Collapse, Grid, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { TxtFieldForm } from '../../shared/components/textfield/TextFieldForm';
import { ButtonGeneric } from '../../shared/components/button/ButtonGeneric';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { useAuth } from '../../shared/contexts/AuthContext';
import { useState, useEffect } from 'react';
import { VerdeEscuro } from '../../assets/colors/CoresPadroes';
import { API_ENDPOINTS } from '../../config/apiConfig';
import { AlertErro } from '../../shared/components/alerts/AlertErro';
import { useDialogSucess } from '../../shared/components/dialogs/DialogProviderSucess';
import { formatCNPJ } from '../../functions/formats/formatCNPJ';
import { formatRemove } from '../../functions/formats/formatRemove';


export const Integracao = () => {

    const [msgErroApi, setMsgErroApi] = useState<string>('')
    const { usuarioLogado } = useAuth();
    const showDialogSucess = useDialogSucess()


    const validationSchema = Yup.object({
        iap_codempresaapi: Yup.number()
            .required('*Campo obrigatório'),
        loj_cnpj: Yup.string()
            .required('*Campo obrigatório')
            .min(18, 'CNPJ inválido'),
        iap_usuario: Yup.string()
            .required('*Campo obrigatório'),
        iap_senha: Yup.string()
            .required('*Campo obrigatório'),

        iap_local: Yup.number()
            .required('*Campo obrigatório'),
        iap_intervalosinc: Yup.number()
            .required('*Campo obrigatório'),
        iap_horafechamento: Yup.string()
            .required('*Campo obrigatório'),

        iap_urlbase: Yup.string()
            .required("*Campo obrigatório"),
        iap_urlpromocao: Yup.string()
            .required("*Campo obrigatório"),
        iap_urlenvio: Yup.string()
            .required("*Campo obrigatório")
    });


    const { handleSubmit, control, reset, setValue } = useForm({
        // defaultValues: {senha: ''},
        resolver: yupResolver(validationSchema),
        mode: "onBlur"
    });


    const onSubmit = async (data: any) => {
        console.log(data.iap_horafechamento)
        try {
            const objRequest = 
            {
                urlEnvio: data.iap_urlenvio,   
                urlRecebPromo: data.iap_urlpromocao,
                urlBase: data.iap_urlbase,  
                local: data.iap_local,  
                horaFechamento: data.iap_horafechamento,
                intervaloSincronizacao: data.iap_intervalosinc,
                senha: data.iap_senha,
                usuario: data.iap_usuario,
                empresa: data.iap_codempresaapi,
                lojCnpj: formatRemove(data.loj_cnpj),
            }
            const res = await axios.post(API_ENDPOINTS.configurascanntec, objRequest, {
                headers: {
                  'Authorization': `Bearer ${usuarioLogado?.token}`
                }
            });           
            if (res.status === 200 || res.status === 201) {
                await showDialogSucess({
                    headerMessage: 'Informações salvas com sucesso!'
                })
            } else {
                console.log("DEU RUIM");
            }
        } catch (error: any) {
            console.error("Erro:", error);
            console.log(error.response.data.message)
            setMsgErroApi(error.response.data.message)
        }
    };

    useEffect(() => {
        if (usuarioLogado?.iap_codempresaapi) {
            reset({
                ...usuarioLogado,
                loj_cnpj: formatCNPJ(usuarioLogado.loj_cnpj)
            })
        }
    }, [reset, setValue, usuarioLogado])

    return (

        <form onSubmit={handleSubmit(onSubmit)} id='form-principal' >

            <Box sx={{ backgroundColor: VerdeEscuro, borderRadius: 1, boxShadow: '0 4px 7px rgba(0, 0, 0, 0.4)' }}>
                <Typography color='primary' variant='h5' sx={{ padding: 2, paddingLeft: 3, marginBottom: 3, color: 'white', fontSize: 27 }}>Integração</Typography>
            </Box>

            <Collapse in={msgErroApi.length > 1} mountOnEnter unmountOnExit>
                <AlertErro errorApi={msgErroApi} />
            </Collapse>

            <Card 
                sx={{ 
                    margin: 2,
                    boxShadow: '0 1px 8px 0 #9999, 0 2px 2px 0 #9999',
                }}
            >
                <CardContent>
                    <Typography variant='h5' sx={{ borderBottom: 'solid 1px black', marginBottom: 3 }}>Scanntech</Typography>

                    <Grid container direction='row' spacing={1.5}>
                        <Grid item xs={12} md={6} lg={6} xl={1.5}>
                            <TxtFieldForm label='Num. Empresa' name='iap_codempresaapi' control={control} type='number' />
                        </Grid>
                        <Grid item xs={12} md={6} lg={6} xl={2}>
                            <TxtFieldForm label='CNPJ' name='loj_cnpj' control={control} mask='cnpj'/>
                        </Grid>
                        <Grid item xs={12} md={6} lg={6} xl={4.5}>
                            <TxtFieldForm label='Usuario' name='iap_usuario' control={control} />
                        </Grid>
                        <Grid item xs={12} md={6} lg={6} xl={4}>
                            <TxtFieldForm label='Senha' name='iap_senha' control={control} type='password' />
                        </Grid>
                    </Grid>

                </CardContent>
            </Card>

            <Card
                sx={{ 
                    margin: 2,
                    boxShadow: '0 1px 8px 0 #9999, 0 2px 2px 0 #9999',
                }}
            >
                <CardContent>
                    <Typography variant='h5' sx={{ borderBottom: 'solid 1px black', marginBottom: 3 }}>Operacional</Typography>
                    <Grid container direction='row' spacing={1.5}>
                        <Grid item xs={12} md={4} lg={4} xl={4}>
                            <TxtFieldForm label='Local' name='iap_local' control={control} type='number' />
                        </Grid>
                        <Grid item xs={12} md={4} lg={4} xl={4}>
                            <TxtFieldForm label='Sincronização (min)' name='iap_intervalosinc' control={control} type='number' />
                        </Grid>
                        <Grid item xs={12} md={4} lg={4} xl={4}>
                            <TxtFieldForm label='Fechamento' name='iap_horafechamento' control={control} type='time' />
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            <Card
                sx={{ 
                    margin: 2,
                    boxShadow: '0 1px 8px 0 #9999, 0 2px 2px 0 #9999',
                }}
            >
                <CardContent>
                    <Typography variant='h5' sx={{ borderBottom: 'solid 1px black', marginBottom: 3 }}>URL's</Typography>

                    <Grid container direction='row' spacing={1.5}>
                        <Grid item xs={12} md={12} lg={12} xl={4}>
                            <TxtFieldForm label='Base' name='iap_urlbase' control={control} />
                        </Grid>
                        <Grid item xs={12} md={12} lg={12} xl={4}>
                            <TxtFieldForm label='Promoção' name='iap_urlpromocao' control={control} />
                        </Grid>
                        <Grid item xs={12} md={12} lg={12} xl={4}>
                            <TxtFieldForm label='Envio' name='iap_urlenvio' control={control} />
                        </Grid>
                    </Grid>

                </CardContent>
            </Card>

            <Grid item xs={12} md={12} lg={12} xl={12} sx={{ margin: 2 }}>
                <Box style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <ButtonGeneric title={"Salvar"} typeStyle="gravar" form={'form-principal'}/>
                </Box>
            </Grid>

        </form>
    );
};