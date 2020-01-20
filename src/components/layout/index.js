import React, { Fragment, useState } from 'react';
import Link from 'next/link';
import { withRouter } from 'next/router';
import PropTypes from 'prop-types';

import { SCheader, SCnav, SCcontainer, SCli } from './style';

const navList = [
    // {
    //     name: 'Home',
    //     link: '/',
    //     icon: 'home'
    // },
    {
        name: 'Bolt Currency',
        link: '/currency',
        icon: 'currency'
    },
    {
        name: 'Bolt Pay',
        link: '/pay',
        icon: 'pay'
    },
    {
        name: 'Bolt Trust',
        link: '/trust',
        icon: 'trust'
    }
];

const layout = props => {
    const { router } = props;
    const [nav, setNav] = useState(router.pathname);

    return (
        <Fragment>
            <SCheader>
                <div>
                    <img src="/static/images/bolt_logo.png" alt="BOLT" />
                </div>
            </SCheader>

            <SCcontainer>

                <SCnav>

                    <ul>
                        {navList.map((n) => (
                            <SCli key={n.name} active={n.link === nav} onClick={() => setNav(n.link)}>
                                <Link href={n.link}>
                                    <a>
                                        <img src={`/static/images/ic_${n.icon}.svg`} alt={n.name} />
                                        {n.name}
                                        {n.link === nav && (
                                            <span>
                                                <img src="/static/images/ic_arrow.svg" alt="arrow" />
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
    children: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired
};

export default withRouter(layout);
