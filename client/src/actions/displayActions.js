import {
    
    DISPLAY_game,
    SET_NUMBERS

} from './types'


export const setDisplayGame = ({matrix,vector,result,_id,index,name}) => dispatch => {
    
    dispatch({
        type : DISPLAY_game,
        payload : {
            matrix,
            _id,
            vector,
            result,
            index,
            name
            
        }
    })
}

export const SetNumbers = (arr) => dispatch =>{
   
    dispatch({
        type:SET_NUMBERS,
        payload : arr
    })
}

export const clearRow = () => dispatch => {
    dispatch({
        type: SET_NUMBERS,
        payload : [0]
    })
}