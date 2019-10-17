import initialState from '../initialState';

function rootReducer( state = initialState, action ) {
    let newState = Object.assign( {}, state );
    switch ( action.type ) {
        case 'ADD_TOPIC':
            newState.topics = newState.topics.concat( {
                id: action.payload.id,
                title: action.payload.topicName,
                messages: [],
            } );
            return newState;
        case 'ADD_MESSAGE':
            let topics = newState.topics.filter( ( item ) => ( item.id == action.payload.topicId ) );
            topics[ 0 ].messages = topics[ 0 ].messages.concat( {
                text: action.payload.message,
                timestamp: action.payload.timestamp,
                uid: action.payload.uid,
            } );
            return newState;
        case 'LOGIN_REQUEST':
            newState.loginRequested = true;
            return newState;
        case 'LOGIN_SUCCESS':
            newState.loginRequested = false;
            newState.isUserLoggedIn = true;
            newState.loginSuccessMessage = 'Вы успешно вошли в систему.';
            return newState;
        case 'LOGIN_FAILURE':
            newState.loginRequested = false;
            if ( action.payload.error.code == 'auth/user-not-found' ) {
                newState.loginErrorMessage = 'Пользователь с такими данными не найден!';
            }
            else {
                newState.loginErrorMessage = 'Ошибка при входе в систему.';
            }
            return newState;
        case 'RESET_LOGIN_ERRORS':
            newState.loginErrorMessage = '';
            return newState;
        case 'REGISTER_REQUEST':
            newState.registerRequested = true;
            return newState;
        case 'REGISTER_SUCCESS':
            newState.registerRequested = false;
            newState.isUserLoggedIn = true;
            newState.registerSuccessMessage = 'Вы успешно прошли регистрацию в системе.';
            return newState;
        case 'REGISTER_FAILURE':
            newState.registerRequested = false;
            newState.registerErrorMessage = 'Ошибка при регистрации.';
            return newState;
        case 'RESET_REGISTER_ERRORS':
            newState.registerErrorMessage = '';
            return newState;
        case 'AUTH_STATE_CHANGE':
            newState.isUserLoggedIn = true;
            return newState;
        case 'LOGOUT_SUCCESS':
            newState.isUserLoggedIn = false;
            return newState;
        case 'LOGOUT_FAILURE':
            newState.logoutErrorMessage = 'Ошибка при выходе из системы. Попробуйте ещё раз.';
            return newState;
        case 'RESET_LOGOUT_ERRORS':
            newState.logoutErrorMessage = '';
            return newState;
        case 'CLEAR_AUTH_MESSAGES':
            newState.loginSuccessMessage = '';
            newState.registerSuccessMessage = '';
            return newState;
        default:
            return state;
    }
}

export default rootReducer;