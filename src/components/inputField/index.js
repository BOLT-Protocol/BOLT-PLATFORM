import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import { SCinputField, SCinputMessage } from './style';
import { WGerrorP, WGhintP } from '../../widgets/p';

const inputField = ({ name, type, hint, inputValue, setInput, placeholder, validCheck, error, showError }) => {
    // type: password, text...

    const [value, setValue] = useState(inputValue);
    const timeoutRef = useRef(null);

    const handleChange = e => {
        const v = e.target.value;

        setValue(v);
    };

    useEffect(() => {
        if (timeoutRef.current !== null) {
            clearTimeout(timeoutRef.current);
        }
        if (inputValue !== value) {
            timeoutRef.current = setTimeout(() => {
                timeoutRef.current = null;
                const valid = validCheck(value);

                setInput({
                    key: name,
                    valid,
                    value
                });
            }, 500);
        }
    }, [value]);

    return (
        <SCinputField>
            <input type={type} onChange={handleChange} placeholder={placeholder} autoComplete={type === 'password' ? 'on' : 'off'} />

            <SCinputMessage>
                {value.trim() === '' && hint && !showError && <WGhintP>{hint}</WGhintP>}
                {((value.trim() !== '' && !validCheck(value.trim())) || showError) && <WGerrorP>{error}</WGerrorP>}
            </SCinputMessage>
        </SCinputField>
    );
};

inputField.defaultProps = {
    hint: '',
    type: 'text',
    inputValue: '',
    placeholder: '',
    error: '',
    showError: false,
    validCheck: () => true
};

inputField.propTypes = {
    type: PropTypes.string,
    hint: PropTypes.string,
    inputValue: PropTypes.string,
    placeholder: PropTypes.string,
    error: PropTypes.string,
    showError: PropTypes.bool,
    validCheck: PropTypes.func,
    setInput: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired
};

export default inputField;
