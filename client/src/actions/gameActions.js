import {
    
    GAME_post,
    GAME_post_FAIL,
    GAME_load,
    GAME_load_FAIL,
    GAME_edit,
    GAME_edit_FAIL,
    GAME_delete_FAIL,
    GAME_delete,
    GAME_loading,

} from './types'
import axios from 'axios'
import {tokenConfig} from './authActions'
import { returnErrors } from './errorActions'




export const getGames = () => (dispatch,getState) => {
    
    const user = getState().Auth.user

    if(!user){
        return dispatch({
            type : GAME_load_FAIL
        })

    }
   
    dispatch(setLoading())
    
    axios
        .get(`/api/jogos`,tokenConfig(getState))
        .then(res =>
            dispatch({
                type : GAME_load,
                payload : res.data
            })
        ).catch( err => {
            dispatch(returnErrors(err.response.data,err.response.status, 'GAME_load_FAIL'))
            dispatch({
                type : GAME_load_FAIL
            })
        })
    
}

export const postGame = ({matrix,vector,name,user}) => (dispatch,getState) => {

    const body = JSON.stringify({matrix,vector,name,user})


    axios.post('/api/jogos',body,tokenConfig(getState))
    .then(res => {
            dispatch(returnErrors('Sucesso',200, 'GAME_post_SUCCESS'))
            dispatch({
                type: GAME_post,
                payload : res.data
            })       
        }
    ).catch( err => {
        dispatch(returnErrors(err.response.data,err.response.status, 'GAME_post_FAIL'))
        dispatch({
            type : GAME_post_FAIL
        })
    })
   
}

export const editGame = (id,name) => (dispatch,getState) => {
    
    const body = JSON.stringify({name})
    
    
    axios
        .put(`/api/jogos/${id}`,body,tokenConfig(getState))
        .then(res =>{
            console.log(res.data)
            dispatch ({
                type : GAME_edit,
                payload : res.data
            })
        } 
            
        ).catch(err => {
            dispatch(returnErrors(err.response.data,err.response.status, 'GAME_edit_FAIL'))
            dispatch({
                type : GAME_edit_FAIL
            })
        })
    

}

export const deleteGame = (id) => (dispatch,getState) => {
    axios
        .delete(`/api/jogos/${id}`,tokenConfig(getState))
        .then(res => dispatch({
                type: GAME_delete,
                payload : res.data
            })
        ).catch( err => {
            dispatch(returnErrors(err.response.data,err.response.status, 'GAME_delete_FAIL'))
            dispatch({
                type : GAME_delete_FAIL
            })
        })
}



export const setLoading = () => {
    return {
        type: GAME_loading
    }
}

