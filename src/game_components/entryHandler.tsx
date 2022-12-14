export const entryHandler = (
  degree: string,
  chord: string,
  symbol: string,
  base: string
) => {
  if (!symbol) {
    switch (chord) {
      case 'Major':
        return degree + 'Maj';
      case 'Minor':
        return degree.toLowerCase() + 'min';
      case 'Diminished':
        return degree.toLowerCase() + 'dim';
      case 'Augmented':
        return degree + 'aug';
      case 'Dominant':
        return degree + '7';
      default:
        return degree;
    }
  }
  if (symbol) {
    switch (symbol) {
      case 'SUB':
        return 'SUB' + base + '/' + degree;
      case '/':
        return base + '/' + degree;
    }
  }
};
