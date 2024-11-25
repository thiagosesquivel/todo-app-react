// src/theme.ts
import { createTheme } from '@mui/material/styles';

const paletteColors = {
  primary: {
    100: '#CFE8FF',
    200: '#9FCFFF',
    300: '#6FB7FF',
    400: '#3F9EFF',
    500: '#0050A9', // Cor principal
    600: '#00488F',
    700: '#003F76',
    800: '#00365D',
    900: '#002B47',
  },
  success: {
    100: '#CFF6D6',
    200: '#9FECAF',
    300: '#6FE288',
    400: '#3FD861',
    500: '#00CC26', // Cor principal
    600: '#00B622',
    700: '#009F1E',
    800: '#008919',
    900: '#007215',
  },
  info: {
    100: '#CFF6FF',
    200: '#9FEFFF',
    300: '#6FE9FF',
    400: '#3FE2FF',
    500: '#0DCAF0', // Cor principal
    600: '#0CB5D6',
    700: '#0A9FBB',
    800: '#098AA1',
    900: '#077586',
  },
  warning: {
    100: '#FFF4CC',
    200: '#FFE999',
    300: '#FFDD66',
    400: '#FFD233',
    500: '#F7DE00', // Cor principal
    600: '#DDC800',
    700: '#BBAA00',
    800: '#998B00',
    900: '#776D00',
  },
  danger: {
    100: '#FFD6D6',
    200: '#FFADAD',
    300: '#FF8585',
    400: '#FF5C5C',
    500: '#EE0000', // Cor principal
    600: '#D50000',
    700: '#BB0000',
    800: '#A20000',
    900: '#880000',
  },
  secondary: {
    100: '#F2F4F6',
    200: '#E6EAED',
    300: '#D9DFE4',
    400: '#CDD4DB',
    500: '#AEB3B8', // Cor principal
    600: '#9CA0A5',
    700: '#8A8E92',
    800: '#777A7F',
    900: '#65676A',
  },
  dark: {
    100: '#F2F2F2',
    200: '#D9D9D9',
    300: '#BFBFBF',
    400: '#A6A6A6',
    500: '#7F8387', // Cor principal
    600: '#6B6E71',
    700: '#56595B',
    800: '#424345',
    900: '#2D2E30',
  },
};

const theme = createTheme({
  palette: {
    primary: {
      main: paletteColors.primary[500],
      light: paletteColors.primary[100],
      dark: paletteColors.primary[900],
      ...paletteColors.primary,
    },
    success: {
      main: paletteColors.success[500],
      light: paletteColors.success[100],
      dark: paletteColors.success[900],
      ...paletteColors.success,
    },
    info: {
      main: paletteColors.info[500],
      light: paletteColors.info[100],
      dark: paletteColors.info[900],
      ...paletteColors.info,
    },
    warning: {
      main: paletteColors.warning[500],
      light: paletteColors.warning[100],
      dark: paletteColors.warning[900],
      ...paletteColors.warning,
    },
    error: {
      main: paletteColors.danger[500],
      light: paletteColors.danger[100],
      dark: paletteColors.danger[900],
      ...paletteColors.danger,
    },
    secondary: {
      main: paletteColors.secondary[500],
      light: paletteColors.secondary[100],
      dark: paletteColors.secondary[900],
      ...paletteColors.secondary,
    },
    grey: {
      ...paletteColors.dark,
    },
    background: {
      default: paletteColors.dark[100], // Light
      paper: paletteColors.dark[200],  // Papel
    },
  },
});

export default theme;
