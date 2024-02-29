import { VerdeEscuro } from '../../assets/colors/CoresPadroes';
import LOGO_HOME from '../../assets/imgs/LOGO_HOME.jpg'
import { Grid, Typography } from "@mui/material";
import { useAuth } from '../../shared/contexts/AuthContext';

export function Home() {
    const { usuarioLogado } = useAuth();

      return (
            <Grid container direction={'row'} 
            justifyContent="center"
            alignItems="center"
            spacing={10}
            >
  
                  <Grid item xs={12} md={12} lg={12} xl={12} sx={{ textAlign: 'center', marginTop: 10}}>
                        <img src={LOGO_HOME} alt="img_modulos_home" style={{width: '500px', height: '400px'}}/>
                  </Grid>
                  <Grid item xs={12} md={12} lg={12} xl={12} sx={{ textAlign: 'center', alignSelf: 'flex-end' }}>
                        <Typography variant="h5">Seja bem-vindo novamente</Typography>
                        <Typography variant="h6" color={VerdeEscuro} sx={{ fontSize: '28px' }}>{usuarioLogado?.usuario}</Typography>
                  </Grid>
            </Grid>
      )
}