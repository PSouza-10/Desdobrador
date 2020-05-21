import React from 'react'
import {
    Table,
    
} from 'reactstrap'

const DisplayGame = (props) => {
    
    return(
        <center>
            <div style={{fontSize: "2em"}}>
                {props.game.name}
                <br></br>
            </div>
                    <div>Dezenas Iniciais : </div>
            <Table>
                <tbody>
                    <tr>

                        {props.game.vector.map( n => (
                            <td style={{backgroundColor:"blue",color:"white"}}>{n}</td>
                        ))}
                    </tr>
                </tbody>
            </Table>    
               
                <div>Desdobramento :</div>
            
            <div style={{maxHeight:"50vh",overflowY:'auto'}}>

                <Table hover>
                    <tbody>
                        {
                            props.game.matrix.map((v,index) => ( 
                                <tr>
                                    <td style={{backgroundColor:"#333",color:"white"}}>{(index + 1)+"ª"}</td>

                                    {
                                        props.game.matrix[index].map( n => (
                                            <td>{n}</td>
                                            ))
                                    }
                                </tr>
                            ))
                        }
                    </tbody>
                                
                </Table>   
            </div>
            </center>
        
        
     
    )
}

export default DisplayGame