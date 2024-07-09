import { Box, Collapse, Grid, Typography } from '@mui/material';
import axios from 'axios';
import { ButtonGeneric } from '../../shared/components/button/ButtonGeneric';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/imgs/logo copy.png'
import { TextFieldLogin } from '../../shared/components/textfield/TextFieldLogin';
import { API_ENDPOINTS } from '../../config/apiConfig';
import { VerdeEscuro } from '../../assets/colors/CoresPadroes';
import { AlertErro } from '../../shared/components/alerts/AlertErro';
import { useState } from 'react';
import { useDialogSucess } from '../../shared/components/dialogs/DialogProviderSucess';


interface ICadastroProps {
};

export const Cadastro: React.FC<ICadastroProps> = () => {

    const navigate = useNavigate()

    const [msgErroApi, setMsgErroApi] = useState<string>('')
    const showDialogSucess = useDialogSucess()

    const onSubmit = async (data: any) => {
        const objRequest =
        {
            usu_apelido: data.usuario,
            usu_pass: data.senha,
            confirma_senha: data.confirmacaoSenha,
            apikey: data.apiKey
        }
        try {
            const res = await axios.post(API_ENDPOINTS.cadastroscanntech, objRequest);

            if (res.status === 200 || res.status === 201) {
                await showDialogSucess({
                    headerMessage: 'Usuário cadastrado com sucesso!'
                })
                navigate('/login')
            } else {
                console.log("Erro no cadastro");
            }
        } catch (error: any) {
            console.error("Erro ao enviar para o servidor:", error);
            setMsgErroApi(error.response.data.message)
        }

    };

    const validationSchema = Yup.object({
        usuario: Yup.string()
            .required('*Campo obrigatório'),
        senha: Yup.string()
            .required('*Campo obrigatório'),
        confirmacaoSenha: Yup.string()
            .required('*Campo obrigatório')
            .test("igualdadeValidation", function (value: any) {
                const senha = this.parent.senha
                if (senha !== value) {
                    return this.createError({
                        path: "confirmacaoSenha",
                        message: "*Senhas não correspondem",
                    });
                }
                return true
            }),
        apiKey: Yup.string()
            .required('*Campo obrigatório'),
    });


    const { handleSubmit, control } = useForm({
        resolver: yupResolver(validationSchema),
        mode: "onChange"
    });

    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" sx={{ backgroundColor: VerdeEscuro }}>
            <form onSubmit={handleSubmit(onSubmit)}>

                <Grid container direction={'row'} sx={{ backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center' }} spacing={4}>

                    <Grid item xs={12} md={12} lg={12} xl={12}>
                        <Box display="flex" justifyContent="center" >
                            <img src={logo} alt="logo" width={200} height={200} />
                        </Box>
                    </Grid>

                    <Grid item xs={8} md={6} lg={5} xl={4}>

                        <Grid container direction={'row'} spacing={2} columnSpacing={1}>

                            <Grid item xs={12} md={12} lg={12} xl={12} hidden={!msgErroApi}>
                                <Collapse in={msgErroApi.length > 1} mountOnEnter unmountOnExit>
                                    <AlertErro errorApi={msgErroApi} />
                                </Collapse>
                            </Grid>

                            <Grid item xs={12} md={12} lg={12} xl={12}>
                                <TextFieldLogin label='Email Scanntech' name='usuario' control={control} />
                            </Grid>
                            <Grid item xs={6} md={6} lg={6} xl={6}>
                                <TextFieldLogin label='Senha' name='senha' control={control} type='password' />
                            </Grid>
                            <Grid item xs={6} md={6} lg={6} xl={6}>
                                <TextFieldLogin label='Confirmação de senha' name='confirmacaoSenha' control={control} type='password' />
                            </Grid>
                            <Grid item xs={12} md={12} lg={12} xl={12}>
                                <TextFieldLogin label='API KEY' name='apiKey' control={control} />
                            </Grid>
                            <Grid item xs={12} md={12} lg={12} xl={12}>
                                <ButtonGeneric fullWidth title={"CADASTRAR"} typeStyle="login" />
                            </Grid>
                            <Grid item xs={12} md={12} lg={12} xl={12} sx={{ textAlign: 'center' }}>
                                <Typography color={'white'} fontSize={20}>Já tem cadastro?</Typography>
                            </Grid>
                            <Grid item xs={12} md={12} lg={12} xl={12} sx={{ textAlign: 'center' }}>
                                <ButtonGeneric fullWidth title={"FAZER LOGIN"} typeStyle={'liquidar'} type='button' onClick={() => navigate('/login')} />
                            </Grid>
                        </Grid>
                    </Grid>

                </Grid>
            </form>
        </Box>
    );
};


