import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Signin extends Component {
    static getInitialProps() {
        const user = {
            isAuth: false
        };

        return {
            namespacesRequired: [],
            user,
            page: 'Signin'
        };
    }

    constructor(props) {
        super(props);

        const initialInput = {
            value: '',
            valid: false
        };

        this.state = {
            name: initialInput,
            email: initialInput,
            password: initialInput,
            replyPassword: initialInput
        };
    }

    render() {
        return <div>Signin</div>;
    }
}

export default connect(
    null,
    null
)(Signin);
