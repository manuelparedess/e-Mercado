import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 768,
            lg: 1024,
            xl: 1400,
        },
    },
    palette: {
        background: {
            default: 'rgb(227, 227, 227)',
        },
        primary: {
            main: '#1f8946', // color verde
            contrastText: '#fff',
        },
    },
    components: {
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#1f8946',
                    },
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    '&.Mui-focused': {
                        color: '#1f8946',
                    },
                },
            },
        },
        MuiSelect: {
            styleOverrides: {
                root: {
                    '& .MuiSelect-select': {
                        color: '#1f8946',
                    },
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                },
            },
        },
    },
});
export default theme;