import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Button,
    Modal,
    ModalBody,
    ModalHeader,
    Input,
    Label,
    Alert,
    Badge
    
} from 'reactstrap'
import {clearErrors} from '../../actions/errorActions'
import {postRes} from '../../actions/resActions'
import PropTypes from 'prop-types'


class SaveRes extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            resName : "",
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
            if(this.props.error.id === 'RES_post_FAIL'){
                this.setState ({msg : this.props.error.msg.msg,c:"danger"})
            }
            if(this.props.error.id === 'RES_post_SUCCESS'){
                
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
        
        
        const vector = this.props.res
        
        const name = this.state.resName

        const game = {
            vector,
            name
          
        }


        this.props.postRes(game)
        
       
        
    }
  
    render() {
    return (
          
            <div>
                <Badge
                    color="success"
                    onClick={this.toggleModal}
                    href="#"
                >
                    Salvar Resultado
                </Badge>
                <Modal
                    toggle={this.toggleModal}
                    isOpen={this.state.Modal}
                    size="sm"
                >
                    <ModalHeader toggle={this.toggleModal}>Salvar Resultado</ModalHeader>
                    <ModalBody>
                        {this.state.msg ? <Alert color={this.state.c}>{this.state.msg}</Alert> : null }
                        <Label for="resName">Nome do resultado</Label>
                        <Input type="text" name="resName" value={this.state.resName} onChange={this.onChange}></Input>
                        <center><Button
                            className="mt-2"
                            color="success"
                            onClick={this.Submit}
                        >Salvar</Button></center>
                    </ModalBody>
                </Modal>
                
            </div>
            
           
            
    )
  }

}

SaveRes.propTypes = {
    postRes : PropTypes.func.isRequired,
    clearErrors : PropTypes.func.isRequired,
    user : PropTypes.object,
    error : PropTypes.object.isRequired,
    authenticated : PropTypes.bool,
}


const mapStateToProps = state => ({
    user : state.Auth.user,
    authenticated : state.Auth.authenticated,
    error : state.Error
    
});



export default connect(mapStateToProps,{postRes,clearErrors})(SaveRes);
