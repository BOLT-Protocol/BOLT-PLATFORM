import React from 'react';
import PropTypes from 'prop-types';
import { SClayout, SCimage, SCmain } from './style';

const unauthLayout = ({ type, children }) => (
    <SClayout>
        <SCimage type={type} />

        <SCmain>{children}</SCmain>
    </SClayout>
);

unauthLayout.propTypes = {
    type: PropTypes.string.isRequired,
    children: PropTypes.object.isRequired
};

export default unauthLayout;
