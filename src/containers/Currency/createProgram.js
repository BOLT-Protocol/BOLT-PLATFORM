import React from 'react';
import PropTypes from 'prop-types';

import SelectedItem from '../../components/selectItem';

const CreateProgram = ({ program, handleProgram }) => (
    <>
        <SelectedItem onClick={() => handleProgram(1)} selected={program === 1} img="/static/images/bolt_d_new_currency.svg" title="新發幣" desc="適用於無任何Token之用戶" />

        <SelectedItem onClick={() => handleProgram(2)} selected={program === 2} img="/static/images/bolt_d_exchange.svg" title="已發幣託管" desc="適用於已有Token之用戶" />
    </>
);

CreateProgram.propTypes = {
    program: PropTypes.number.isRequired,
    handleProgram: PropTypes.func.isRequired
};

export default CreateProgram;