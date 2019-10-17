import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addTopic } from '../actions/index';
import uuid from 'uuid';

class AddTopicForm extends React.Component {
    constructor( props ) {
        super( props );

        this.state = {
            id: '',
            topicName: '',
        };

        this.onChange = this.onChange.bind( this );
        this.onSubmit = this.onSubmit.bind( this );
    }

    onChange( evt ) {
        const topicName = evt.currentTarget.value;
        this.setState( {
            topicName: topicName,
        } );
    }

    onSubmit( evt ) {
        evt.preventDefault();
        const topicName = this.state.topicName.trim();
        if ( ! topicName ) {
            alert( 'Введите название темы!' );
            return false;
        }
        const id = uuid.v4();
        this.props.onSubmit( id, topicName );
        this.props.history.push( '/' );
    }

    render() {
        return (
            <React.Fragment>
                <div className="row">
                    <div className="col">
                        <Link className="btn btn-primary btn-sm pull-right" to="/"><i className="fa fa-arrow-left"></i> { `Назад` }</Link>
                    </div>
                </div>
                <form>
                    <fieldset>
                        <legend>{ `Новая тема` }</legend>
                        <div className="form-group">
                            <label htmlFor="topicName" className="col-form-label">{ `Название` }</label>
                            <div className="col p-0">
                                <input className="form-control" id="topicName" value={ this.state.topicName } type="text" onChange={ this.onChange } />
                            </div>
                        </div>
                    </fieldset>
                    <button type="submit" className="btn btn-primary" onClick={ this.onSubmit }>{ `Создать` }</button>
                </form>
            </React.Fragment>
        );
    }
}

const mapStateToProps = ( state ) => {
    return {};
};

const mapDispatchToProps = ( dispatch ) => {
    return {
        onSubmit: ( id, topicName ) => dispatch( addTopic( id, topicName ) ),
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( AddTopicForm );