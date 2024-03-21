import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { Dialog, DialogContent, Typography, useMediaQuery, Box, Grid } from '@mui/material';
import ConfirmedGif from '../../../assets/imgs/ConfirmedGif.gif'
import { VerdeEscuro } from '../../../assets/colors/CoresPadroes';
import { IDialogSucessOptions } from './IDialog';

type ShowDialogSuccesHandler = (options: IDialogSucessOptions) => Promise<void>;

const DialogContextSucess = createContext<ShowDialogSuccesHandler>(() => {
  console.error('Component is not wrapped with a DialogProviderSucess.');
  return Promise.reject();
});

const DialogProviderSucess: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isTelaMobile = useMediaQuery('(max-width:600px)');
  const isTelaPequena = useMediaQuery('(max-width:920px)');

  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<IDialogSucessOptions>({ headerMessage: '' });
  const time = options.time || 3000
  const [resolvePromise, setResolvePromise] = useState<(() => void) | null>(null);

  const handleClose = useCallback(() => {
    setOpen(false);
    if (resolvePromise) {
      resolvePromise();
    }
  }, [resolvePromise]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (open) {
      timer = setTimeout(handleClose, time);
    }
    return () => clearTimeout(timer);
  }, [open, time, handleClose]);

  const showSucessDialog: ShowDialogSuccesHandler = useCallback((options) => {
    return new Promise<void>((resolve) => {
      setOptions(options);
      setOpen(true);
      setResolvePromise(() => resolve);
    });
  }, []);

  return (
    <>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth={false}>
        <DialogContent style={{ overflow: "hidden", width: '100%', backgroundColor: VerdeEscuro }}>
          <Grid container>
            <Grid item xs={12} md={12} lg={12} xl={12}>
              <Box sx={{ textAlign: 'center' }}>
                <img alt="ConfirmedGif" src={ConfirmedGif} style={{ width: isTelaMobile ? '110px' : isTelaPequena ? '140px' : '170px', height: isTelaMobile ? '110px' : isTelaPequena ? '140px' : '170px' }} />
              </Box>
            </Grid>
            <Grid item xs={12} md={12} lg={12} xl={12}>
              <Box sx={{ textAlign: 'center', marginTop: 3, marginBottom: 4 }}>
                <Typography variant='h6' sx={{ fontWeight: 'bold', fontFamily: 'Poppins, sans-serif' }} fontSize={isTelaMobile ? '18px' : isTelaPequena ? '23px' : '27px'} color={'white'}>{options.headerMessage}</Typography>
                {options.bodyMessage &&
                  <Typography variant='h6' fontSize={isTelaMobile ? '14px' : isTelaPequena ? '19px' : '23px'} sx={{ fontWeight: 'bold', marginTop: 1 }} fontFamily='Poppins, sans-serif' color={'white'}>{options.bodyMessage}</Typography>
                }
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
      <DialogContextSucess.Provider value={showSucessDialog}>
        {children}
      </DialogContextSucess.Provider>
    </>
  );
};

export const useDialogSucess = () => {
  return useContext(DialogContextSucess);
};

export default DialogProviderSucess;
