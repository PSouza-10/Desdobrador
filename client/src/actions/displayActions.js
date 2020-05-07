import {
    
    DISPLAY_game

} from './types'


export const setDisplayGame = ({matrix,vector,result}) => dispatch => {
    dispatch({
        type : DISPLAY_game,
        payload : {
            matrix,
            vector,
            result
            
        }
    })
}


