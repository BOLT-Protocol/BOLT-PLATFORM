import React from 'react';
import PropTypes from 'prop-types';
import { SClayout, SCimage, SCmain, SCcopyright } from './style';

const unauthLayout = ({ type, children }) => (
    <SClayout>
        <SCimage type={type}>
            <img src="static/images/bolt_logo.png" alt="BOLT" />

            <SCcopyright>Copyright © 2019, Bolt. All Rights Reserved.</SCcopyright>
        </SCimage>

        <SCmain>{children}</SCmain>
    </SClayout>
);

unauthLayout.propTypes = {
    type: PropTypes.string.isRequired,
    children: PropTypes.object.isRequired
};

export default unauthLayout;
