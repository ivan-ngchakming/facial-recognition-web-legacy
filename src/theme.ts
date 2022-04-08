import { createTheme } from '@mui/material/styles';

const colorScheme = {
  'True Blue': '#0466c8',
  'USAFA Blue': '#0353a4',
  'Dark Cornflower Blue': '#023e7d',
  'Oxford Blue': '#002855',
  'Oxford Blue 2': '#001845',
  'Oxford Blue 3': '#001233',
  Independence: '#33415c',
  'Black Coral': '#5c677d',
  'Roman Silver': '#7d8597',
  Manatee: '#979dac',
};

export const theme = createTheme({
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      'Oxygen',
      'Ubuntu',
      'Cantarell',
      '"Fira Sans"',
      '"Droid Sans"',
      '"Helvetica Neue"',
      'sans-serif',
    ].join(','),
  },
  palette: {
    primary: {
      main: colorScheme['Manatee'], // #5c677d
    },
    secondary: {
      main: colorScheme['Independence'], // #33415c
    },
    info: {
      main: colorScheme['USAFA Blue'], // #0353a4
    },
  },
});
