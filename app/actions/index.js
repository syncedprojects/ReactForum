export function addTopic( id, topicName ) {
    return {
        type: 'ADD_TOPIC',
        payload: {
            id: id,
            topicName: topicName,
        },
    };
}

export function addMessage( topicId, message, timestamp, uid ) {
    return {
        type: 'ADD_MESSAGE',
        payload: {
            topicId: topicId,
            message: message,
            timestamp: timestamp,
            uid: uid,
        },
    };
}

export function register( email, password ) {
    return function( dispatch ) {
        dispatch( {
            type: 'REGISTER_REQUEST',
        } );
        return window.firebase.auth().createUserWithEmailAndPassword( email, password )
            .then( function( data ) {
                dispatch( {
                    type: 'REGISTER_SUCCESS',
                    payload: {
                        data: data,
                    },
                } );
            } )
            .catch( function( error ) {
                dispatch( {
                    type: 'REGISTER_FAILURE',
                    payload: {
                        error: error,
                    },
                } );
            } );
    }
}

export function login( email, password ) {
    return function( dispatch ) {
        dispatch( {
            type: 'LOGIN_REQUEST',
        } );
        return window.firebase.auth().signInWithEmailAndPassword( email, password )
            .then( function( data ) {
                dispatch( {
                    type: 'LOGIN_SUCCESS',
                    payload: {
                        data: data,
                    },
                } );
            } )
            .catch( function( error ) {
                dispatch( {
                    type: 'LOGIN_FAILURE',
                    payload: {
                        error: error,
                    },
                } );
            } );
    }
}

export function resetRegisterErrors() {
    return {
        type: 'RESET_REGISTER_ERRORS',
    };
}

export function resetLoginErrors() {
    return {
        type: 'RESET_LOGIN_ERRORS',
    };
}

export function resetRegisterSuccess() {
    return {
        type: 'RESET_REGISTER_SUCCESS',
    };
}

export function resetLoginSuccess() {
    return {
        type: 'RESET_LOGIN_SUCCESS',
    };
}

export function authStateChange() {
    return {
        type: 'AUTH_STATE_CHANGE',
    };
}

export function signOut( evt ) {
    evt.preventDefault();
    return function( dispatch ) {
        return window.firebase.auth().signOut().then( function() {
                dispatch( {
                    type: 'LOGOUT_SUCCESS',
                } );
            } ).catch( function( error ) {
                dispatch( {
                    type: 'LOGOUT_FAILURE',
                } );
            } );
    }
}

export function resetLogoutErrors() {
    return {
        type: 'RESET_LOGOUT_ERRORS',
    };
}

export function clearAuthMessages() {
    return {
        type: 'CLEAR_AUTH_MESSAGES',
    };
}