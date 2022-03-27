import { compose, createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';

import { rootReducer } from './root-reducer'

// this is a helper library to log the actions before they're dispatched. 
const middleWares = [logger]

const composedEnhancers = compose(applyMiddleware(...middleWares))

//firs arg is rootReducer, seconf arg is an optional additional initial state, third arg is the logger
export const store = createStore(rootReducer, undefined, composedEnhancers)

