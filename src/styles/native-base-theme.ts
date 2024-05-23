import { extendTheme } from 'native-base';

const customTheme = extendTheme({
  components: {
    Radio: {
      baseStyle: {
        colorScheme: '#ffff'
      },
    },
  },
  colors: {
    customScheme: {
      50: '#124b53',
      100: '#4bc50d',
      200: '#80deea',
      300: '#8be14d',
      400: '#bfda26',
      500: '#d9af18', // Cor principal
      600: '#c17a00',
      700: '#a400a7',
      800: '#8f0062',
      900: '#64003e',
    },
  },
});

export default customTheme;
