import { Box, Grid, Typography } from '@mui/material';
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
import { API_ENDPOINTS } from '../../config/apiConfig';
import { VerdeEscuro } from '../../assets/colors/CoresPadroes';


interface ICadastroProps {
};

export const Cadastro: React.FC<ICadastroProps> = () => {

    const navigate = useNavigate()

    const { gravarUsuario } = useAuth();
    const { setDrawerOptions, toggleDrawerOpen } = useDrawerContext();


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

            if (res.status === 200) {
                console.log(res.data)
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
                ]);
                toggleDrawerOpen()
            } else {
                console.log("Erro no cadastro");
            }
        } catch (error) {
            console.error("Erro ao enviar para o servidor:", error);
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
                if(senha !== value){
                    return this.createError({
                        path: "confirmacaoSenha",
                        message: "*Senhas não correspondem",
                    });
                }
                return true
            }),
        apiKey: Yup.string()
            .required('*Campo obrigatório'),

        // razaoSocial: Yup.string()
        //     .required('*Campo obrigatório'),
        // numeroEmpresa: Yup.number()
        //     .typeError('O campo deve ser um número')
        //     .required('*Campo obrigatório')
        //     .positive('O campo deve ser um número positivo')
        //     .integer('O campo deve ser um número inteiro'),

        // local: Yup.number()
        //     .typeError('O campo deve ser um número')
        //     .required('*Campo obrigatório')
        //     .positive('O campo deve ser um número positivo')
        //     .integer('O campo deve ser um número inteiro'),
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
                            <Grid item xs={12} md={12} lg={12} xl={12}>
                                <TextFieldLogin label='Usuário' name='usuario' control={control} />
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


