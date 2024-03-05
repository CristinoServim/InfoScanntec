import { TextField } from "@mui/material";
import { VermelhoPadrao, AzulPadrao, VerdeIntermediario, GoldPadrao, VerdeClaro, VerdeEscuro } from "../../../assets/colors/CoresPadroes";

interface ITextFieldDate {
    label: string,
    readOnly?: boolean,
    textAlign?: 'left' | 'right' | 'center',
    isRequired?: boolean,
    value?: string | number,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    error?: boolean,
    helperText?: string,
}

export const TextFieldDate = ({
    label,
    readOnly,
    textAlign,
    isRequired,
    value,
    onChange,
    error,
    helperText,
}: ITextFieldDate) => {
    return (
        <>
            <TextField
                error={error}
                focused
                inputProps={{
                    style: { textAlign: textAlign ? textAlign : 'left' },
                }}
                InputProps={{
                    style: { textAlign: textAlign || 'left', fontSize: '0.95rem' },
                }}
                InputLabelProps={{ style: { color: error ? VermelhoPadrao : VerdeIntermediario, fontSize: '1.15rem' } }}
                value={value || ""}
                type="date"
                label={label}
                onChange={onChange}
                variant="outlined"
                disabled={readOnly}
                sx={{
                    width: '100%',
                    "& .MuiInputBase-root.Mui-disabled": {
                        "& > fieldset": {
                            borderColor: isRequired ? GoldPadrao : VerdeIntermediario
                        },
                    },
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: error ? VermelhoPadrao : isRequired ? GoldPadrao : VerdeIntermediario,
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
                            borderColor: error ? VermelhoPadrao : isRequired ? GoldPadrao : VerdeEscuro,
                            borderWidth: isRequired ? 3 : 2,
                        },
                    },
                }}
                helperText={helperText}
            />
        </>
    );
};
