import { useState } from 'react';
import { Box, Button, Card, CardActions, CardContent, CircularProgress, Grid, Icon, List, ListItemButton, ListItemIcon, ListItemText, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';

import { saveAs } from 'file-saver';
import axios from 'axios';
import { useMatch, useNavigate, useResolvedPath } from 'react-router-dom';
import { useLoginContext } from '../../contexts';
import { ButtonGeneric } from '../button/ButtonGeneric';

import { useForm } from 'react-hook-form';

import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { TxtFieldForm } from '../textfield/TextFieldForm';
import { useAuth } from '../../contexts/AuthContext';


interface IListItemLinkProps {
    to: string;
    icon: any;
    label: string;
    onClick: (() => void) | undefined;
}

interface ILoginProps {
};


export const Login: React.FC<ILoginProps> = ({ }) => {
    const theme = useTheme();

    const { usuarioLogado, gravarUsuario, limparUsuario } = useAuth();

    console.log(usuarioLogado)

    const onSubmit = async (data: any) => {
        const lojasAtivas = [];

        try {
            data = { "usuario": "cristino" }
            const res = await axios.post("http://localhost:5001/v1-ibra/loginscanntec", data);

            if (res.status === 200) {
                console.log("LOGOU", res.data);
                gravarUsuario(res.data)
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
        <form onSubmit={handleSubmit(onSubmit)} id='form-principal'>
            <Grid container direction={'row'}>
                <Grid item xs={12} md={12} lg={12} xl={12} sx={{}}>

                    <Box height='100vh' display='flex' alignItems='center' justifyContent='center'>
                        <Card sx={{ width: '400px' }}>
                            <CardContent>
                                <Grid container direction='row' spacing={2}>
                                    <Grid item xs={12} md={12} lg={12} xl={12}>
                                        <Typography color='primary' variant='h5' align='center'>Login</Typography>
                                    </Grid>
                                    <Grid item xs={12} md={12} lg={12} xl={12}>
                                        <TxtFieldForm label='Usuário' name='usuario' control={control} />
                                    </Grid>
                                    <Grid item xs={12} md={12} lg={12} xl={12}>
                                        <TxtFieldForm label='Senha' name='senha' control={control} type='password' />
                                    </Grid>


                                    <Grid item xs={12} md={12} lg={12} xl={12}>
                                        <ButtonGeneric fullWidth title={"Entrar"} typeStyle="login" form={'form-principal'} />
                                    </Grid>
                                </Grid>
                            </CardContent>


                        </Card>
                    </Box>

                </Grid>

            </Grid>

        </form>
    );
};