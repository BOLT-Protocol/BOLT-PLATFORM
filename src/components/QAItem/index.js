
import React from 'react';
import PropTypes from 'prop-types';
import { Question, Answer } from './style';
import './style.css';

export default class Counter extends React.Component {
    state = { show: false, OpenClass: '' }

    showAnswer = () => this.setState(state => ({
        show: !state.show,
        OpenClass: state.OpenClass ? '': 'QAOpen',
    }));

    render() {
        const { question, answer } = this.props;
        const { OpenClass, show } = this.state;
        return (
            <div
                style = {{
                    position: 'relative'
                }}
            >
                <Question onClick={this.showAnswer}>{question}</Question>
                <Answer className={OpenClass} show={show} >{answer}</Answer>
            </div>
        );
    }

}

Counter.propTypes = {
    question: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired,
};

