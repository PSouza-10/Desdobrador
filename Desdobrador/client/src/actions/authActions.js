import axios from 'axios'
import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
   
} from './types';

import {returnErrors} from './errorActions'

// Check Token
export const loadUser = () => (dispatch,getState) => {
    dispatch(userLoading())

    axios
        .get('/api/auth/user', tokenConfig(getState))
        .then(res => dispatch({
                type : USER_LOADED,
                payload : res.data
            })
        ).catch(err => {
            dispatch(returnErrors(err))
            dispatch({
                type : AUTH_ERROR
            })
        })
}

export const registerUser = ({name,email,password}) => dispatch => {
    
   

    const config = {
        headers : {
            'Content-Type' : 'application/json'
        }
    }

    const body = JSON.stringify({name,email,password})

    

    axios
        .post('/api/auth/user', body , config )
        .then(res => dispatch({
                type : REGISTER_SUCCESS,
                payload : res.data
            })
        ).catch(err => {
            dispatch(returnErrors(err.response.data,err.response.status,'REGISTER_FAIL'))
            dispatch({
                type : REGISTER_FAIL
            })
        })
}

export const loginUser = ({email,password})=> dispatch => {
    
    const config = {
        headers : {
            'Content-Type' : 'application/json'
        }
    }

    const body = JSON.stringify({email,password})

    axios
        .post('/api/auth',body,config)
        .then(res => dispatch({
                type : LOGIN_SUCCESS,
                payload : res.data
            })
        ).catch(err => {
            dispatch(returnErrors(err.response.data,err.response.status,'LOGIN_FAIL'))
            dispatch({
                type : LOGIN_FAIL
            })
        })
    
}

export const logout = ()  => {
    
    return {
        type : LOGOUT_SUCCESS
    }
}


export function tokenConfig (getState) {

    const token = getState().Auth.token
    
    const config ={
        headers : {
            'Content-Type' : 'Application/json'
        }
    }



    if(token){
        config.headers['x-auth-token'] = token
    }

   

    return config
}

export const userLoading = () => {
    return {
        type: USER_LOADING
    }
}