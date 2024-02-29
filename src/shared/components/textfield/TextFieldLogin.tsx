import { TextField, Typography } from "@mui/material";
import { Controller } from "react-hook-form";
import { GoldPadrao } from "../../../assets/colors/CoresPadroes";

interface ITxtFieldForm {
    name: string,
    control: any,
    label: string,
    type?: string,
    textAlign?: 'left' | 'right' | 'center',
}

export const TextFieldLogin = (props: ITxtFieldForm) => {

    const { name, control, label, type, textAlign } = props;

    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) =>
                <>
                    <TextField
                        error={error ? true : false}
                        InputProps={{
                            style: { fontSize: '0.95rem', color: 'white' },
                        }}
                        InputLabelProps={{ style: { color: 'white', fontSize: '1.15rem' } }}
                        value={value || ""}
                        type={type || 'text'}
                        label={label}
                        onChange={(e: any) => {
                            let value = e.target.value
                            onChange(value)
                        }}
                        variant="outlined"
                        sx={
                            {
                                width: '100%',
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: 'white',
                                        borderWidth: 1,
                                        fontSize: '1.12rem',
                                    },

                                    '&:hover fieldset': {
                                        borderColor: 'white',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: GoldPadrao,
                                        borderWidth: 2,
                                    },
                                },
                            }
                        }

                    />

                    {error && <Typography sx={{ color: 'white', fontWeight: 'bold', fontSize: '0.8em' }}>{error.message}</Typography>}
                </>
            }
        />
    )
}

