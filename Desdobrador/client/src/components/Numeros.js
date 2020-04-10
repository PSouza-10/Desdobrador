import React , {Component} from 'react';
import{Table} from 'reactstrap'

class Numeros extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            match : []
        }

       
    }

   
    
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
            
            <div style={{maxHeight:"80vh",overflowY:'auto'}}>    
            <Table bordered hover style={{width:'66vw'}}>
                <tbody>
                    
                    {
                        this.props.res[0]  ?
                        
                        <tr style={{backgroundColor:"blue",color:"white"}}>
                            <td>Res : </td>
                                {

                                    this.props.res.map((n,index) => (

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
                        
                        

                        this.props.arr.map((v,index) => (
                            
                            <tr >
                                <td style={{
                                    backgroundColor : "#333333",
                                    color : "white"
                                }}>{index + 1}ª</td>
                                {
                                    
                                    
                                    this.props.arr[index].map(n => (
                                        <td
                                            
                                        >
                                        {n}</td>
                                        
                                    ))

                                }
                                
                                <td style={acStyle(this.props.ac[index])}>{this.props.ac[index]}</td>
                            </tr>
                        ))
                    }
                    
                </tbody>
            </Table>
            </div>
            
        )
    }
} 



export default Numeros