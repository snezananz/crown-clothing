import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { persistStore } from 'redux-persist'

import rootReducer from './root-reducer';

// we want logging only for non production environment
//const middlewares = [logger];
const middlewares = [];

if(process.env.NODE_ENV === 'development'){
    middlewares.push(logger)
};

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

// this is a persisted version of the store
export const persistor = persistStore(store);
