import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Pagination from './Pagination';

class TopicsListing extends React.Component {
    constructor( props ) {
        super( props );

        this.state = {
            topics: [],
        };

        this.mapPageToItems = this.mapPageToItems.bind( this );
    }

    mapPageToItems( items ) {
        this.setState( {
            topics: items,
        } );
    }

    render() {
        return (
            <div>
                <div className="row mb-4">
                    <div className="col">
                        <h5 className="pull-left">{ `Темы` }</h5>
                    </div>
                    <div className="col">
                        <Link className="btn btn-primary btn-sm pull-right" to="/add-topic/">{ `Новая тема` }</Link>
                    </div>
                </div>
                <table className="table">
                    <tbody>
                    {
                        this.state.topics.map( ( topic, index ) => {
                            return (
                                <tr key={ index }>
                                    <td>
                                        <Link to={ "/topic/" + topic.id + "/" }>{ topic.title }</Link>
                                    </td>
                                    <td>
                                        <span className="badge badge-primary">{ topic.messages.length }</span>
                                    </td>
                                </tr>
                            );
                        } )
                    }
                    </tbody>
                </table>
                <Pagination page={ this.props.match.params.page } perPage={ 10 } items={ this.props.topics } mapPageToItems={ this.mapPageToItems } />
            </div>
        );
    }
};

const mapStateToProps = ( state ) => {
    return {
        topics: state.topics,
    };
};

const mapDispatchToProps = ( dispatch ) => {
    return {
        //
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( TopicsListing );