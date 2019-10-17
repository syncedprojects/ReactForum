import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { addMessage } from '../actions/index';
import moment from 'moment';

class Topic extends React.Component {
    constructor( props ) {
        super( props );

        this.topicId = this.props.match.params.topicId;
        const topics = this.props.topics.filter( ( item ) => ( item.id == this.topicId ) );
        if ( typeof topics[ 0 ] !== typeof undefined ) {
            this.currentTopic = topics[ 0 ];
        }

        this.state = {
            message: '',
        };

        this.onChange = this.onChange.bind( this );
        this.onMessageSubmit = this.onMessageSubmit.bind( this );
    }

    onChange( evt ) {
        const message = evt.currentTarget.value;
        this.setState( {
            message: message,
        } );
    }

    onMessageSubmit( evt ) {
        evt.preventDefault();
        const message = this.state.message.trim();
        if ( ! message ) {
            alert( 'Введите сообщение!' );
            return false;
        }
        this.props.onMessageSubmit( this.topicId, message, moment().format( 'YYYY-MM-DD HH:mm:ss' ), window.firebase.auth().currentUser.uid );
        this.setState( {
            message: '',
        } );
    }

    render() {
        if ( typeof undefined === typeof this.currentTopic ) {
            return (
                <Redirect to="/" />
            );
        }

        return (
            <div>
                <div className="row">
                    <div className="col">
                        <Link className="btn btn-primary btn-sm pull-right" to="/"><i className="fa fa-arrow-left"></i> { `Назад` }</Link>
                    </div>
                </div>
                <h5 className="mb-4 mt-3">{ `Тема` }: { this.currentTopic.title }</h5>
                <ul className="list-unstyled">
                    {
                        this.currentTopic.messages.map( ( msg, index ) => {
                            return (
                                <li key={ index }>
                                    <span><small>{ `ID пользователя` }: { msg.uid }</small></span>
                                    <br/>
                                    <span><small>[{ msg.timestamp }]</small></span>
                                    <p>{ msg.text }</p>
                                    <hr/>
                                </li>
                            );
                        } )
                    }
                </ul>
                {
                    ( this.props.isUserLoggedIn ) ?
                        <form>
                            <fieldset>
                                <legend><small>{ `Написать` }</small></legend>
                                <div className="form-group">
                                    <div className="col p-0">
                                        <textarea className="form-control" id="message" value={ this.state.message } onChange={ this.onChange } placeholder={ `...` }></textarea>
                                    </div>
                                </div>
                            </fieldset>
                            <button type="submit" className="btn btn-primary" onClick={ this.onMessageSubmit }>{ `Отправить` }</button>
                        </form>
                        :
                        <span>{ `Чтобы добавлять сообщения, пожалуйста,` } <Link to="/login/">{ `авторизуйтесь` }</Link></span>
                }
            </div>
        );
    }
};

const mapStateToProps = ( state ) => {
    return {
        isUserLoggedIn: state.isUserLoggedIn,
        topics: state.topics,
    };
};

const mapDispatchToProps = ( dispatch ) => {
    return {
        onMessageSubmit: ( topicId, message, timestamp, uid ) => dispatch( addMessage( topicId, message, timestamp, uid ) ),
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( Topic );