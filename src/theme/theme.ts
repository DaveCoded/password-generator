export const theme = {
    colors: {
        almostBlack: '#18171F',
        almostWhite: '#E6E5EA',
        grey: '#817D92',
        darkGrey: '#24232C',
        neonGreen: '#A4FFAF',
        red: '#F64A4A',
        orange: '#FB7C58',
        yellow: '#F8CD65',
        heading: '#737e7d',
        placeholder: '#4e4f56'
    }
};

export type ThemeColor = keyof typeof theme.colors;
