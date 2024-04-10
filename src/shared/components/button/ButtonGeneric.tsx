import SaveIcon from '@mui/icons-material/Save';
import LoginIcon from '@mui/icons-material/Login';
import FilterListIcon from '@mui/icons-material/FilterList';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import RestoreIcon from '@mui/icons-material/Restore';
import DeleteIcon from '@mui/icons-material/Delete';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import SendIcon from '@mui/icons-material/Send';
import { useMediaQuery } from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import { BaseButton } from './BaseButton';
import { VerdeEscuro, AzulPadrao, GoldPadrao, AmareloIntermediario, VermelhoPadrao, AmareloClaro, VerdeClaro } from '../../../assets/colors/CoresPadroes';
interface IButtonGeneric {
    title: any
    type?: 'submit' | 'button',
    onClick?: any,
    typeStyle?: "financeiro" | "gravar" | "filtrar" | "liquidar" | "estornar" | "excluir" | "login" | "inverter_horizontal" | "inverter_vertical" | "cancelar_dialog_resolve" | "confirmar_dialog_resolve" | "dialog_alert_confirm" | "dialog_error" | 'send' | 'linkButton' | "dialog_cancelar" | 'authorization';
    fullWidth?: boolean,
    disabled?: boolean
    form?: any,
    backgroundColor?:string
}

export const ButtonGeneric = (props: IButtonGeneric) => {

    const { title, type, onClick, typeStyle, fullWidth, disabled, form, backgroundColor } = props;

    const isTelaMobile = useMediaQuery('(max-width:600px)');

    switch (typeStyle) {
        case "financeiro": 
            return(
                <BaseButton
                    isTelaMobile={isTelaMobile}
                    backgroundColor={VerdeEscuro}
                    hoverBackgroundColor={'#33964d'}
                    fontColor={'white'}
                    fullWidth={fullWidth}
                    disabled={disabled ? true : false}
                    disableRipple
                    form={form || null}
                    variant='outlined'
                    type={type ? type : 'submit'}
                    endIcon={<RequestQuoteIcon sx={{ marginBottom: '2px' }} />}
                    onClick={onClick}>
                    {title}
                </BaseButton>
            )
        case "gravar":
            return (
                <BaseButton
                    isTelaMobile={isTelaMobile}
                    backgroundColor={VerdeEscuro}
                    hoverBackgroundColor={'#33964d'}
                    fontColor={'white'}
                    fullWidth={fullWidth}
                    disabled={disabled ? true : false}
                    disableRipple
                    form={form || null}
                    variant='outlined'
                    type={type ? type : 'submit'}
                    endIcon={<SaveIcon sx={{ marginBottom: '2px' }} />}
                    onClick={onClick}>
                    {title}
                </BaseButton>
            )
        case "filtrar":
            return (
                <BaseButton
                    isTelaMobile={isTelaMobile}
                    backgroundColor={AzulPadrao}
                    hoverBackgroundColor={AzulPadrao}
                    fontColor={'white'}
                    fullWidth={fullWidth}
                    disabled={disabled ? true : false}
                    disableRipple
                    form={form || null}
                    variant='outlined'
                    type={type ? type : 'submit'}
                    endIcon={<FilterListIcon sx={{ marginBottom: '2px' }} />}
                    onClick={onClick}>
                    {title}
                </BaseButton>
            )
        case "liquidar":
            return (
                <BaseButton
                    isTelaMobile={isTelaMobile}
                    backgroundColor={AzulPadrao}
                    hoverBackgroundColor={'#0054a7'}
                    fontColor={'white'}
                    fullWidth={fullWidth}
                    disabled={disabled ? true : false}
                    disableRipple
                    form={form || null}
                    variant='outlined'
                    type={type ? type : 'submit'}
                    endIcon={<FileDownloadIcon sx={{ marginBottom: '2px' }} />}
                    onClick={onClick}>
                    {title}
                </BaseButton>
            )
        case "estornar":
            return (
                <BaseButton
                    isTelaMobile={isTelaMobile}
                    backgroundColor={GoldPadrao}
                    hoverBackgroundColor={AmareloIntermediario}
                    fontColor={'#002022'}
                    fullWidth={fullWidth}
                    disabled={disabled ? true : false}
                    disableRipple
                    form={form || null}
                    variant='outlined'
                    type={type ? type : 'submit'}
                    endIcon={<RestoreIcon sx={{ marginBottom: '2px' }} />}
                    onClick={onClick}>
                    {title}
                </BaseButton>
            )
        case "excluir":
            return (
                <BaseButton
                    isTelaMobile={isTelaMobile}
                    backgroundColor={VermelhoPadrao}
                    hoverBackgroundColor={'#ec0000'}
                    fontColor={'white'}
                    fullWidth={fullWidth}
                    disabled={disabled ? true : false}
                    disableRipple
                    form={form || null}
                    variant='outlined'
                    type={type ? type : 'submit'}
                    endIcon={<DeleteIcon sx={{ marginBottom: '2px' }} />}
                    onClick={onClick}>
                    {title}
                </BaseButton>
            )
        case "login":
            return (
                <BaseButton
                    isTelaMobile={isTelaMobile}
                    backgroundColor={GoldPadrao}
                    hoverBackgroundColor={AmareloIntermediario}
                    fontColor={VerdeEscuro}
                    fullWidth={fullWidth}
                    disabled={disabled ? true : false}
                    disableRipple
                    form={form || null}
                    variant='outlined'
                    type={type ? type : 'submit'}
                    endIcon={<LoginIcon sx={{ marginBottom: '2px' }} />}
                    onClick={onClick}>
                    {title}
                </BaseButton>
            )
        case "send":
            return (
                <BaseButton
                    isTelaMobile={isTelaMobile}
                    backgroundColor={AzulPadrao}
                    hoverBackgroundColor={'white'}
                    fontColor={'white'}
                    hoverColor={AzulPadrao}
                    fullWidth={fullWidth}
                    disabled={disabled ? true : false}
                    disableRipple
                    form={form || null}
                    variant='outlined'
                    type={type ? type : 'submit'}
                    endIcon={<SendIcon sx={{ marginBottom: '2px' }} />}
                    onClick={onClick}>
                    {title}
                </BaseButton>
            )

        case "inverter_horizontal":
            return (
                <BaseButton
                    isTelaMobile={isTelaMobile}
                    backgroundColor={GoldPadrao}
                    hoverBackgroundColor={AmareloIntermediario}
                    fontColor={'#002022'}
                    fullWidth={fullWidth}
                    disabled={disabled ? true : false}
                    disableRipple
                    form={form || null}
                    variant='outlined'
                    type={type ? type : 'submit'}
                    endIcon={<SwapHorizIcon sx={{ marginBottom: '2px' }} />}
                    onClick={onClick}>
                    {title}
                </BaseButton>
            )
        case "inverter_vertical":
            return (
                <BaseButton
                    isTelaMobile={isTelaMobile}
                    backgroundColor={GoldPadrao}
                    hoverBackgroundColor={AmareloIntermediario}
                    fontColor={'#002022'}
                    fullWidth={fullWidth}
                    disabled={disabled ? true : false}
                    disableRipple
                    form={form || null}
                    variant='outlined'
                    type={type ? type : 'submit'}
                    endIcon={<SwapVertIcon sx={{ marginBottom: '2px' }} />}
                    onClick={onClick}>
                    {title}
                </BaseButton>
            )
        case "cancelar_dialog_resolve":
            return (
                <BaseButton
                    isTelaMobile={isTelaMobile}
                    backgroundColor={'white'}
                    hoverBackgroundColor={AmareloClaro}
                    fontColor={AzulPadrao}
                    fullWidth={fullWidth}
                    disabled={disabled ? true : false}
                    disableRipple
                    form={form || null}
                    variant='outlined'
                    type={type ? type : 'submit'}
                    onClick={onClick}>
                    {title}
                </BaseButton>
            )
        case "confirmar_dialog_resolve":
            return (
                <BaseButton
                    isTelaMobile={isTelaMobile}
                    backgroundColor={GoldPadrao}
                    hoverBackgroundColor={'white'}
                    fontColor={AzulPadrao}
                    fullWidth={fullWidth}
                    disabled={disabled ? true : false}
                    disableRipple
                    form={form || null}
                    variant='outlined'
                    type={type ? type : 'submit'}
                    onClick={onClick}>
                    {title}
                </BaseButton>
            )
        case "dialog_cancelar":
            return (
                <BaseButton
                    isTelaMobile={isTelaMobile}
                    backgroundColor={VermelhoPadrao}
                    hoverBackgroundColor={'#ec0000'}
                    fontColor={'white'}
                    fullWidth={fullWidth}
                    disabled={disabled ? true : false}
                    disableRipple
                    form={form || null}
                    variant='outlined'
                    type={type ? type : 'submit'}
                    onClick={onClick}>
                    {title}
                </BaseButton>
            )

        case "dialog_error":
            return (
                <BaseButton
                    isTelaMobile={isTelaMobile}
                    backgroundColor={'white'}
                    hoverBackgroundColor={AmareloClaro}
                    fontColor={VermelhoPadrao}
                    fullWidth={fullWidth}
                    disabled={disabled ? true : false}
                    disableRipple
                    form={form || null}
                    variant='outlined'
                    type={type ? type : 'submit'}
                    onClick={onClick}>
                    {title}
                </BaseButton>
            )
        case "dialog_alert_confirm":
            return (
                <BaseButton
                    isTelaMobile={isTelaMobile}
                    backgroundColor={VerdeEscuro}
                    hoverBackgroundColor={VerdeClaro}
                    hoverColor={'white'}
                    fontColor={'white'}
                    fullWidth={fullWidth}
                    disabled={disabled ? true : false}
                    disableRipple
                    form={form || null}
                    variant='outlined'
                    type={type ? type : 'submit'}
                    onClick={onClick}>
                    {title}
                </BaseButton>
            )
        case "linkButton":
            return (
                <BaseButton
                    isTelaMobile={isTelaMobile}
                    backgroundColor={'transparent'}
                    hoverBackgroundColor={'transparent'}
                    hoverColor={'white'}
                    hoverUnderlineText
                    fontColor={'white'}
                    fullWidth={fullWidth}
                    disabled={disabled ? true : false}
                    disableRipple
                    form={form || null}
                    variant='outlined'
                    type={type ? type : 'submit'}
                    onClick={onClick}>
                    {title}
                </BaseButton>
            )
        case "authorization":
            return (
                <BaseButton
                    isTelaMobile={isTelaMobile}
                    backgroundColor={GoldPadrao}
                    hoverBackgroundColor={AmareloIntermediario}
                    fontColor={VerdeEscuro}
                    fullWidth={fullWidth}
                    disabled={disabled ? true : false}
                    disableRipple
                    form={form || null}
                    variant='outlined'
                    type={type ? type : 'submit'}
                    endIcon={<LockOpenIcon sx={{ marginBottom: '2px' }} />}
                    onClick={onClick}>
                    {title}
                </BaseButton>
            )
        default:
            return (
                <BaseButton
                    isTelaMobile={isTelaMobile}
                    backgroundColor={backgroundColor}
                    hoverBackgroundColor={'#33964d'}
                    fontColor={'white'}
                    fullWidth={fullWidth}
                    disabled={disabled ? true : false}
                    disableRipple
                    form={form || null}
                    variant='outlined'
                    type={type ? type : 'submit'}
                    onClick={onClick}>
                    {title}
                </BaseButton>
            )

    }
}
