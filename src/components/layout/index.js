import React, { Fragment, useState, memo, useEffect } from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import { withRouter } from 'next/router';
import PropTypes from 'prop-types';
import Cookies from 'universal-cookie';

import {
    SCheader,
    SCnav,
    SCcontainer,
    SCli,
    SCMenu,
    SCAvatar,
    BoltCoinBalance,
} from './style';
import { logout, fetchUserBannerInfo } from '../../actions/user';

const navList = [
    {
        name: 'Home',
        link: '/',
        icon: 'home',
    },
    {
        name: 'Bolt Currency',
        link: '/currency',
        icon: 'currency',
    },
    {
        name: 'Bolt Pay',
        link: '/pay',
        icon: 'pay',
    },
    {
        name: 'Bolt Trust',
        link: '/trust',
        icon: 'trust',
    },
];

const layout = (props) => {
    const { router, user, logoutAction, userBannerInfoAction } = props;
    const [nav, setNav] = useState(router.pathname);

    const onLogout = () => {
        const cookie = new Cookies();
        logoutAction();
        cookie.remove('boltToken');
        cookie.remove('boltSecret');
        // Router.replace('/signin');
        window.location.replace('/signin');
        localStorage.removeItem('walletconnect');
    };

    useEffect(() => {
        userBannerInfoAction();
    }, []);

    return (
        <Fragment>
            <SCheader>
                <div>
                    <img src="/static/images/bolt_logo.png" alt="BOLT" />
                </div>

                <SCMenu>
                    <SCAvatar avatar={user.avatar}></SCAvatar>

                    <div style={{ justifyContent: 'space-between' }}>
                        {user.userName}

                        <span>
                            <img
                                src="/static/images/flash.svg"
                                alt="Boltcoin"
                            />
                            <BoltCoinBalance>{user.BoltCoin}</BoltCoinBalance>
                        </span>
                    </div>

                    <nav>
                        <ul>
                            <li>
                                <a onClick={onLogout}>登出</a>
                            </li>
                        </ul>
                    </nav>
                </SCMenu>
            </SCheader>

            <SCcontainer>
                <SCnav>
                    <ul>
                        {navList.map((n) => (
                            <SCli
                                key={n.name}
                                active={n.link === nav}
                                onClick={() => setNav(n.link)}
                            >
                                <Link href={n.link}>
                                    <a>
                                        <img
                                            src={`/static/images/ic_${n.icon}.svg`}
                                            alt={n.name}
                                        />
                                        {n.name}
                                        {n.link === nav && (
                                            <span>
                                                <img
                                                    src="/static/images/ic_arrow.svg"
                                                    alt="arrow"
                                                />
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
    logoutAction: PropTypes.func.isRequired,
    userBannerInfoAction: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    user: state.user,
});

const mapDispatchToProps = {
    logoutAction: logout,
    userBannerInfoAction: fetchUserBannerInfo,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(memo(layout)));
