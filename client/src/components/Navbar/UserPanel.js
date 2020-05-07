import React, { Component } from 'react';

import {deleteUser}  from '../../actions/authActions'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

import {
    Button,
    Modal,
    ModalBody,
    ModalHeader,
    Alert,
    NavLink,
    Container
    
} from 'reactstrap'

class UserPanel extends Component {
    constructor(props) {
        super(props);
        
        this.state={
            Modal : false,
           
        }

        this.toggleModal = this.toggleModal.bind(this)
        this.deletar = this.deletar.bind(this)
       
    }
    
    toggleModal(){
       
        this.setState({
            Modal : !this.state.Modal
        })
    
    }

    deletar(){
        this.props.deleteUser()
        this.toggleModal()
    }

    
    render() {
        return (
            <div>
                <NavLink
                href="#"
                    onClick={this.toggleModal}
                >
                    Entrou como {this.props.name}
                </NavLink>
                <Modal
                    toggle={this.toggleModal}
                    isOpen={this.state.Modal}
                    size="xs"
                >
                    <ModalHeader toggle={this.toggleModal}>{this.props.name}</ModalHeader>
                    <ModalBody>
                        <Container>
                            
                            <Button 
                                onClick={this.deletar}
                                block
                                color="danger"
                            >Deletar Usuário</Button>       
                            <Alert color="danger">Todos os seus Jogos e Resultados serão permanentemente deletados.</Alert>
                        
                        </Container>    
                    </ModalBody>
                </Modal>
            </div>
        )
  }
}

UserPanel.propTypes = {
    deleteUser : PropTypes.func.isRequired
}


export default connect(
 null,{deleteUser}
)(UserPanel);
