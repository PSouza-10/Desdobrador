import React , {Component} from 'react';
import{Table} from 'reactstrap'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

class Numeros extends Component {
    
   

   
    
    render(){
        function acStyle (n) {
            

            switch(n){
                case 12 :
                case 13 : return{
                    color : "white",
                    backgroundColor :"#1db1f5"
                }
                case 14 : return{
                    color: "white",
                    backgroundColor : "purple"
                } 
                case 15 : return {
                    color : "white",
                    backgroundColor : "#ffbf00"
                }
                default : return {
                    color : "black",
                    backgroundColor : "grey"
                }

            }
       }

        return(
            
            <div style={{maxHeight:"90vh",overflowY:'auto'}}>    
            <Table bordered hover style={{width:'66vw'}}>
                <tbody>
                    
                    {
                        this.props.Display.result[0]  ?
                        
                        <tr style={{backgroundColor:"blue",color:"white"}}>
                            <td>Res : </td>
                                {

                                    this.props.Display.result.map((n,index) => (

                                        <td style={{padding:"0rem",margin:"0px0px"}}>
                                            {n }
                                        </td>
                                    ))
                                
                                }
                            <td></td>
                            <td>Qt. Acertos</td>
                        </tr>
                        
                        :

                        null
                    }   
                    {
                        
                        this.props.Display.matrix.length > 1 ? 

                        this.props.Display.matrix.map((v,index) => (
                            
                            <tr >
                                <td style={{
                                    backgroundColor : "#333333",
                                    color : "white"
                                }}>{index + 1}ª</td>
                                {
                                    
                                    
                                    this.props.Display.matrix[index].map(n => (
                                        <td
                                            
                                        >
                                        {n}</td>
                                        
                                    ))

                                }
                                
                                <td style={acStyle(this.props.Display.points[index])}>{this.props.Display.points[index]}</td>
                            </tr>
                        )) 
                        :
                        null
                    }
                    
                </tbody>
            </Table>
            </div>
            
        )
    }
} 

Numeros.propTypes = {
    Display : PropTypes.object

}

const mapStateToProps = state => ({
  Display : state.Display
});

export default connect(mapStateToProps,{})(Numeros)