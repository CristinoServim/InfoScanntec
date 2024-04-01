import { Box, Collapse, Grid, Typography } from '@mui/material';
import axios from 'axios';
import { ButtonGeneric } from '../../shared/components/button/ButtonGeneric';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from '../../shared/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/imgs/logo copy.png'
import { useDrawerContext } from '../../shared/contexts';
import { TextFieldLogin } from '../../shared/components/textfield/TextFieldLogin';
import { VerdeEscuro } from '../../assets/colors/CoresPadroes';
import { API_ENDPOINTS } from '../../config/apiConfig';
import { useState } from 'react';
import { AlertErro } from '../../shared/components/alerts/AlertErro';


interface ILoginProps {
};

export const Login: React.FC<ILoginProps> = ({ }) => {

    const navigate = useNavigate()

    const { gravarUsuario } = useAuth();
    const { setDrawerOptions, openDrawer } = useDrawerContext();

    const [msgErroApi, setMsgErroApi] = useState<string>('')


    const onSubmit = async (data: any) => {
        try {
            const objRequest =
            {
                usu_apelido: data.usuario,
                usu_pass: data.senha
            }
            const res = await axios.post(API_ENDPOINTS.loginscanntec, objRequest);
           if (res.status === 200) {
                gravarUsuario(res.data)
                navigate('/home')
                setDrawerOptions([
                    {
                        icon: 'home',
                        path: '/home',
                        label: 'Home',
                    },
                    {
                        icon: 'settings',
                        path: '/configuracao',
                        label: 'Configurações',
                    },
                    {
                        icon: 'send',
                        path: '/envios',
                        label: 'Envios',
                    },
                ]);
                openDrawer()
            } else {
                console.log("Erro no login");
            }
        } catch (error: any) {
            console.error("Erro no login: " + error.response.data.message);
            setMsgErroApi(error.response.data.message)
        }

    };
    const validationSchema = Yup.object({
        usuario: Yup.string()
            .required('*Campo obrigatório'),

        senha: Yup.string()
            .required('*Campo obrigatório')
            .min(6, '*Minimo 6 caracteres')
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

                        <Grid container direction={'row'} spacing={2}>

                            <Grid item xs={12} md={12} lg={12} xl={12} hidden={!msgErroApi}>
                                <Collapse in={msgErroApi.length > 1} mountOnEnter unmountOnExit>
                                    <AlertErro errorApi={msgErroApi} />
                                </Collapse>
                            </Grid>

                            <Grid item xs={12} md={12} lg={12} xl={12}>
                                <TextFieldLogin label='Usuário' name='usuario' control={control} />
                            </Grid>
                            <Grid item xs={12} md={12} lg={12} xl={12}>
                                <TextFieldLogin label='Senha' name='senha' control={control} type='password' />
                            </Grid>

                            <Grid item xs={12} md={12} lg={12} xl={12}>
                                <ButtonGeneric fullWidth title={"Entrar"} typeStyle="login" />
                            </Grid>
                            <Grid item xs={12} md={12} lg={12} xl={12} sx={{ textAlign: 'center' }}>
                                <Typography color={'white'} fontSize={20}>Não tem cadastro?</Typography>
                            </Grid>
                            <Grid item xs={12} md={12} lg={12} xl={12} sx={{ textAlign: 'center' }}>
                                <ButtonGeneric fullWidth title={"FAZER CADASTRO"} typeStyle={'liquidar'} type='button' onClick={() => navigate('/cadastro')} />
                            </Grid>
                        </Grid>
                    </Grid>

                </Grid>
            </form>
        </Box>
    );
};


