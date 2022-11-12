import * as React from 'react';
import styled from 'styled-components';

interface CheckboxProps {
    name: string;
    label: string;
    checked: boolean;
    handleChange: React.ChangeEventHandler<HTMLInputElement>;
}

export const Checkbox = ({ name, label, checked, handleChange }: CheckboxProps) => {
    return (
        <div>
            <input
                type="checkbox"
                name={name}
                id={name}
                checked={checked}
                onChange={handleChange}
            />
            <label htmlFor={name}>{label}</label>
        </div>
    );
};
