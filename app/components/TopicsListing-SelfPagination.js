import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class TopicsListing extends React.Component {
    constructor( props ) {
        super( props );

        let page = 1;
        const perPage = 2;
        const totalItems = this.props.topics.length;
        let totalPages = parseInt( totalItems / perPage );
        if ( totalItems % perPage > 0 ) {
            totalPages++;
        }

        if ( this.props.match.params.page ) {
            page = parseInt( this.props.match.params.page );
        }

        this.state = {
            page: page,
            perPage: perPage,
            totalItems: totalItems,
            totalPages: totalPages,
        };

        this.previousPage = this.previousPage.bind( this );
        this.nextPage = this.nextPage.bind( this );
    }

    static getDerivedStateFromProps( props, state ) {
        let page = 1;
        if ( props.match.params.page ) {
            page = parseInt( props.match.params.page );
        }
        return {
            page: page,
        };
    }

    previousPage( evt ) {
        evt.preventDefault();
        const page = this.state.page;
        if ( page > 1 ) {
            const previousPage = page - 1;
            this.props.history.push( '/page/' + previousPage + '/' );
        }
    }

    nextPage( evt ) {
        evt.preventDefault();
        const page = this.state.page;
        if ( page < this.state.totalPages ) {
            const nextPage = page + 1;
            this.props.history.push( '/page/' + nextPage + '/' );
        }
    }

    render() {
        if ( this.state.page < 1 || this.state.page > this.state.totalPages ) {
            return (
                <Redirect to="/page/1/" />
            );
        }

        let links = [];
        let link = null;
        if ( this.state.totalPages > 1 ) {
            link =
                <li key={ 0 } className={ "page-item " + ( ( this.state.page == 1 ) ? "disabled" : "" ) }>
                    <a className="page-link" href="#" onClick={ this.previousPage }>&laquo;</a>
                </li>;
            links.push( link );
            for ( let i = 1; i <= this.state.totalPages; i++ ) {
                link =
                    <li key={ i } className={ "page-item " + ( ( i == this.state.page ) ? "active" : "" ) }>
                        <Link className="page-link" to={ "/page/" + i + "/" }>{ i }</Link>
                    </li>
                links.push( link );
            }
            link =
                <li key={ this.state.totalPages + 1 } className={ "page-item " + ( ( this.state.page == this.state.totalPages ) ? "disabled" : "" ) }>
                    <a className="page-link" href="#" onClick={ this.nextPage }>&raquo;</a>
                </li>;
            links.push( link );
        }

        const topics = this.props.topics.filter( ( item, index ) => (
            ( index >= ( this.state.page - 1 ) * this.state.perPage ) && ( index < ( this.state.page * this.state.perPage ) )
        ) );

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
                        topics.map( ( topic, index ) => {
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
                {
                    ( this.state.totalPages > 1 ) ?
                        <div>
                            <ul className="pagination pagination-sm justify-content-center">
                                { links }
                            </ul>
                        </div>
                        :
                        null
                }
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