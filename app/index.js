import React from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';
import App from './components/App';
import initialState from './initialState';

const store = createStore( rootReducer, initialState, applyMiddleware( thunk ) );

/**
 * @link: https://reacttraining.com/react-router/web/api/withRouter
 * Create a new component that is "connected" (to borrow redux terminology) to the router.
 */
const AppWithRouter = withRouter( App );
// to access updated match, location and history props ALL the application must be wrapped in BrowserRouter
ReactDOM.render( <Provider store={ store }><BrowserRouter><AppWithRouter /></BrowserRouter></Provider>, document.getElementById( 'root' ) );