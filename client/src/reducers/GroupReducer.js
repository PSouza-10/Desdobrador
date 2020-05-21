import { 
    GROUP_load,
    GROUP_load_fail,
    GROUP_delete,
    GROUP_delete_fail,
    GROUP_edit,
    GROUP_edit_fail,
    GROUP_post,
    GROUP_post_fail,
    RESET
} from '../actions/types'

const initialState = {
    groups : []
   
}

export default function (state = initialState, action ){
    
    switch(action.type){
        case GROUP_load : return {
            groups : action.payload
        }
        case GROUP_post : return {
            groups : [action.payload,...state.groups]
        }
        case GROUP_edit : return{
            groups : [action.payload,...edit(action.payload._id,state)]
        }
        case GROUP_delete : return{
            groups : state.groups.filter(g => g._id !== action.payload )
        }
        case GROUP_load_fail:
        case GROUP_delete_fail:
        case GROUP_post_fail:
        case GROUP_edit_fail : return {
            ...state
        }

        case RESET : return {
            state : initialState
        }
        default : return state;
        
    }
}

function edit(id,state){
    let NewObj = state.groups.filter(g => g._id !== id)
    return NewObj
}
