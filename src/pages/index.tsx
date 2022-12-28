import * as React from 'react';
import { GlobalStyle } from '../theme/globalStyle';
import type { HeadFC } from 'gatsby';
import { CopyButton } from '../components/CopyButton';
import { Checkbox } from '../components/Checkbox';
import styled, { CSSProperties, ThemeProvider } from 'styled-components';
import { theme } from '../theme/theme';
import { RangeInput } from '../components/RangeInput';
import { Strength } from '../components/Strength';

const characters = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '"!#$%&\'()*+,-./:;<=>?@[]^_`{|}~'
};

const MainWrapper = styled.main`
    display: flex;
    margin: 0 auto;
    height: 100vh;
    max-width: 540px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const H1 = styled.h1`
    font-size: 1.5rem;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.grey};
    margin-bottom: 31px;
`;

const TopPanel = styled.div`
    display: flex;
    gap: 2rem;
    width: 100%;
    padding: 19px 32px;
    margin-bottom: 1.5rem;
    background-color: ${({ theme }) => theme.colors.darkGrey};
`;

const BottomPanel = styled.div`
    padding: 2rem;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.darkGrey};
`;

const PasswordInput = styled.input`
    width: 100%;
    font-size: 2rem;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.almostWhite};
    background-color: transparent;
    border: none;

    ::placeholder {
        opacity: 25%;
    }

    :focus-visible {
        outline-offset: 4px;
        outline: #a4ffaf auto 1px;
    }
`;

const CharacterLength = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const PasswordLength = styled.span`
    font-size: 2rem;
    color: ${({ theme }) => theme.colors.neonGreen};
`;

const RangeWrapper = styled.div`
    margin-bottom: 2rem;
`;

const GenerateButton = styled.button`
    border: none;
    font-family: inherit;
    font-size: 18px;
    height: 65px;
    width: 100%;
    background: ${({ theme }) => theme.colors.neonGreen};
    cursor: pointer;

    :hover {
        background-color: ${({ theme }) => theme.colors.darkGrey};
        color: ${({ theme }) => theme.colors.neonGreen};
        border: 2px solid ${({ theme }) => theme.colors.neonGreen};
    }

    path {
        fill: ${({ theme }) => theme.colors.darkGrey};
    }

    :hover path {
        fill: ${({ theme }) => theme.colors.neonGreen};
    }
`;

const Spacer = styled.div<{ height: CSSProperties['height'] }>`
    height: ${({ height }) => height};
`;

const IndexPage = () => {
    const [state, setState] = React.useState({
        passwordValue: '',
        passwordLength: 12,
        uppercase: true,
        lowercase: true,
        numbers: true,
        symbols: false
    });

    function handleChange(evt: React.ChangeEvent<HTMLInputElement>) {
        if (!evt.target) return;
        let value;
        switch (evt.target.type) {
            case 'checkbox':
                value = evt.target.checked;
                break;
            case 'range':
                value = Number(evt.target.value);
                break;
            default:
                value = evt.target.value;
                break;
        }

        setState({
            ...state,
            [evt.target.name]: value
        });
    }

    function onGeneratePassword() {
        const availableChars = Object.keys(characters).reduce((str, key) => {
            const skeletonKey = key as keyof typeof characters;
            if (state[skeletonKey]) {
                return str + characters[skeletonKey];
            }
            return str;
        }, '');

        const getRandomChar = () => Math.floor(Math.random() * availableChars.length);

        const newPassword = new Array(state.passwordLength)
            .fill(null)
            .map(_ => availableChars[getRandomChar()])
            .join('');

        setState({
            ...state,
            passwordValue: newPassword
        });
    }

    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <MainWrapper>
                <H1>Password Generator</H1>
                <TopPanel>
                    <PasswordInput
                        type="text"
                        placeholder="P4$5W0rD!"
                        value={state.passwordValue}
                        onChange={handleChange}
                        name="passwordValue"
                    />

                    <CopyButton passwordValue={state.passwordValue} />
                </TopPanel>

                <BottomPanel>
                    {/* todo: hide from screen readers */}
                    <RangeWrapper>
                        <CharacterLength>
                            <label htmlFor="range">Character Length</label>
                            <PasswordLength>{state.passwordLength}</PasswordLength>
                        </CharacterLength>
                        <RangeInput value={state.passwordLength} handleChange={handleChange} />
                    </RangeWrapper>
                    <div>
                        <Checkbox
                            name="uppercase"
                            checked={state.uppercase}
                            label="Include Uppercase Letters"
                            handleChange={handleChange}
                        />
                        <Spacer height="1rem" />
                        <Checkbox
                            name="lowercase"
                            checked={state.lowercase}
                            label="Include Lowercase Letters"
                            handleChange={handleChange}
                        />
                        <Spacer height="1rem" />
                        <Checkbox
                            name="numbers"
                            checked={state.numbers}
                            label="Include Numbers"
                            handleChange={handleChange}
                        />
                        <Spacer height="1rem" />
                        <Checkbox
                            name="symbols"
                            checked={state.symbols}
                            label="Include Symbols"
                            handleChange={handleChange}
                        />
                    </div>
                    <Spacer height="2rem" />
                    <Strength password={state.passwordValue} />
                    <Spacer height="2rem" />
                    <GenerateButton onClick={onGeneratePassword}>
                        GENERATE{' '}
                        <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg">
                            <path d="m5.106 12 6-6-6-6-1.265 1.265 3.841 3.84H.001v1.79h7.681l-3.841 3.84z" />
                        </svg>
                    </GenerateButton>
                </BottomPanel>
            </MainWrapper>
        </ThemeProvider>
    );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
