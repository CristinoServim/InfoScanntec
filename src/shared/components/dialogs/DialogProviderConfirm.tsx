import {
    Box,
    Dialog,
    DialogActions,
    DialogContent,
    Grid,
    useMediaQuery,
  } from '@mui/material';
  import { createContext, useContext, useState } from 'react';
  import { Typography } from '@mui/material';
import { AzulPadrao } from '../../../assets/colors/CoresPadroes';
import { ButtonGeneric } from '../button/ButtonGeneric';
import { IDialogsOptions, IDialogPromise } from './IDialog';
  
  
  type ShowDialogConfirmHandler = (options: IDialogsOptions) => Promise<boolean>;
  
  const DialogContextConfirm = createContext<ShowDialogConfirmHandler>(() => {
    throw new Error('Component is not wrapped with a DialogProviderConfirm.');
  });
  
  const DialogProviderConfirm: React.FC<{ children: React.ReactNode }> = ({
    children,
  }) => {
  
    const isTelaMobile = useMediaQuery('(max-width:600px)');
    const isTelaPequena = useMediaQuery('(max-width:920px)');
  
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState<IDialogsOptions>({ headerMessage: '' });
  
    const [promise, setPromise] = useState<IDialogPromise>();
  
    const showDialog: ShowDialogConfirmHandler = (options) => {
      return new Promise<boolean>((resolve, reject) => {
        setPromise({ resolve, reject });
        setOptions(options);
        setOpen(true);
      });
    };
  
    const handleConfirm = () => {
      setOpen(false);
      promise?.resolve(true);
      setPromise(undefined);
    };
  
    const handleCancel = () => {
      setOpen(false);
      promise?.resolve(false);
      setPromise(undefined);
    };
  
    return (
      <>
        <Dialog open={open} onClose={handleCancel} fullWidth maxWidth={false}>
          <DialogContent style={{ overflow: "hidden", width: '100%', backgroundColor: AzulPadrao }}>
            <Grid container>
              {/* <Grid item xs={12} md={12} lg={12} xl={12}>
                <Box sx={{ textAlign: 'center' }}>
                  <img alt="AlertGifAmarelo" src={AlertGifAmarelo} style={{ width: isTelaMobile ? '110px' : isTelaPequena ? '140px' : '170px', height: isTelaMobile ? '110px' : isTelaPequena ? '140px' : '170px' }} />
                </Box>
              </Grid> */}
              <Grid item xs={12} md={12} lg={12} xl={12}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant='h6' sx={{ fontWeight: 'bold', fontFamily: 'Poppins, sans-serif' }} fontSize={isTelaMobile ? '18px' : isTelaPequena ? '23px' : '27px'} color={'white'}>{options.headerMessage}</Typography>
                  {options.bodyMessage &&
                    <Typography variant='h6' fontSize={isTelaMobile ? '14px' : isTelaPequena ? '19px' : '23px'} sx={{ fontWeight: 'bold', marginTop: 1 }} fontFamily='Poppins, sans-serif' color={'white'}>{options.bodyMessage}</Typography>
                  }
                </Box>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions style={{ justifyContent: "center", backgroundColor: AzulPadrao }}>
  
            {isTelaMobile ?
  
              <Grid container direction={'row'} spacing={2} sx={{ paddingRight: 2, paddingLeft: 2 }}>
                <Grid item xs={12} md={12} lg={12} xl={12}>
                  <ButtonGeneric title={"Confirmar"} type='button' onClick={handleConfirm} typeStyle='dialog_alert_confirm' fullWidth />
                </Grid>
                <Grid item xs={12} md={12} lg={12} xl={12} sx={{ marginBottom: 1 }}>
                  <ButtonGeneric title={"Cancelar"} type='button' onClick={handleCancel} typeStyle='dialog_cancelar' fullWidth />
                </Grid>
              </Grid>
  
              :
  
              <Box sx={{ marginBottom: 2 }}>
  
                <Box sx={{ marginRight: 1, display: 'inline-block' }}>
                  <ButtonGeneric title={"Cancelar"} type='button' onClick={handleCancel} typeStyle='dialog_cancelar' />
                </Box>
  
                <Box sx={{ marginLeft: 1, display: 'inline-block' }}>
                  <ButtonGeneric title={"Confirmar"} type='button' onClick={handleConfirm} typeStyle='dialog_alert_confirm' />
                </Box>
  
              </Box>
            }
  
          </DialogActions>
        </Dialog>
        <DialogContextConfirm.Provider value={showDialog}>
          {children}
        </DialogContextConfirm.Provider>
      </>
    );
  };
  
  export const useDialogConfirm = () => {
    return useContext(DialogContextConfirm);
  };
  
  export default DialogProviderConfirm;
  