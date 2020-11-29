import { map } from 'lodash/fp';

const theme = {
  spacing: (...n) => map(v => `${v * 8}px`, n).join(' '),
  borderRadius: 8,
  palette: {
    background: '#f5f4f0',
    paper: '#fefefe',
    primary: '#5968e1',
    borderColor: '#ececec',
    error: '#D32F2F',
  },
  shadow: {
    2: '4px 4px 6px -5px rgba(0,0,0,0.2)',
  },
  typography: {
    fontWeight: {
      light: 300,
      regular: 500,
    },
  },
};

export default theme;
