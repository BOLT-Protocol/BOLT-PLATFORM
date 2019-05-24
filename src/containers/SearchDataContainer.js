import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Subject, of } from 'rxjs';
import { StateObservable } from 'redux-observable';
import PropTypes from 'prop-types';

import rootEpic from '../store/epics';
import * as nasaActions from '../actions/nasa';

class SearchDataContainer extends Component {
    // use for page,
    // need return namespacesRequired
    static async getInitialProps({ store, req, namespacesRequired = [] }) {
        const state$ = new StateObservable(new Subject(), store.getState());
        const resultAction = await rootEpic(of(nasaActions.startFetchData()), state$).toPromise();

        store.dispatch(resultAction);
        const isServer = !!req;

        return { isServer, namespacesRequired };
    }

    componentWillUnmount() {
        nasaActions.cancelFetchData();
    }

    renderContent() {
        const { nasa } = this.props;
        const { data, error } = nasa;
        if (error) {
            return (
                <div>
                    <h1>Oops! Something wrong...</h1>
                </div>
            );
        } else {
            return (
                <div>
                    <h1>{data.title}</h1>

                    <span>{data.data}</span>

                    <img src={data.url} alt="planet" />

                    <p>{data.explanation}</p>
                </div>
            );
        }
    }

    render() {
        return <div>{this.renderContent()}</div>;
    }
}

SearchDataContainer.propTypes = {
    nasa: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    nasa: state.nasa
});

// const mapDispatchToProps = dispatch => (
//    {
//        countAction: bindActionCreators(countAction, dispatch)
//    }
// )

export default connect(mapStateToProps)(SearchDataContainer);
