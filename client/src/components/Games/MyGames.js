import React, { Component } from 'react';
import {getGames,deleteGame,editGame}  from '../../actions/gameActions'
import {setDisplayGame} from '../../actions/displayActions'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import {
    Button,
    Modal,
    ModalBody,
    ModalHeader,
    Input,
    Label,
    Alert,
    ListGroup,
    ListGroupItem,
    Row,
    Col,
    Table,
    Badge
    
} from 'reactstrap'

class MyGames extends Component {
    constructor(props) {
        super(props);
        
        this.state={
            Modal : false,
            selectedGame : {
                matrix : [[]],
                vector : [],
                _id : "",
                name : "",
                user : ""
                
            },
            index : null,
            editModal : false,
            newName : "",
            msg : null
        }

        this.toggleModal = this.toggleModal.bind(this)
        this.selectGame = this.selectGame.bind(this)
        this.deleteGame = this.deleteGame.bind(this)
        this.editGame = this.editGame.bind(this)
        this.onChange = this.onChange.bind(this)
        this.visualizarJogo = this.visualizarJogo.bind(this)
    }
    
    toggleModal(name){
        if(name === 'open'){
            this.setState({
                Modal : !this.state.Modal
            })
        }

        if(name === 'edit'){
            this.setState({
                editModal : !this.state.editModal        
            })
        }

    
    }


    componentDidMount(prevProps,prevState){
        
        this.props.getGames()    
        
    }

   

    selectGame(game,index){
        this.setState({selectedGame : game,index})
    }

    onChange(e){
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    editGame(){

        const change = this.state.newName

        if(change === '' || change === this.state.selectedGame.name){
            this.setState({msg : "O nome não pode ser o mesmo, ou ficar vazio"})
        }else{
            this.props.editGame(this.state.selectedGame._id,this.state.newName)

            this.setState({
                selectedGame : {
                    matrix : [[]],
                    vector : [],
                    name : "",
                    user : ""
                }
            })

            setTimeout(() => {
                this.props.getGames()
                this.toggleModal('edit') 
            }, 500);
        }
    }

    deleteGame(){
        const id = this.state.selectedGame._id

        this.props.deleteGame(id)

        this.setState({
            selectedGame : {
                matrix : [[]],
                vector : [],
                name : "",
                user : ""
            }
        })
    }

    visualizarJogo(){
        const {matrix,vector,_id,name} = this.state.selectedGame

        const game = {
            matrix,
            _id,
            vector,
            result:null,
            index : this.state.index,
            name  
        }

        this.props.setDisplayGame(game)
        this.toggleModal('open')

    }
  
    render() {
        return (
            <div>
                <Button
                    onClick={this.toggleModal.bind(this,'open')}
                    disabled={!this.props.authenticated}
                    color="success"
                    className="mt-2"
                >
                    Meus Jogos
                </Button>
                <Modal
                    toggle={this.toggleModal.bind(this,'open')}
                    isOpen={this.state.Modal}
                    size="xl"
                >
                    <ModalHeader toggle={this.toggleModal.bind(this,'open')}>Meus Jogos</ModalHeader>
                    <ModalBody>
                        
                        <Row>
                            
                                <Col xl="9">
                            { this.state.selectedGame.user ?
                                    <center>
                                    <div style={{fontSize: "2em"}}>
                                        {this.state.selectedGame.name}
                                        <br></br>
                                        <Badge color="secondary"
                                            href="#"
                                            onClick={this.toggleModal.bind(this,'edit')}
                                        >Renomear</Badge>
                                    </div>
                                            <div>Dezenas Iniciais : </div>
                                    <Table>
                                        <tbody>
                                            <tr>

                                                {this.state.selectedGame.vector.map( n => (
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
                                                    this.state.selectedGame.matrix.map((v,index) => ( 
                                                        <tr>
                                                            <td style={{backgroundColor:"#333",color:"white"}}>{(index + 1)+"ª"}</td>

                                                            {
                                                                this.state.selectedGame.matrix[index].map( n => (
                                                                    <td>{n}</td>
                                                                    ))
                                                            }
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                                        
                                        </Table>   
                                    </div>
                                    <Button
                                        color="success"
                                        onClick={this.visualizarJogo}
                                        className="mr-2"
                                    >
                                        Exportar
                                    </Button>
                                    <Button
                                        color="danger"
                                        onClick={this.deleteGame}
                                        >
                                        Deletar
                                    </Button>
                                    </center>
                                        :
                                <center style={{fontSize:"3em"}}>Selecione um jogo, se não houver nenhum salve para vê-los aqui. </center>
                            }
                                </Col>
                            <Col xl="3">
                            <div style={{maxHeight:"80vh",overflowY:'auto'}}>
                                <ListGroup>
                                {
                                    

                                    this.props.Games.map((game,i) => (
                                        <ListGroupItem
                                            href="#" action tag="a" key={game.name}
                                            onClick={this.selectGame.bind(this,game,i)}
                                        >{game.name + " (" + game.tipo +" dezenas)" }</ListGroupItem>
                                    ))
                                    
                                }
                                    </ListGroup>
                                    </div>
                            </Col>
                        </Row>
                           
                            

                            
                        
                    </ModalBody>
                </Modal>
                <Modal
                    toggle={this.toggleModal.bind(this,'edit')}
                    isOpen={this.state.editModal}
                    size="xs"
                >
                    <ModalHeader toggle={this.toggleModal.bind(this,'edit')}>Editar</ModalHeader>
                    <ModalBody>
                        {this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : null }
                        <center>
                             <Label for="newName">Novo nome para o Jogo :</Label>   
                            <Input type="text" name="newName" onChange={this.onChange}></Input>
                            <Button className="mt-2" color ="success" onClick={this.editGame}> Salvar </Button>
                        
                        </center>
                    </ModalBody>
                </Modal>
            </div>
        )
  }
}

MyGames.propTypes = {
    authenticated : PropTypes.bool.isRequired,
    user : PropTypes.object,
    loading : PropTypes.bool.isRequired,
    Games : PropTypes.array,
    getGames : PropTypes.func.isRequired,
    deleteGame : PropTypes.func.isRequired,
    editGame : PropTypes.func.isRequired,
    setDisplayGame: PropTypes.func.isRequired,

}

const mapStateToProps = state => ({
    authenticated :  state.Auth.authenticated,
    user : state.Auth.user,
    Games : state.Games.Games,
    loading : state.Games.loading
});


export default connect(
  mapStateToProps,{getGames,deleteGame,editGame,setDisplayGame}
)(MyGames);
