import React from 'react';
import PropType from 'prop-types';

import { SCholder } from './style';

const selectItem = ({ selected, img, title, desc, onClick }) => {
    return (
        <SCholder selected={selected} onClick={onClick}>
            <div>
                <img src={img} alt={title} />

                <h3>{title}</h3>

                <p>{desc}</p>

                <span>
                    <img src="/static/images/ic_check.svg" alt="selected" />
                </span>
            </div>
        </SCholder>
    );
};

selectItem.propTypes = {
    selected: PropType.bool.isRequired,
    img: PropType.string.isRequired,
    title: PropType.string.isRequired,
    desc: PropType.string.isRequired,
    onClick: PropType.func.isRequired
};

export default selectItem;
