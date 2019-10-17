import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Link, Switch } from 'react-router-dom';
import TopicsListing from './TopicsListing';
import AddTopicForm from './AddTopicForm';
import Topic from './Topic';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { authStateChange, signOut, resetLogoutErrors, clearAuthMessages } from '../actions/index';

class App extends React.Component {
    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,
    };

    constructor( props ) {
        super( props );

        window.firebase.auth().onAuthStateChanged( function( user ) {
            if ( user ) {
                this.props.userLoginDetected();
            }
        }.bind( this ) );
    }

    render() {
        if ( this.props.logoutErrorMessage ) {
            alert( this.props.logoutErrorMessage );
            this.props.onLogoutErrorMessageShown();
        }

        return (
            <React.Fragment>
                <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                    <div className="container">
                        <div className="w-100">
                            <div className="col-lg-12 p-0">
                                <a className="navbar-brand" href="/">{ `Форум на ReactJS` }</a>
                                <button className="navbar-toggler float-right" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                                </button>

                                <div className="collapse navbar-collapse float-lg-right" id="navbarColor01">
                                    <ul className="navbar-nav mr-auto">
                                        <li className={ "nav-item " + ( ( '/' === this.props.location.pathname ) ? 'active' : '' ) }>
                                            <Link className="nav-link text-center" to="/">{ `Форум` }</Link>
                                        </li>
                                        {
                                            ( this.props.isUserLoggedIn ) ?
                                                <li className={ "nav-item" }>
                                                    <a className="nav-link text-center" href="#" onClick={ this.props.signOut }>{ `Выход` }</a>
                                                </li>
                                                :
                                                <React.Fragment>
                                                    <li className={ "nav-item " + ( ( '/login/' === this.props.location.pathname ) ? 'active' : '' ) }>
                                                        <Link className="nav-link text-center" to="/login/">{ `Вход` }</Link>
                                                    </li>
                                                    <li className={ "nav-item " + ( ( '/register/' === this.props.location.pathname ) ? 'active' : '' ) }>
                                                        <Link className="nav-link text-center" to="/register/">{ `Регистрация` }</Link>
                                                    </li>
                                                </React.Fragment>
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div id="app-container">
                                {
                                    ( this.props.loginSuccessMessage || this.props.registerSuccessMessage ) ?
                                        <div className="alert alert-success">
                                            <button type="button" className="close" onClick={ this.props.clearAuthMessages }>&times;</button>
                                            { this.props.loginSuccessMessage || this.props.registerSuccessMessage }
                                        </div>
                                        :
                                        null
                                }
                                <Switch>
                                    <Route path="/login/" component={ LoginForm } />
                                    <Route path="/register/" component={ RegisterForm } />
                                    <Route path="/topic/:topicId/" component={ Topic } />
                                    {
                                        ( ! this.props.isUserLoggedIn ) ?
                                            <Route path="/add-topic/" render={ () => ( <span>{ `Чтобы добавлять темы, пожалуйста,` } <Link to="/login/">{ `авторизуйтесь` }</Link></span> ) } />
                                            :
                                            <Route path="/add-topic/" component={ AddTopicForm } />
                                    }
                                    <Route path="/page/:page/" component={ TopicsListing } />
                                    <Route component={ TopicsListing } />
                                </Switch>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
};

const mapStateToProps = ( state ) => {
    return {
        isUserLoggedIn: state.isUserLoggedIn,
        logoutErrorMessage: state.logoutErrorMessage,
        loginSuccessMessage: state.loginSuccessMessage,
        registerSuccessMessage: state.registerSuccessMessage,
    };
};

const mapDispatchToProps = ( dispatch ) => {
    return {
        userLoginDetected: () => dispatch( authStateChange() ),
        signOut: ( evt ) => dispatch( signOut( evt ) ),
        onLogoutErrorMessageShown: () => dispatch( resetLogoutErrors() ),
        clearAuthMessages: () => dispatch( clearAuthMessages() ),
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( App );