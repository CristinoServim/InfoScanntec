import SaveIcon from '@mui/icons-material/Save';
import styled from "@emotion/styled";
import { Button } from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import FilterListIcon from '@mui/icons-material/FilterList';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import RestoreIcon from '@mui/icons-material/Restore';
import DeleteIcon from '@mui/icons-material/Delete';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import AddIcon from '@mui/icons-material/Add';
import { VerdeEscuro, GoldPadrao, AmareloIntermediario, AzulPadrao, VermelhoPadrao, AmareloClaro, VerdeClaro, VerdeIntermediario } from '../../../assets/colors/CoresPadroes';

interface IButtonGeneric {
    title: any
    type?: 'submit' | 'button',
    onClick?: any,
    typeStyle: string
    fullWidth?: boolean,
    height?: any,
    disabled?: boolean
    form?: any,
}

export const ButtonGeneric = (props: IButtonGeneric) => {

    const { title, type, onClick, typeStyle, fullWidth, height, disabled, form } = props;

    switch (typeStyle) {
        case "gravar":
            return (
                <ButtonStyled
                    backgroundcolor={VerdeEscuro}
                    backgroundcolorhover={'green'}
                    colorprop={'white'}
                    fullWidth={fullWidth}
                    height={height}
                    disabled={disabled || this}
                    disableRipple
                    form={form || null}
                    variant='outlined'
                    type={type ? type : 'submit'}
                    endIcon={<SaveIcon sx={{ marginBottom: '2px' }} />}
                    onClick={onClick}>
                    {title}
                </ButtonStyled>
            )
        case "filtrar":
            return (
                <ButtonStyled
                    backgroundcolor={GoldPadrao}
                    backgroundcolorhover={AmareloIntermediario}
                    colorprop={'#00664c'}
                    fullWidth={fullWidth}
                    height={height}
                    disabled={disabled || this}
                    disableRipple
                    form={form || null}
                    variant='outlined'
                    type={type ? type : 'submit'}
                    endIcon={<FilterListIcon sx={{ marginBottom: '2px' }} />}
                    onClick={onClick}>
                    {title}
                </ButtonStyled>
            )
        case "liquidar":
            return (
                <ButtonStyled
                    backgroundcolor={AzulPadrao}
                    backgroundcolorhover={'#0054a7'}
                    colorprop={'white'}
                    fullWidth={fullWidth}
                    height={height}
                    disabled={disabled || this}
                    disableRipple
                    form={form || null}
                    variant='outlined'
                    type={type ? type : 'submit'}
                    onClick={onClick}>
                    {title}
                </ButtonStyled>
            )
        case "estornar":
            return (
                <ButtonStyled
                    backgroundcolor={GoldPadrao}
                    backgroundcolorhover={AmareloIntermediario}
                    colorprop={'#002022'}
                    fullWidth={fullWidth}
                    height={height}
                    disabled={disabled || this}
                    disableRipple
                    form={form || null}
                    variant='outlined'
                    type={type ? type : 'submit'}
                    endIcon={<RestoreIcon sx={{ marginBottom: '2px' }} />}
                    onClick={onClick}>
                    {title}
                </ButtonStyled>
            )
        case "excluir":
            return (
                <ButtonStyled
                    backgroundcolor={VermelhoPadrao}
                    backgroundcolorhover={'#ec0000'}
                    colorprop={'white'}
                    fullWidth={fullWidth}
                    height={height}
                    disabled={disabled || this}
                    disableRipple
                    form={form || null}
                    variant='outlined'
                    type={type ? type : 'submit'}
                    endIcon={<DeleteIcon sx={{ marginBottom: '2px' }} />}
                    onClick={onClick}>
                    {title}
                </ButtonStyled>
            )
        case "adicionar":
            return (
                <ButtonStyled
                    backgroundcolor={AzulPadrao}
                    backgroundcolorhover={'blue'}
                    colorprop={'white'}
                    fullWidth={fullWidth}
                    height={height}
                    disabled={disabled || this}
                    disableRipple
                    form={form || null}
                    variant='outlined'
                    type={type ? type : 'submit'}
                    endIcon={<AddIcon sx={{ marginBottom: '2px' }} />}
                    onClick={onClick}>
                    {title}
                </ButtonStyled>
            )
        case 'login':
            return (
                <ButtonStyled
                    backgroundcolor={GoldPadrao}
                    backgroundcolorhover={'yellow'}
                    colorprop={'green'}
                    fullWidth={fullWidth}
                    height={height}
                    disabled={disabled || this}
                    disableRipple
                    form={form || null}
                    variant='outlined'
                    type={type ? type : 'submit'}
                    endIcon={<LoginIcon sx={{ marginBottom: '2px' }} />}
                    onClick={onClick}>
                    {title}
                </ButtonStyled>
            )

        case "inverter_horizontal":
            return (
                <ButtonStyled
                    backgroundcolor={GoldPadrao}
                    backgroundcolorhover={AmareloIntermediario}
                    colorprop={'#002022'}
                    fullWidth={fullWidth}
                    height={height}
                    disabled={disabled || this}
                    disableRipple
                    form={form || null}
                    variant='outlined'
                    type={type ? type : 'submit'}
                    endIcon={<SwapHorizIcon sx={{ marginBottom: '2px' }} />}
                    onClick={onClick}>
                    {title}
                </ButtonStyled>
            )
        case "inverter_vertical":
            return (
                <ButtonStyled
                    backgroundcolor={GoldPadrao}
                    backgroundcolorhover={AmareloIntermediario}
                    colorprop={'#002022'}
                    fullWidth={fullWidth}
                    height={height}
                    disabled={disabled || this}
                    disableRipple
                    form={form || null}
                    variant='outlined'
                    type={type ? type : 'submit'}
                    endIcon={<SwapVertIcon sx={{ marginBottom: '2px' }} />}
                    onClick={onClick}>
                    {title}
                </ButtonStyled>
            )
        case 'cancelar_dialog_resolve':
            return (
                <ButtonStyled
                    backgroundcolor={'white'}
                    backgroundcolorhover={AmareloClaro}
                    colorprop={AzulPadrao}
                    fullWidth={fullWidth}
                    height={height}
                    disabled={disabled || this}
                    disableRipple
                    form={form || null}
                    variant='outlined'
                    type={type ? type : 'submit'}
                    onClick={onClick}>
                    {title}
                </ButtonStyled>
            )
        case 'confirmar_dialog_resolve':
            return (
                <ButtonStyled
                    backgroundcolor={GoldPadrao}
                    backgroundcolorhover={'white'}
                    colorprop={AzulPadrao}
                    fullWidth={fullWidth}
                    height={height}
                    disabled={disabled || this}
                    disableRipple
                    form={form || null}
                    variant='outlined'
                    type={type ? type : 'submit'}
                    onClick={onClick}>
                    {title}
                </ButtonStyled>
            )

        case 'dialog_error':
            return (
                <ButtonStyled
                    backgroundcolor={'white'}
                    backgroundcolorhover={AmareloClaro}
                    colorprop={VermelhoPadrao}
                    fullWidth={fullWidth}
                    height={height}
                    disabled={disabled || this}
                    disableRipple
                    form={form || null}
                    variant='outlined'
                    type={type ? type : 'submit'}
                    onClick={onClick}>
                    {title}
                </ButtonStyled>
            )
        case 'dialog_alert_confirm':
            return (
                <ButtonStyled
                    backgroundcolor={VerdeEscuro}
                    backgroundcolorhover={'white'}
                    colorhover={VerdeEscuro}
                    colorprop={'white'}
                    fullWidth={fullWidth}
                    height={height}
                    disabled={disabled || this}
                    disableRipple
                    form={form || null}
                    variant='outlined'
                    type={type ? type : 'submit'}
                    onClick={onClick}>
                    {title}
                </ButtonStyled>
            )
        default:
            return (
                <ButtonStyled
                    backgroundcolor={VerdeEscuro}
                    backgroundcolorhover={'#33964d'}
                    colorprop={'white'}
                    fullWidth={fullWidth}
                    height={height}
                    disabled={disabled || this}
                    disableRipple
                    form={form || null}
                    variant='outlined'
                    type={type ? type : 'submit'}
                    onClick={onClick}>
                    {title}
                </ButtonStyled>
            )

    }
}

interface IButtonStyled {
    fullWidth: any,
    backgroundcolor: any,
    colorprop: any,
    height: any,
    backgroundcolorhover: any,
    colorhover?: any,
    component?: React.ElementType
}

export const ButtonStyled = styled(Button)(({ fullWidth, backgroundcolor, colorprop, height, backgroundcolorhover, colorhover }: IButtonStyled) => (
    {
        width: fullWidth ? '100%' : 'auto',
        backgroundColor: backgroundcolor,
        color: colorprop,
        height: height || '50px',
        letterSpacing: 1,
        fontSize: '17px',
        padding: 20,
        border: 'none',
        ':hover': {
            backgroundColor: backgroundcolorhover,
            border: 'none',
            color: colorhover
        },
        ':focus': {
            outline: 'none !important;;'
        },
        '&.Mui-disabled': {
            opacity: 0.7,
            pointerEvents: 'none',
            backgroundColor: '#969696',
            color: 'white',
            border: 'none'
        },
    }));