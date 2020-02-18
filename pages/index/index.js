// import React, { Component, createRef } from 'react';
// import { withRouter } from 'next/router';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

// import ScrollListener from '../../src/hoc/scrollListener/scrollListener';
// import { SCmain, SCsection } from './style';
// import authGuard from '../../src/utils/auth';
// import { cancelVerify } from '../../src/actions/user';

// class Index extends Component {
//     static async getInitialProps(ctx) {
//         const isServer = !!ctx.req;

//         await authGuard(ctx);

//         return {
//             isServer,
//             namespacesRequired: []
//         };
//     }

//     constructor(props) {
//         super(props);
//         this.state = {
//             section1Color: 'red',
//             section2Color: 'red'
//         };

//         this.anchor1 = createRef();
//         this.anchor2 = createRef();
//     }

//     componentWillUnmount() {
//         cancelVerify();
//     }

//     scrollToAection1 = () => {
//         if (this.state.section1Color !== 'blue') {
//             this.setState(prevState => ({
//                 ...prevState,
//                 section1Color: 'blue'
//             }));
//         }
//     };

//     scrollToAection2 = () => {
//         if (this.state.section1Color !== 'green') {
//             this.setState(prevState => ({
//                 ...prevState,
//                 section2Color: 'green'
//             }));
//         }
//     };

//     render() {
//         // use withRouter to get router props
//         const { router } = this.props;
//         const { section1Color, section2Color } = this.state;

//         const scrollEvent = [{ ref: this.anchor1, event: this.scrollToAection1 }, { pos: 100, height: 500, event: this.scrollToAection2 }];

//         return (
//             <ScrollListener events={scrollEvent}>
//                 {({ style }) => (
//                     <SCmain>
//                         <SCsection ref={this.anchor1}>
//                             <a
//                                 style={{ ...style, color: section1Color }}
//                                 onClick={() => {
//                                     router.push('/nasa');
//                                 }}
//                             >
//                                 nasa
//                             </a>
//                         </SCsection>

//                         <SCsection ref={this.anchor2}>
//                             <a
//                                 style={{ ...style, color: section2Color }}
//                                 onClick={() => {
//                                     router.push('/i18nSample');
//                                 }}
//                             >
//                                 i18n
//                             </a>
//                         </SCsection>
//                     </SCmain>
//                 )}
//             </ScrollListener>
//         );
//     }
// }

// Index.propTypes = {
//     router: PropTypes.object.isRequired
// };

// const mapStateToProps = state => ({
//     user: state.user
// });

// export default connect(mapStateToProps)(withRouter(Index));

import CurrencyContainer from '../../src/containers/Currency';

const currency = CurrencyContainer;

export default currency;

