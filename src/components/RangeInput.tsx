import * as React from 'react';
import styled, { css } from 'styled-components';

interface StyleProps {
    backgroundSize: number;
}

const StyledInput = styled.input.attrs<StyleProps>({
    type: 'range',
    id: 'range',
    name: 'passwordLength'
})<StyleProps>`
    ${({ theme, backgroundSize }) => css`
        appearance: none;
        -moz-appearance: none;
        width: 100%;
        height: 0.5rem;
        background: ${theme.colors.almostBlack};
        background-image: linear-gradient(${theme.colors.neonGreen}, ${theme.colors.neonGreen});
        background-size: ${backgroundSize}% 100%;
        background-repeat: no-repeat;
        cursor: grab;

        &::-webkit-slider-thumb {
            -webkit-appearance: none;
            -moz-appearance: none;
            width: 28px;
            height: 28px;
            border-radius: 50%;
            background-color: ${theme.colors.almostWhite};
        }

        &::-webkit-slider-thumb:active {
            background-color: ${theme.colors.almostBlack};
            border: 2px solid ${theme.colors.neonGreen};
            cursor: grabbing;
        }
    `}
`;

interface RangeInputProps {
    value: number;
    handleChange: React.ChangeEventHandler<HTMLInputElement>;
}

const MAX_PASSWORD_LENGTH = 50;

export const RangeInput = ({ value, handleChange }: RangeInputProps) => {
    return (
        <StyledInput
            value={value}
            onChange={handleChange}
            max={MAX_PASSWORD_LENGTH}
            backgroundSize={(100 / MAX_PASSWORD_LENGTH) * value}
        />
    );
};
