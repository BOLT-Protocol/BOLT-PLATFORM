import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { SCtermHolder } from './sytle';
import { WGmainA } from '../../widgets/a';

const termItem = ({ text, term, link, checked, onChange }) => (
    <SCtermHolder>
        <input type="checkbox" checked={checked} onChange={onChange} />

        <p>{text}</p>

        <Link href={link}>
            <WGmainA>{term}</WGmainA>
        </Link>
    </SCtermHolder>
);

termItem.defaultProps = {
    text: '我已閱讀並遵守'
};

termItem.propTypes = {
    text: PropTypes.string,
    term: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
    link: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};

export default termItem;
