import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

export const GlobalStyle = createGlobalStyle`
    ${reset}

    *, *:before, *:after {
        box-sizing: border-box;
    }

    html {
        box-sizing: border-box;
        font-family: 'JetBrains MonoVariable';
        font-size: 16px;
        color: ${({ theme }) => theme.colors.almostWhite};
    }

    body {
        line-height: 1.5;
        letter-spacing: 0;
        background-color: ${({ theme }) => theme.colors.almostBlack};
    }

    input {
        font-family: inherit;
    }

    label {
        font-size: 18px;
    }
`;
