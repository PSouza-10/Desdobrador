import {
    
    GROUP_delete,
    GROUP_edit,
    GROUP_post,
    GROUP_edit_fail,
    GROUP_delete_fail,
    GROUP_post_fail,
    GROUP_load,
    GROUP_load_fail

} from './types'
import axios from 'axios'
import {tokenConfig} from './authActions'
import { returnErrors } from './errorActions'

export const loadGroups = () => (dispatch,getState) => {
    axios.get('/api/jogos/grupos', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GROUP_load,
                payload : res.data
            })
        }).catch( err => {
            dispatch(returnErrors(err.response.data,err.response.status, 'GROUP_load_fail'))
            dispatch({
                type : GROUP_load_fail
            })
        })
}

export const groupPost = (nome) => ( dispatch ,getState) => {
    const body = JSON.stringify({
        nome
    })

    axios.post('/api/jogos/grupos',body,tokenConfig(getState))
        .then( res => {
            dispatch({
                type : GROUP_post,
                payload : res.data
            })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data,err.response.status, 'GROUP_post_fail'))
            dispatch({
                type : GROUP_post_fail
            })
        })
}

export const editGroup = ({_id,nome,jogos,user}) => (dispatch,getState ) => {
    const body = JSON.stringify({nome,jogos,user})
    console.log(body)
    axios.put(`/api/jogos/grupos/${_id}`,body,tokenConfig(getState))
        .then( res => {
            dispatch({
                type : GROUP_edit,
                payload : res.data
            })
           
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data,err.response.status, 'GROUP_edit_fail'))
            dispatch({
                type : GROUP_edit_fail
            })
        })
}

export const deleteGroup = (id) => (dispatch,getState ) => {

    console.log(id)

    axios.delete(`/api/jogos/grupos/${id}`,tokenConfig(getState))
        .then( res => {
            dispatch({
                type : GROUP_delete,
                payload : res.data
            })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data,err.response.status, 'GROUP_delete_fail'))
            dispatch({
                type : GROUP_delete_fail
            })
        })
}
