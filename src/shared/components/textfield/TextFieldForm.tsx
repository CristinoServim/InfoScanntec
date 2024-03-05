import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";
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

    const { name, control, label, readOnly, type, textAlign, isRequired, isRef } = props


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
                        }}
                        InputProps={{
                            style: { textAlign: textAlign || 'left', fontSize: '0.95rem' },
                        }}
                        InputLabelProps={{ style: { color: error ? VermelhoPadrao : isRef ? AzulPadrao : VerdeIntermediario, fontSize: '1.15rem' } }}
                        value={value || ""}
                        type={type || 'text'}
                        label={label}
                        onChange={(e: any) => {
                            let value = e.target.value

                            onChange(value)
                        }}
                        variant="outlined"
                        disabled={readOnly}
                        sx={
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

