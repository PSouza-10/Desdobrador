import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Button,
    Modal,
    ModalBody,
    ModalHeader,
    Input,
    Label,
    Alert
    
} from 'reactstrap'
import {clearErrors} from '../../actions/errorActions'
import {postGame} from '../../actions/gameActions'
import PropTypes from 'prop-types'
import MyGames from './MyGames';


class Games extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            gameName : "",
            Modal : false,
            msg: null,
            c : "danger"
          
        }

        this.onChange = this.onChange.bind(this)
        this.toggleModal = this.toggleModal.bind(this)
        this.Submit = this.Submit.bind(this)

    }

    componentDidUpdate(prevProps, prevState) {
        
        if(prevProps.error !== this.props.error ){
            if(this.props.error.id === 'GAME_post_FAIL'){
                this.setState ({msg : this.props.error.msg.msg,c:"danger"})
            }
            if(this.props.error.id === 'GAME_post_SUCCESS'){
                
                this.setState ({msg : this.props.error.msg,c:"success"})
                
            }
        }
        
       
    }
    
    
    toggleModal(){
        this.props.clearErrors()
        this.setState({
            Modal : !this.state.Modal
        })

    }

    onChange(e){
       
        this.setState({
            [e.target.name] : e.target.value
        })
    }
  
    Submit(){
        
        const {matrix,vector} = this.props.Game
        const name = this.state.gameName
        const user = this.props.user._id

        const game = {
            matrix,
            vector,
            name,
            user
        }


        this.props.postGame(game)

        
    }
  
    render() {
    return (
            this.props.authenticated ?
            <div>
                <Button
                    color="success"
                    onClick={this.toggleModal}
                    disabled={!this.props.Game.active}
                >
                    Salvar Jogo
                </Button>
                <Modal
                    toggle={this.toggleModal}
                    isOpen={this.state.Modal}
                    size="sm"
                >
                    <ModalHeader toggle={this.toggleModal}>Salvar Jogo</ModalHeader>
                    <ModalBody>
                        {this.state.msg ? <Alert color={this.state.c}>{this.state.msg}</Alert> : null }
                        <Label for="gameName">Nome do jogo</Label>
                        <Input type="text" name="gameName" value={this.state.gameName} onChange={this.onChange}></Input>
                        <center><Button
                            className="mt-2"
                            color="success"
                            onClick={this.Submit}
                        >Salvar</Button></center>
                    </ModalBody>
                </Modal>
                
                <MyGames/>
            </div>
            : <Alert color="danger">Entre em uma conta para salvar jogos</Alert>
           
            
    )
  }

}

Games.propTypes = {
    postGame : PropTypes.func.isRequired,
    clearErrors : PropTypes.func.isRequired,
    user : PropTypes.object,
    error : PropTypes.object.isRequired,
    authenticated : PropTypes.bool,
    Game : PropTypes.object,
}


const mapStateToProps = state => ({
    user : state.Auth.user,
    authenticated : state.Auth.authenticated,
    error : state.Error,
    Game : state.Display
});



export default connect(mapStateToProps,{postGame,clearErrors})(Games);
