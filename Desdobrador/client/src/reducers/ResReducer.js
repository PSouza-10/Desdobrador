import {
    
    RES_delete,
    RES_delete_FAIL,
    RES_load,
    RES_load_FAIL,
    RES_post,
    RES_post_FAIL

} from '../actions/types'

const initialState = {

    Results : []

  
}



export default function (state = initialState, action ){
    
    switch(action.type){
        
        case RES_load : return{
            Results : action.payload
        }
        case RES_delete : return{
            Results : edit(action.payload,state)
        }
        case RES_post : return {
            Results : [...state.Results,action.payload]
        }
        case RES_delete_FAIL:
        case RES_post_FAIL : 
            return {
                ...state
            }   
        case RES_load_FAIL :return{
            Results : []
        } 
        default : return state;
        
    }
}

function edit(id,state){
    let NewObj = state.Results.filter(res => res._id !== id)
    return NewObj
}

