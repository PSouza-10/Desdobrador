import React , {Component} from 'react';
import{Table, Button} from 'reactstrap'
import {setDisplayGame} from '../actions/displayActions'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

class Numeros extends Component {
    constructor(props) {
        super(props)
        this.changeGame = this.changeGame.bind(this)
        this.countPoints = this.countPoints.bind(this)
        this.state = {
            first : false,
            last : false,
            count : [0,0,0,0,0,0],
            dezenas : 0        
        }
    }

    changeGame(e){
        let newGame

        let n = parseInt(e.target.name,10)

        this.props.Games.map( (g,i) =>{
            if (g._id === this.props.Display._id){
                
                newGame = i + n
            }
            return null
        })


        const game = {
            ...this.props.Games[newGame],
            index : newGame
        }

        this.props.setDisplayGame(game)

    }
    
    countPoints(arr){
        this.setState({count: [0,0,0,0,0,0]})

        let newCount = [0,0,0,0,0,0]
        arr.forEach( n => {
            if(n >= 10){
                newCount[n - 10]++
            }
        });

        let dezenas = 0
        this.props.Display.vector.map(n =>{
            if(this.props.Display.result.includes(n)){
                dezenas++
            }
            return null
        }) 

        this.setState({count :newCount,dezenas})
    }

    componentDidUpdate(prevProps){
        if(prevProps !== this.props){
            this.countPoints(this.props.Display.points)
        }  
    }
   
    render(){
        function acStyle (n) {
            

            switch(n){
                case 8 :return{
                    color : "white",
                    backgroundColor :"#1db1f5"
                }
                case 9 :return{
                    color : "white",
                    backgroundColor :"black"
                }
                case 10 :

                return{
                    color : "white",
                    backgroundColor :"brown"
                }
                case 11 :return{
                    color : "white",
                    backgroundColor :"#1db1f5"
                }
                case 12 :return{
                    color : "white",
                    backgroundColor :"green"
                }
                case 13 : return{
                    color : "white",
                    backgroundColor :"red"
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
            this.props.Display.active ? 
            <div>
                <Table bordered style={{width:'66vw'}} >
                    <tbody>
                    {
                            this.props.Display.result[0] ?
                            
                            <tr style={{backgroundColor:"blue",color:"white"}}>
                                <td>Res : </td>
                                    {

                                        this.props.Display.result.map((n,index) => (

                                            <td >
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
                    </tbody>
                </Table>
                
            
                <div style={{maxHeight:"90vh",overflowY:'auto'}}>    
                <Table bordered hover style={{width:'66vw'}}>
                    <tbody>
                        
                        
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
                 
                {
                    this.props.Display._id ? 
                <div className="d-flex justify-content-evenly">
                    <Button
                        color = "success"
                        className="mr-2"
                        name = "-1"
                        onClick={this.changeGame}
                        disabled = {this.props.Display.index === 0 ? true : false }
                    >Anterior</Button>
                    <Button
                        onClick={this.changeGame}
                        color = "success"
                        name ="1"
                        disabled = {this.props.Display.index === this.props.Games.length-1}
                    >Próximo</Button>
                    
                    <div className="ml-3 lead">{this.props.Display.name}: {this.state.dezenas} acertos nas iniciais</div>   
                </div>
                 :
                null
                }
                <Table>
                        <tbody>
                            <tr>
                            {
                                this.state.count.map( (n,i) => (
                                    <th>{i + 10}</th>
                                ))
                            }
                            </tr>
                            <tr>
                                {
                                    this.state.count.map( (n,i) => (
                                        <td>{n}</td>
                                    ))
                                }
                            </tr>
                        </tbody>
                    </Table>  
            </div>
            :
            null
        )
    }
} 

Numeros.propTypes = {
    Display : PropTypes.object,
    Games : PropTypes.array,
    setDisplayGame : PropTypes.func.isRequired

}

const mapStateToProps = state => ({
  Display : state.Display,
  Games : state.Games.Games
});

export default connect(mapStateToProps,{setDisplayGame})(Numeros)