import React, { Component } from 'react'
import { 
    FormGroup,
    Input,
    Label,
    Col,
    Row,
    Container,
    Button,
    Badge,
    CustomInput,
    Alert

} from 'reactstrap'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import MyGames from './Games/MyGames'
import Numeros from './Numeros'
import desdobrador from '../func'
import GameOptions from './Games/GameOptions'




class FormDezenas extends Component {
    constructor() {
        super();
         
        this.state = {
            nums : [],
            numExtra : null, 
            matriz : [],
            quantos : 0,
            resultado: "",
            res : [],
            acertos : [],
            ready : true
        }

        this.onChange = this.onChange.bind(this) 
        this.sendNums = this.sendNums.bind(this)
        this.changeExtra = this.changeExtra.bind(this) 
        this.conferir = this.conferir.bind(this)
        this.Limpar = this.Limpar.bind(this)
    }

    onChange(num){

        let isrepeat = this.state.nums.includes(num)
        
        if(num === '26') { 
            this.Limpar()
        }else {  

            if(isrepeat){
                let arr = this.state.nums.filter(n => n !== num)

                this.setState(prevState =>({
                    nums : arr,
                    quantos : prevState.quantos - 1
                }))
            }else{
                this.setState(prev => ({
                    nums : [...prev.nums,num],
                    quantos : prev.quantos + 1
                }))
            }
        }
        
    }
    

    changeExtra(e){
        
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    sendNums(){
        
        let ready =true
        let dezenas = this.state.nums.map(x =>{
            return parseInt(x,10)
        })
        let ref = Number(this.state.numExtra)

        if(dezenas.length === 16){
            ready = false
        }
        
        let mat = desdobrador(dezenas,ref)
        let resultadoArray = this.state.resultado.split(',').map(x => {
            return parseInt(x,10)
        })


        

    
        this.setState({
            matriz : mat,
            res : resultadoArray,
            ready : ready
            
        })

        this.conferir(mat,resultadoArray)
        
    }

    conferir(matriz,resultado){
        let ac = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

      

        matriz.map((line,i) => {

            for(let x =0;x<=14;x++){

                if(line.includes(resultado[x])){ 
                    console.log(`A linha ${i} inclui ${resultado[x]}`)
                    ac[i]++
                }
            }  
            return null  
        })

        this.setState({
            acertos : ac
        })

        
    }

    Limpar(){
        document.querySelectorAll('input[type=checkbox]').forEach( el => el.checked = false );
        this.setState({nums:[],quantos : 0})
    }
     
    
    render() {

        const dezenas = [
            ['1','2','3','4','5'],
            ['6','7','8','9','10'],
            ['11','12','13','14','15'],
            ['16','17','18','19','20'],
            ['21','22','23','24','25']
        ]
    
        return (
            <center>
                <Row className="mt-2">
                    <Col xl="3">

                        <FormGroup className="ml-2" >
                            <Label for="resultado">
                                Insira o resultado para comparação (entre vírgulas):
                            </Label>
                            <Input 
                            type="text" 
                            name="resultado"
                            
                            onChange={this.changeExtra}
                            ></Input>
                        </FormGroup>

                        <Container>

                            <center><div style={{color:this.state.quantos !== 16 ? "red":"green",marginBottom:"1%"}}>

                                {this.state.quantos} números escolhidos <Badge href="#"onClick={this.Limpar} color="danger">Limpar</Badge>
                                
                            </div></center>
    


                            
                            <table>
                                <tbody>
                                {
                                    dezenas.map((v,index) => (
                                
                                        <tr key={index}  >
                                    
                                            {
                                                                                            
                                                dezenas[index].map(n => (
                                                    
                                                    <td key={n}>
                                                        
                                                        <CustomInput
                                                            className="m-2" 
                                                            type="checkbox"
                                                            id={n}
                                                            key={n}
                                                            label={n} 
                                                            onChange={this.onChange.bind(this,n)}
                                                        />
                                                                                                    
                                                    </td>
                                                    
                                                ))

                                            }
                                    
                                        </tr>
                                    
                                    ))
                                }
                                </tbody>
                            </table>    
                         

                             
                                <Label 
                                    for="numExtra"
                                >Insira o número adicional do reforço : </Label>
                                <Input 
                                    type="number"
                                    name="numExtra"
                                    onChange={this.changeExtra}
                                ></Input>
                                    
                                <Button
                                    
                                    onClick={this.sendNums}
                                    disabled={this.state.quantos === 16 ? false : true}
                                    className="mt-2 mb-3"           
                                    color="success"
                                >
                                    Desdobrar
                                </Button>
                                {   this.props.authenticated ?
                                    <div>
                                        <GameOptions matrix={this.state.matriz} vector={this.state.nums} active={this.state.ready}/>
                                        <MyGames/>
                                    </div>
                                    : <Alert color="danger">Entre em uma conta para salvar jogos</Alert>
                                }
                        </Container>
                    </Col>
                    <Col xl="9">
                        <Numeros arr={this.state.matriz} res={this.state.res} ac ={this.state.acertos}/>
                    </Col>
                </Row>

               

            </center>
        )
        
    }
}

FormDezenas.propTypes = {
    authenticated : PropTypes.bool,
     
}

const mapStateToProps = state => ({
    authenticated : state.Auth.authenticated
    
   
});


export default connect(mapStateToProps,{})(FormDezenas)