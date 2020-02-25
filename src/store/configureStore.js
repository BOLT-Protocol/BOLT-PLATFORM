import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { createEpicMiddleware } from 'redux-observable';

import rootReducer from './reducers';
import rootEpic from './epics';

export default (initialState) => {
    const epicMiddleware = createEpicMiddleware();
    let middleware = [epicMiddleware];

    if (process.env.NODE_ENV !== 'production') {
        const logger = createLogger({ collapsed: true });
        middleware = [...middleware, logger];
    }

    const reduxMiddleware = applyMiddleware(...middleware);
    const store = createStore(
        rootReducer,
        initialState,
        reduxMiddleware
    );

    epicMiddleware.run(rootEpic);

    return store;
};
