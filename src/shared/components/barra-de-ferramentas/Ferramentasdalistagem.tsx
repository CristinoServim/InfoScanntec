import { Box, Button, Icon, Paper, TextField, useTheme } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

interface IFerramentasDaListagensProps {
    textoDaBusca?: string;
    mostrarInputBusca?: boolean;
    aoMudarTextoDeBusca?: (novoTexto: string) => void;
    textoBotaoNovo?: string;
    mostrarBotaoNovo?: boolean;
    aoClicarEmNovo?: () => void;
}
export const FerramentasDaListagens: React.FC<IFerramentasDaListagensProps> = ({
    textoDaBusca = '',
    aoMudarTextoDeBusca,
    mostrarInputBusca = false,
    aoClicarEmNovo,
    textoBotaoNovo = 'Novo',
    mostrarBotaoNovo = true,
}) => {
    const theme = useTheme();

    return (
        <Box
            gap={1}
            marginX={1}
            padding={1}
            paddingX={2}
            display="flex"
            alignItems="center"
            height={theme.spacing(5)}
            component={Paper}
        >
            {mostrarInputBusca && (
                <TextField
                    size="small"
                    value={textoDaBusca}
                    placeholder='Pesquisar...'
                    onChange={(e) => aoMudarTextoDeBusca?.(e.target.value)}
                />
            )}

            <Box flex={1} display="flex" justifyContent="end">
                {mostrarBotaoNovo && (
                    <Button
                        color='primary'
                        disableElevation
                        variant='contained'
                        onClick={aoClicarEmNovo}
                        endIcon={<AddCircleOutlineIcon />}
                    >{textoBotaoNovo}</Button>
                )}
            </Box>
        </Box>
    );
};