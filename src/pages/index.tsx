import * as React from 'react';
import { GlobalStyle } from '../theme/globalStyle';
import type { HeadFC } from 'gatsby';
import { CopyButton } from '../components/CopyButton';
import { Checkbox } from '../components/Checkbox';
import styled from 'styled-components';

const characters = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '"!#$%&\'()*+,-./:;<=>?@[]^_`{|}~'
};

const MainWrapper = styled.main`
    display: flex;
    height: 100vh;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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
        <>
            <GlobalStyle />
            <MainWrapper>
                <h1>Password Generator</h1>
                <div>
                    <input
                        type="text"
                        value={state.passwordValue}
                        onChange={handleChange}
                        name="passwordValue"
                        style={{ width: '500px' }}
                    />

                    <CopyButton passwordValue={state.passwordValue} />
                </div>

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
        </>
    );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
