import { Button, styled } from "@mui/material";

interface IButtonStyled {
    fullWidth: any,
    backgroundColor: any,
    fontColor: string,
    hoverBackgroundColor: any,
    hoverColor?: any,
    hoverUnderlineText?: boolean,
    isTelaMobile: any
}


export const BaseButton = styled(Button, { 
    
    shouldForwardProp: (prop) => 
        prop !== 'fullWidth' && 
        prop !== 'backgroundColor' && 
        prop !== 'fontColor' && 
        prop !== 'hoverBackgroundColor' && 
        prop !== 'hoverColor' && 
        prop !== 'isTelaMobile' &&
        prop !== 'hoverUnderlineText'})<IButtonStyled>(({ fullWidth, backgroundColor, fontColor, hoverBackgroundColor, hoverColor, hoverUnderlineText, isTelaMobile}) => {

    return {
      width: fullWidth ? '100%' : 'auto',
      backgroundColor: backgroundColor,
      color: fontColor,
      fontWeight: 'bold', 
      height: isTelaMobile ? '42px' : '50px',
      fontFamily: 'Poppins, sans-serif',
      letterSpacing: 1,
      fontSize: isTelaMobile ? '14px' : '17px',
      padding: 20,
      border: 'none',
      ':hover': {
          backgroundColor: hoverBackgroundColor,
          border: 'none',
          color: hoverColor,
          textDecoration: hoverUnderlineText ? 'underline' : 'none',
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
    };
});