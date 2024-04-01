import { Alert, AlertTitle, Typography } from "@mui/material"
import { VermelhoPadrao } from "../../../assets/colors/CoresPadroes";

interface IAlertErrorProps {
    title?: string | null,
    errorApi: any,
    alertStyle?: "login" | undefined;
}

export const AlertErro = (props: IAlertErrorProps) => {

    const { errorApi, alertStyle, title } = props;

    if (alertStyle) {
        switch (alertStyle) {
            case "login":
                return (
                    <Alert sx={{ marginBottom: 0, border: `solid 2px ${VermelhoPadrao}`, fontFamily: 'Poppins, sans-serif' }} severity="error">
                        <Typography sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 'bold', paddingBottom: 0.1, }}>{errorApi} <br /></Typography>
                    </Alert>
                )
        }
    }

    return (
        <Alert
            sx={{
                fontFamily: 'Poppins, sans-serif',
                backgroundColor: `${VermelhoPadrao}`,
                "& .MuiAlert-icon": {
                    color: 'white',
                    paddingTop: '10px',
                }
            }}
            severity="error"
        >
            <AlertTitle color="white" sx={{ fontWeight: 'bold' }}>{title ? title : ""}</AlertTitle>

            {errorApi instanceof Array ? errorApi.map((errorMsg: any, index: any) =>
                <Typography key={index} sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 'bold' }}>* {errorMsg} <br /></Typography>
            )
                :
                <Typography sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 'bold', color: 'white' }}>* {errorApi} <br /></Typography>
            }
        </Alert>
    )
}