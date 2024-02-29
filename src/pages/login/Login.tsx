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


interface ILoginProps {
};

export const Login: React.FC<ILoginProps> = ({ }) => {

    const navigate = useNavigate()

    const { gravarUsuario } = useAuth();
    const { setDrawerOptions, openDrawer } = useDrawerContext();


    const onSubmit = async (data: any) => {
        try {
            const res = await axios.post("http://192.168.253.94:5001/v1-ibra/loginscanntec", data);

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
                ]);
                openDrawer()
            } else {
                console.log("Erro no login");
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
    });

    const { handleSubmit, control } = useForm({
        resolver: yupResolver(validationSchema),
        mode: "onChange"
    });

    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" sx={{ backgroundColor: 'green' }}>
            <form onSubmit={handleSubmit(onSubmit)}>

                <Grid container direction={'row'} sx={{ backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center' }} spacing={4}>

                    <Grid item xs={12} md={12} lg={12} xl={12}>
                        <Box display="flex" justifyContent="center" >
                            <img src={logo} alt="logo" width={200} height={200} />
                        </Box>
                    </Grid>


                    <Grid item xs={8} md={6} lg={5} xl={4}>

                        <Grid container direction={'row'} spacing={2}>

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


