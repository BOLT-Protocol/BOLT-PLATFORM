import React from 'react';
import PropTypes from 'prop-types';

import { SCback } from './style';

const backArrow = ({ onClick }) => (
    <SCback onClick={onClick}>
        <img src="/static/images/ic_arrow_back.svg" alt="back" />
        回上一步
    </SCback>
);

backArrow.propTypes = {
    onClick: PropTypes.func.isRequired
};

export default backArrow;
