import { createTheme } from '@mui/material';
import { cyan, green, yellow } from '@mui/material/colors';

export const LightTheme = createTheme({
    palette: {
        primary: {
            main: green[800],
            dark: yellow[500],
            light: yellow[500],
            contrastText: '#ffffff',
        },
        secondary: {
            main: cyan[500],
            dark: cyan[400],
            light: cyan[300],
            contrastText: '#ffffff',
        },
        background: {
            paper: '#ffffff',
            default: 'Georgia',
        }
    },
    typography: {
        fontFamily: [
            'font-family: "Josefin Sans", sans-serif;'
        ].join(',')
    }
});