import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from '../actions/types';

const IniState = {
    token : localStorage.getItem('token'),
    isLoading : false,
    authenticated : null,
    user : null 
}

export default function ( state = IniState, action){
    switch(action.type){
        case USER_LOADING : return{
            ...state,
            isLoading :true
        }
        case USER_LOADED : 
        
        return{
            ...state,
            isLoading : false,
            authenticated : true,
            user : action.payload
        }
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                ...action.payload,
                isLoading : false,
                authenticated : true
            }
        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
        case AUTH_ERROR:
            
            localStorage.removeItem('token')    
            
            return{
                ...state,
                token :  null,
                authenticated : false,
                user : null,
                isLoading : false
            }
        default : return state
    }
}