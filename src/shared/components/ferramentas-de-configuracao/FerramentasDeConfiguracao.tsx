import { useState } from 'react';
import { Box, Button, Card, CardActions, CardContent, CircularProgress, TextField, Typography } from '@mui/material';


interface IFerramentasDeConfiguracaoProps {
}
export const FerramentasDeConfiguracao: React.FC<IFerramentasDeConfiguracaoProps> = ({ }) => {

    const [isLoading, setIsLoading] = useState(false);

    const [passwordError, setPasswordError] = useState('');
    const [usuarioError, setusuarioError] = useState('');
    const [password, setPassword] = useState('');
    const [empresa, setempresa] = useState('');
    const [local, setlocal] = useState('');
    const [sincroniza, setsincroniza] = useState('');
    const [fechamento, setfechamento] = useState('');
    const [loja, setloja] = useState('');
    const [user, setuser] = useState('');


    const handleSubmit = (event: any) => {

    }

    return (
        <Box height='100vh' display='flex' alignItems='center' justifyContent='center'>

            <Card sx={{ height: '80vh' } && { width: '172vh' }}>
                <CardContent>
                    <Box display='flex' flexDirection='column' gap={2} width={250}>

                        <TextField
                            fullWidth
                            type='text'
                            label='Empresa'
                            value={empresa}
                            disabled={isLoading}
                            error={!!usuarioError}
                            helperText={usuarioError}
                            onKeyDown={() => setusuarioError('')}
                            onChange={e => setusuarioError(e.target.value)}
                        />

                        <TextField
                            fullWidth
                            type='text'
                            label='Local'
                            value={local}
                            disabled={isLoading}
                            error={!!usuarioError}
                            helperText={usuarioError}
                            onKeyDown={() => setusuarioError('')}
                            onChange={e => setusuarioError(e.target.value)}
                        />
                        <TextField
                            fullWidth
                            type='text'
                            label='Usuário'
                            value={user}
                            disabled={isLoading}
                            error={!!usuarioError}
                            helperText={usuarioError}
                            onKeyDown={() => setusuarioError('')}
                            onChange={e => setusuarioError(e.target.value)}
                        />

                        <TextField
                            fullWidth
                            label='Senha'
                            type='password'
                            value={password}
                            disabled={isLoading}
                            error={!!passwordError}
                            helperText={passwordError}
                            onKeyDown={() => setPasswordError('')}
                            onChange={e => setPassword(e.target.value)}
                        />
                        <TextField
                            fullWidth
                            type='number'
                            label='Intervalo de Sincronização'
                            value={sincroniza}
                            disabled={isLoading}
                            error={!!usuarioError}
                            helperText={usuarioError}
                            onKeyDown={() => setusuarioError('')}
                            onChange={e => setusuarioError(e.target.value)}
                        />

                        <TextField
                            fullWidth
                            type='time'
                            label='Hora do Fechamento'
                            value={fechamento}
                            disabled={isLoading}
                            error={!!usuarioError}
                            helperText={usuarioError}
                            onKeyDown={() => setusuarioError('')}
                            onChange={e => setusuarioError(e.target.value)}
                        />
                        <TextField
                            fullWidth
                            type='text'
                            label='Usuário'
                            value={user}
                            disabled={isLoading}
                            error={!!usuarioError}
                            helperText={usuarioError}
                            onKeyDown={() => setusuarioError('')}
                            onChange={e => setusuarioError(e.target.value)}
                        />


                    </Box>
                </CardContent>
                <CardActions>
                    <Box width='100%' display='flex' justifyContent='center'>

                        <Button
                            variant='contained'
                            disabled={isLoading}
                            onClick={handleSubmit}
                            endIcon={isLoading ? <CircularProgress variant='indeterminate' color='inherit' size={20} /> : undefined}
                        >
                            Salvar
                        </Button>

                    </Box>
                </CardActions>

            </Card>
        </Box>
    );
};