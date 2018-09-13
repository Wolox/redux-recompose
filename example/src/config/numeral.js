import numeral from 'numeral';

numeral.register('locale', 'es-ar', {
  delimiters: {
    thousands: '.',
    decimal: ','
  },
  ordinal: function ordinal(number) {
    return number === 1 ? 'ro' : number === 2 ? 'do' : number === 3 ? 'ro' : 'to';
  },
  currency: {
    symbol: '$'
  }
});

numeral.locale('es-ar');

export default numeral;
