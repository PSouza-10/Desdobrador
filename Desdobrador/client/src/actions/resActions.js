import {
    
    RES_delete,
    RES_delete_FAIL,
    RES_load,
    RES_load_FAIL,
    RES_post,
    RES_post_FAIL

} from './types'
import axios from 'axios'
import {tokenConfig} from './authActions'
import { returnErrors } from './errorActions'




export const getRes = () => (dispatch,getState) => {
    
   
    
    axios
        .get(`http://localhost:5000/api/jogos/resultados`,tokenConfig(getState))
        .then(res =>{
            
            dispatch({
                type : RES_load,
                payload : res.data
            })
        } 
        ).catch( err => {
            dispatch(returnErrors(err.response.data,err.response.status, 'RES_load_FAIL'))
            dispatch({
                type : RES_load_FAIL
            })
        })
    
}

export const postRes = ({vector,name}) => (dispatch,getState) => {

    const body = JSON.stringify({vector,name})


    axios.post('http://localhost:5000/api/jogos/resultados',body,tokenConfig(getState))
    .then(res => {
            dispatch(returnErrors('Sucesso',200, 'RES_post_SUCCESS'))
            dispatch({
                type: RES_post,
                payload : res.data
            })       
        }
    ).catch( err => {
        dispatch(returnErrors(err.response.data,err.response.status, 'RES_post_FAIL'))
        dispatch({
            type : RES_post_FAIL
        })
    })
   
}


export const deleteRes = (id) => (dispatch,getState) => {
    axios
        .delete(`http://localhost:5000/api/jogos/resultados/${id}`,tokenConfig(getState))
        .then(res => dispatch({
                type: RES_delete,
                payload : res.data
            })
        ).catch( err => {
            dispatch(returnErrors(err.response.data,err.response.status, 'RES_delete_FAIL'))
            dispatch({
                type : RES_delete_FAIL
            })
        })
}
