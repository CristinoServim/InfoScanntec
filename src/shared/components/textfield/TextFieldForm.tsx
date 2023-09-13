import { VisibilityOff, Visibility } from "@mui/icons-material";
import { IconButton, TextField } from "@mui/material";
import { useState } from "react";
import { Controller } from "react-hook-form";
import SearchIcon from '@mui/icons-material/Search';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import { VermelhoPadrao, AzulPadrao, VerdeIntermediario, GoldPadrao, VerdeClaro, VerdeEscuro } from "../../../assets/colors/CoresPadroes";

interface ITxtFieldForm {
    name: string,
    control: any,
    label: string,
    readOnly?: boolean,
    onBlurCustom?: any,
    type?: string,
    casasDecimais?: any,
    textAlign?: 'left' | 'right' | 'center',
    isRequired?: boolean,
    mask?: 'cnpj' | 'cpf' | 'fone' | 'cep' | 'rg',
    isRef?: boolean,
    setSearchHook?: any,
    searchHook?: any,
}

export const TxtFieldForm = (props: ITxtFieldForm) => {

    const { name, control, label, readOnly, onBlurCustom, type, casasDecimais, textAlign, isRequired, mask, isRef, setSearchHook, searchHook } = props;

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    // const onBlurDate = async (value: any, onChange: any, error: any) => {
    //     const inputYear = new Date(value).getFullYear()
    //     const currentYear = new Date().getFullYear()
    //     if (inputYear < 2000 || inputYear > currentYear) {
    //         await showAlertError({
    //             title: undefined,
    //             message: `Insira um ano válido`,
    //         });

    //         onChange(getData())
    //         error = {
    //             message: 'Insira um ano válido',
    //             ref: { name: name },
    //             type: "validationEmpty"
    //         }
    //     }
    // }

    // const applyMask = (value: any) => {
    //     if (mask === 'cpf') {
    //         return formatCPFMask(value)
    //     }
    //     else if (mask === 'cnpj') {
    //         return formatCNPJMask(value)
    //     }
    //     else if (mask === 'fone') {
    //         return formatPhone(value)
    //     }
    //     else if (mask === 'cep') {
    //         return formatCEPMask(value)
    //     }
    //     else if (mask === 'rg') {
    //         return formatRGandIE(value)
    //     }
    //     else {
    //         return value
    //     }
    // }

    function tratarValue(value:any){
        if(value){
            if(type){
            }else{
                return value;
            }
        }else{
            return ""
        }
    }

    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) =>
                <>
                    <TextField
                        error={error ? true : false}
                        focused={type === 'date' || type === 'time' || type === 'password' ? true : this}
                        inputProps={{
                            style: { textAlign: textAlign ? textAlign : 'left' },
                            // endadornment: type === 'password' ?
                            //     <IconButton
                            //         aria-label="toggle password visibility"
                            //         onClick={handleClickShowPassword}
                            //         onMouseDown={handleMouseDownPassword}
                            //         edge="end"> {showPassword ? <VisibilityOff /> : <Visibility />}
                            //     </IconButton>
                            //     : undefined,
                        }}
                        InputProps={{
                            style: { textAlign: textAlign || 'left', fontSize: '0.95rem'}, 
                        }}
                        InputLabelProps={{ style: { color: error ? VermelhoPadrao : isRef ? AzulPadrao : VerdeIntermediario, fontSize: '1.15rem'} }}
                        value={type ? tratarValue(value) : value || ""}
                        type={type || 'text'}
                        label={label}
                        onChange={(e : any) => {
                            let value = e.target.value

                            // if (mask) {
                            //     value = applyMask(value)
                            // }

                            // else if (props.type === 'decimal') {
                            //     if (casasDecimais) {
                            //         value = decimalDigitsMask(value, casasDecimais)
                            //     }
                            //     else {
                            //         value = decimalDigitsMask(value, 2)
                            //     }
                            // }
                            onChange(value)
                        }}
                        // onBlur={props.type === 'date' ? (e: any) => onBlurDate(e.target.value, onChange, error) : (onBlurCustom || this)}
                        variant="outlined"
                        disabled={readOnly}
                        sx = {
                            { 
                                width: '100%',
                                "& .MuiInputBase-root.Mui-disabled": {
                                    "& > fieldset": {
                                        borderColor: isRequired ? GoldPadrao : isRef ? AzulPadrao : this
                                    },
                                },
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: error ? VermelhoPadrao : isRequired ? GoldPadrao : isRef ? AzulPadrao : VerdeIntermediario,
                                        borderWidth: isRequired ? 2 : 1,
                                        fontSize: '1.12rem',
                                    },
                        
                                    "& .MuiInputBase-input.Mui-disabled": {
                                        WebkitTextFillColor: "#5a5a5a",
                                    },
                        
                                    '&:hover fieldset': {
                                        borderColor: error ? VermelhoPadrao : isRequired ? GoldPadrao : VerdeClaro,
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: error ? VermelhoPadrao : isRequired ? GoldPadrao : type === 'date' ? VerdeEscuro : VerdeClaro,
                                        borderWidth: isRequired ? 3 : (type === 'date' ? 1 : 2),
                                    },
                                },
                            }
                        }
                        
                        />

                    {error ? (
                        <div className="error" style={{ color: VermelhoPadrao, fontWeight: 'bold', fontSize: '0.8em' }}>{error.message}</div>
                    ) : null}
                </>
            }
        />
    )
}

