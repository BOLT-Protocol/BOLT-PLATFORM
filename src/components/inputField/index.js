import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import { SCinputField, SCinputMessage } from './style';
import { WGerrorP, WGhintP } from '../../widgets/p';

const inputField = ({ name, type, hint, inputValue, setInput, placeholder, validCheck, error, showError, valid }) => {
    // type: password, text...
    // ***** valid need initial value null, after enter value, will be true or false
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
            timeoutRef.current = setTimeout(async () => {
                timeoutRef.current = null;

                // maybe validCheck is async function, sorry
                const isValid = await validCheck(value);

                setInput({
                    key: name,
                    valid: isValid,
                    value
                });
            }, 300);
        }
    }, [value]);

    return (
        <SCinputField>
            {
                type === 'textarea' ? (
                    <textarea rows="3" value={value} onChange={handleChange} placeholder={placeholder} />
                ) : (
                    <input value={value} type={type} onChange={handleChange} placeholder={placeholder} autoComplete={type === 'password' ? 'on' : 'off'} />
                )
            }

            <SCinputMessage>
                {value.trim() === '' && hint && !showError && <WGhintP>{hint}</WGhintP>}
                {((value.trim() !== '' && valid === false) || showError) && <WGerrorP>{error}</WGerrorP>}
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
    valid: null,
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
    name: PropTypes.string.isRequired,
    valid: PropTypes.bool
};

export default inputField;
