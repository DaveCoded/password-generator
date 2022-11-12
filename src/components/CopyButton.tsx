import * as React from 'react';
import { ClipboardText, Check } from 'phosphor-react';
import styled from 'styled-components';

const StyledButton = styled.button``;

const useCopyToClipboard = (text: string, notifyTimeout = 1200) => {
    const [copyStatus, setCopyStatus] = React.useState('inactive');
    const copy = React.useCallback(() => {
        navigator.clipboard.writeText(text).then(
            () => setCopyStatus('copied'),
            () => setCopyStatus('failed')
        );
    }, [text]);

    React.useEffect(() => {
        if (copyStatus === 'inactive') {
            return;
        }

        const timeoutId = setTimeout(() => setCopyStatus('inactive'), notifyTimeout);

        return () => clearTimeout(timeoutId);
    }, [copyStatus]);

    return { copyStatus, copy };
};

interface CopyButtonProps {
    passwordValue: string;
}

export const CopyButton = ({ passwordValue }: CopyButtonProps) => {
    const { copyStatus, copy } = useCopyToClipboard(passwordValue);

    return (
        <StyledButton onClick={copy}>
            {copyStatus === 'copied' ? <Check size={20} /> : <ClipboardText size={20} />}
        </StyledButton>
    );
};
