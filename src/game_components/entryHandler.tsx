export const entryHandler = (degree: string, chord: string) => {
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
};
