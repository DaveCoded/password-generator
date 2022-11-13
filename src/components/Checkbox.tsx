import * as React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    margin-bottom: 1rem;
    display: grid;
    grid-template-columns: 1em auto;
    align-items: center;
    gap: 20px;
`;

const StyledInput = styled.input`
    -webkit-appearance: none;
    appearance: none;
    background: transparent;
    margin: 0;
    font: inherit;
    color: currentColor;
    width: 20px;
    height: 20px;
    border: 2px solid currentColor;
    cursor: pointer;

    :checked {
        background-color: ${({ theme }) => theme.colors.neonGreen};
        border-color: ${({ theme }) => theme.colors.neonGreen};
        background-image: url(/static/images/icon-check.svg);
        background-position: center center;
        background-repeat: no-repeat;
    }

    :hover {
        border-color: ${({ theme }) => theme.colors.neonGreen};
    }
`;

interface CheckboxProps {
    name: string;
    label: string;
    checked: boolean;
    handleChange: React.ChangeEventHandler<HTMLInputElement>;
}

export const Checkbox = ({ name, label, checked, handleChange }: CheckboxProps) => {
    return (
        <Wrapper>
            <StyledInput
                type="checkbox"
                name={name}
                id={name}
                checked={checked}
                onChange={handleChange}
            />
            <label htmlFor={name}>{label}</label>
        </Wrapper>
    );
};
