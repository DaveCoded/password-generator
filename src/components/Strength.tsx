import React from 'react';
import { passwordStrength } from 'check-password-strength';
import styled from 'styled-components';
import { ThemeColor } from '../theme/theme';

const Container = styled.div`
    width: 100%;
    height: 72px;
    padding: 0 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: ${({ theme }) => theme.colors.almostBlack};
`;

const H2 = styled.h2`
    text-transform: uppercase;
    font-size: 18px;
    line-height: 23px;
    color: ${({ theme }) => theme.colors.grey};
`;

const StrengthLabel = styled.span`
    text-transform: uppercase;
    font-size: 24px;
    line-height: 31px;
    color: ${({ theme }) => theme.colors.almostWhite};
`;

const Bar = styled.div<{ filled: boolean; strengthColor: ThemeColor | '' }>`
    width: 10px;
    height: 28px;
    background-color: ${({ theme, filled, strengthColor }) =>
        (filled && strengthColor && theme.colors[strengthColor]) || 'transparent'};
    border: 2px solid
        ${({ theme, filled, strengthColor }) =>
            (filled && strengthColor && theme.colors[strengthColor]) || theme.colors.almostWhite};
`;

const BarWrapper = styled.div`
    display: flex;
    gap: 0.5rem;
`;

const ValueWrapper = styled.div`
    display: flex;
    gap: 1rem;
`;

interface Props {
    password: string;
}

export const Strength = ({ password }: Props) => {
    const value = password ? passwordStrength(password).value : '';
    const strengthColor = password ? derivePasswordStrengthColor(value) : '';

    return (
        <Container>
            <H2>Strength</H2>
            <ValueWrapper>
                <StrengthLabel>{value}</StrengthLabel>
                <BarWrapper>
                    <Bar filled={value !== ''} strengthColor={strengthColor} />
                    <Bar
                        filled={['Weak', 'Medium', 'Strong'].includes(value)}
                        strengthColor={strengthColor}
                    />
                    <Bar
                        filled={['Medium', 'Strong'].includes(value)}
                        strengthColor={strengthColor}
                    />
                    <Bar filled={value === 'Strong'} strengthColor={strengthColor} />
                </BarWrapper>
            </ValueWrapper>
        </Container>
    );
};

function derivePasswordStrengthColor(value: string): ThemeColor {
    if (value === 'Too weak') {
        return 'red';
    } else if (value === 'Weak') {
        return 'orange';
    } else if (value === 'Medium') {
        return 'yellow';
    } else if (value === 'Strong') {
        return 'neonGreen';
    } else {
        throw new Error('Invalid password strength value');
    }
}
