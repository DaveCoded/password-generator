import * as React from 'react';
import { GlobalStyle } from '../theme/globalStyle';
import type { HeadFC } from 'gatsby';
import { CopyButton } from '../components/CopyButton';
import { Checkbox } from '../components/Checkbox';
import styled, { ThemeProvider } from 'styled-components';
import { theme } from '../theme/theme';

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
    max-width: 450px;
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

                <div>
                    {/* todo: hide from screen readers */}
                    <div>{state.passwordLength}</div>
                    <div>
                        <input
                            type="range"
                            id="range"
                            name="passwordLength"
                            value={state.passwordLength}
                            onChange={handleChange}
                            max={50}
                        />
                        <label htmlFor="range">Character Length</label>
                    </div>
                    <Checkbox
                        name="uppercase"
                        checked={state.uppercase}
                        label="Include Uppercase Letters"
                        handleChange={handleChange}
                    />
                    <Checkbox
                        name="lowercase"
                        checked={state.lowercase}
                        label="Include Lowercase Letters"
                        handleChange={handleChange}
                    />
                    <Checkbox
                        name="numbers"
                        checked={state.numbers}
                        label="Include Numbers"
                        handleChange={handleChange}
                    />
                    <Checkbox
                        name="symbols"
                        checked={state.symbols}
                        label="Include Symbols"
                        handleChange={handleChange}
                    />
                    <div>
                        <button onClick={onGeneratePassword}>GENERATE</button>
                    </div>
                </div>
            </MainWrapper>
        </ThemeProvider>
    );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
