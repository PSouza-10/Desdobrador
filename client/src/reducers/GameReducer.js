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
    RESET
} from '../actions/types'

const initialState = {

    Games : [],
    loading : false
  
}



export default function (state = initialState, action ){
    
    switch(action.type){
        case GAME_loading : return {
            ...state,
            loading : true
        }
        case GAME_load: return{
            Games : action.payload,
            loading : false
        }
        case GAME_post : return {
            Games :[...state.Games,action.payload],
            loading : false
        }
        case GAME_edit : return{
            Games : [edit(action.payload._id,state),action.payload],
            loading : false
        }
        case GAME_delete : return {
            Games : state.Games.filter(g => g._id !== action.payload.id )
        }
        case GAME_delete_FAIL:
        case GAME_edit_FAIL:
        case GAME_post_FAIL : 
                return {
                    ...state
                }
        case GAME_load_FAIL: return {
            Games : [],
            loading : false
        }
        case RESET : return {
            state : initialState
        }
        default : return state;
        
    }
}

function edit(id,state){
    let NewObj = state.Games.filter(game => game._id !== id)
    return NewObj
}
