import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { withRouter } from "react-router";

class Pagination extends React.Component {
    constructor( props ) {
        super( props );

        let page = 1;
        if ( typeof this.props.page !== typeof undefined ) {
            page = parseInt( this.props.page );
        }

        this.state = {
            page: page,
        };

        this.perPage = 10;
        if ( typeof this.props.perPage !== typeof undefined ) {
            this.perPage = parseInt( this.props.perPage );
            if ( this.perPage == 0 ) {
                this.perPage = 1;
            }
        }
        this.totalItems = 0;
        if ( typeof this.props.items !== typeof undefined ) {
            this.totalItems = this.props.items.length;
        }
        this.totalPages = parseInt( this.totalItems / this.perPage );
        if ( this.totalItems % this.perPage > 0 ) {
            this.totalPages++;
        }

        this.previousPage = this.previousPage.bind( this );
        this.nextPage = this.nextPage.bind( this );
        this.mapPageToItems = this.mapPageToItems.bind( this );
    }

    componentDidMount() {
        this.mapPageToItems();
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

    componentDidUpdate( prevProps ) {
        if ( this.props.page !== prevProps.page ) {
            this.mapPageToItems();
        }
    }

    previousPage( evt ) {
        evt.preventDefault();
        if ( this.state.page > 1 ) {
            const previousPage = this.state.page - 1;
            this.props.history.push( '/page/' + previousPage + '/' );
        }
    }

    nextPage( evt ) {
        evt.preventDefault();
        if ( this.state.page < this.totalPages ) {
            const nextPage = this.state.page + 1;
            this.props.history.push( '/page/' + nextPage + '/' );
        }
    }

    mapPageToItems() {
        const items = this.props.items.filter( ( item, index ) => (
            ( index >= ( this.state.page - 1 ) * this.perPage ) && ( index < ( this.state.page * this.perPage ) )
        ) );
        this.props.mapPageToItems( items );
    }

    render() {
        if ( this.state.page < 1 || this.state.page > this.totalPages ) {
            return (
                <Redirect to="/page/1/" />
            );
        }

        let links = [];
        let link = null;
        if ( this.totalPages > 1 ) {
            link =
                <li key={ 0 } className={ "page-item " + ( ( this.state.page == 1 ) ? "disabled" : "" ) }>
                    <a className="page-link" href="#" onClick={ this.previousPage }>&laquo;</a>
                </li>;
            links.push( link );
            for ( let i = 1; i <= this.totalPages; i++ ) {
                link =
                    <li key={ i } className={ "page-item " + ( ( i == this.state.page ) ? "active" : "" ) }>
                        <Link className="page-link" to={ "/page/" + i + "/" }>{ i }</Link>
                    </li>
                links.push( link );
            }
            link =
                <li key={ this.totalPages + 1 } className={ "page-item " + ( ( this.state.page == this.totalPages ) ? "disabled" : "" ) }>
                    <a className="page-link" href="#" onClick={ this.nextPage }>&raquo;</a>
                </li>;
            links.push( link );
        }

        return (
            ( this.totalPages > 1 ) ?
                <ul className="pagination pagination-sm justify-content-center">
                    { links }
                </ul>
                :
                null
        );
    }
};

const mapStateToProps = ( state ) => {
    return {
        //
    };
};

const mapDispatchToProps = ( dispatch ) => {
    return {
        //
    };
};

export default withRouter( connect( mapStateToProps, mapDispatchToProps )( Pagination ) );