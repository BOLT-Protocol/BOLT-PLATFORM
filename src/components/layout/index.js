import React, { Fragment, useState, memo } from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import Router, { withRouter } from 'next/router';
import PropTypes from 'prop-types';
import Cookies from 'universal-cookie';

import { SCheader, SCnav, SCcontainer, SCli, SCMenu, SCAvatar } from './style';
import hashColor from '../../utils/hashColor';
import { logout } from '../../actions/user';

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
    const { router, user, logoutAction } = props;
    const [nav, setNav] = useState(router.pathname);

    const onLogout = () => {
        const cookie = new Cookies();
        logoutAction();
        cookie.remove('boltToken');
        cookie.remove('boltSecret');
        Router.replace('/signin');
    };

    return (
        <Fragment>
            <SCheader>
                <div>
                    <img src="/static/images/bolt_logo.png" alt="BOLT" />
                </div>

                <SCMenu>
                    <SCAvatar color={hashColor(user.userName)}>
                        {user.userName.substr(0, 1).toUpperCase()}
                    </SCAvatar>

                    <div style={{ justifyContent: 'space-between' }}>
                        {user.userName}

                        <span>
                            <img src="/static/images/flash.svg" alt="Boltcoin" />
                        </span>
                    </div>

                    <nav>
                        <ul>
                            <li>
                                <a onClick={onLogout}>
                                    登出
                                </a>
                            </li>
                        </ul>
                    </nav>
                </SCMenu>
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
    router: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    logoutAction: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    user: state.user,
});

const mapDispatchToProps = {
    logoutAction: logout
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(memo(layout)));
