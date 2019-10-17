import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { login, resetLoginErrors } from '../actions/index';

class LoginForm extends React.Component {
    constructor( props ) {
        super( props );

        this.state = {
            email: '',
            password: '',
        };

        this.onChange = this.onChange.bind( this );
        this.onSubmit = this.onSubmit.bind( this );
    }

    onChange( evt ) {
        const inputname = evt.currentTarget.name;
        let newState = {};
        newState[ inputname ] = evt.currentTarget.value;
        this.setState( newState );
    }

    onSubmit( evt ) {
        evt.preventDefault();
        const email = this.state.email.trim();
        const password = this.state.password.trim();
        if ( ! email || ! password ) {
            alert( 'Введите все данные!' );
            return false;
        }
        this.props.onSubmit( email, password );
    }

    render() {
        if ( this.props.loginErrorMessage ) {
            alert( this.props.loginErrorMessage );
            this.props.onLoginErrorMessageShown();
        }

        if ( this.props.isUserLoggedIn ) {
            return (
                <Redirect to="/" />
            );
        }

        return (
            <React.Fragment>
                <form className="d-block m-auto auth-form">
                    <fieldset>
                        <legend>{ `Вход` }</legend>
                        <div className="form-group">
                            <label htmlFor="email" className="col-form-label">{ `Эл. почта` }</label>
                            <div className="col p-0">
                                <input className="form-control" id="email" name="email" value={ this.state.email } type="email" onChange={ this.onChange } />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password" className="col-form-label">{ `Пароль` }</label>
                            <div className="col p-0">
                                <input className="form-control" id="password" name="password" value={ this.state.password } type="password" onChange={ this.onChange } />
                            </div>
                        </div>
                    </fieldset>
                    <button disabled={ this.props.loginRequested } type="submit" className="btn btn-primary" onClick={ this.onSubmit }>{ `Войти` }</button>
                    <div className="row mt-3">
                        <div className="col">
                            <Link to="/register/">{ `Зарегистрироваться` }</Link>
                        </div>
                    </div>
                </form>
            </React.Fragment>
        );
    }
}

const mapStateToProps = ( state ) => {
    return {
        loginRequested: state.loginRequested,
        loginErrorMessage: state.loginErrorMessage,
        isUserLoggedIn: state.isUserLoggedIn,
    };
};

const mapDispatchToProps = ( dispatch ) => {
    return {
        onSubmit: ( email, password ) => dispatch( login( email, password ) ),
        onLoginErrorMessageShown: () => dispatch( resetLoginErrors() ),
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( LoginForm );