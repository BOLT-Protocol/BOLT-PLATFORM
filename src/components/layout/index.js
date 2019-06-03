import React, { Fragment, useState } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

import { SCheader, SCnav, SCcontainer, SCli } from './style';

const navList = [
    {
        name: 'Home',
        link: '/',
        icon: 'home'
    },
    {
        name: 'BOLT Currency',
        link: '/currency',
        icon: 'currency'
    },
    {
        name: 'BOLT PAY',
        link: '/pay',
        icon: 'pay'
    },
    {
        name: 'BOLT Trust',
        link: '/trust',
        icon: 'trust'
    }
];

const layout = props => {
    const [nav, setNav] = useState(0);

    return (
        <Fragment>
            <SCheader>
                <div>
                    <img src="/static/images/bolt_logo.png" alt="BOLT"/>
                </div>

            </SCheader>

            <SCcontainer>

                <SCnav>

                    <ul>
                        {navList.map((n, i) => (
                            <SCli key={n.name} active={i === nav} onClick={() => setNav(i)}>
                                <Link href={n.link}>
                                    <a>
                                        <img src={`/static/images/ic_${n.icon}.svg`} alt={n.name}/>
                                        {n.name}
                                        {i === nav && (
                                            <span>
												>
                                            </span>
                                        )}
                                    </a>
                                </Link>
                            </SCli>
                        ))}
                    </ul>

                </SCnav>

                <div>
                    {/* eslint-disable-next-line react/destructuring-assignment */}
                    {props.children}
                </div>

            </SCcontainer>

        </Fragment>
    );
};

layout.propTypes = {
    children: PropTypes.object.isRequired
};

export default layout;
