import {
    
    DISPLAY_game

} from './types'


export const setDisplayGame = ({matrix,vector,result,_id}) => dispatch => {
    dispatch({
        type : DISPLAY_game,
        payload : {
            matrix,
            _id,
            vector,
            result
            
        }
    })
}


