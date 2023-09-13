import { useState } from 'react';
import { Box, Button, Card, CardActions, CardContent, CircularProgress, TextField, Typography } from '@mui/material';

import { saveAs } from 'file-saver';


interface ILoginProps {
}
export const Login: React.FC<ILoginProps> = ({ }) => {

    const [isLoading, setIsLoading] = useState(false);

    const [passwordError, setPasswordError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [password, setPassword] = useState('');
    const [user, setEmail] = useState('');
    const apiUrl = 'cristino';
    const apiKey = '123456'


    const handleSubmit = (event: any) => {

    }

    return (
        <Box height='100vh' display='flex' alignItems='center' justifyContent='center'>

            <Card sx={{ height: '70vh' }}>
                <CardContent>
                    <Box display='flex' flexDirection='column' gap={2} width={250}>
                        <Typography color='primary' variant='h5' align='center'>Login</Typography>

                        <TextField
                            fullWidth
                            type='text'
                            label='Usuário'
                            value={user}
                            disabled={isLoading}
                            error={!!emailError}
                            helperText={emailError}
                            onKeyDown={() => setEmailError('')}
                            onChange={e => setEmail(e.target.value)}
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
                            Entrar
                        </Button>

                    </Box>
                </CardActions>
                <CardActions>
                    <Box width='100%' display='flex' justifyContent='center'>

                        <Button
                            variant='contained'
                            disabled={isLoading}
                            onClick={handleSubmit}
                            endIcon={isLoading ? <CircularProgress variant='indeterminate' color='inherit' size={20} /> : undefined}
                        >
                            Registrar
                        </Button>

                    </Box>
                </CardActions>
            </Card>
        </Box>
    );
};