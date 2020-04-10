import React , {Component} from 'react'
import {
    NavLink,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form, 
    FormGroup, 
    Label, 
    Input,
    Alert 
} from 'reactstrap'

import {connect} from 'react-redux'

import {registerUser} from '../../actions/authActions'
import{clearErrors} from '../../actions/errorActions'
import PropTypes from 'prop-types' 




class Register extends Component {
    constructor(props){
        super(props)

        this.state ={
            RegisterModal : false,
            name : '',
            password : '',
            email : '',
            msg : null
           
        }

        
    
        this.OpenRegisterModal = this.OpenRegisterModal.bind(this)
        this.OnChange = this.OnChange.bind(this)
        this.OnSubmit = this.OnSubmit.bind(this)
    }

    componentDidUpdate(prevProps){
       
        

        if(this.props.error !== prevProps.error){
            if(this.props.error.id === 'REGISTER_FAIL'){
                this.setState({
                    msg : this.props.error.msg.msg
                })
            }else(
                
                this.setState({msg:null})
                
            )


        }



        if(this.state.RegisterModal){
            if(this.props.authenticated){
                this.OpenRegisterModal()
            }
        }
    }

    OpenRegisterModal = () => {

        this.props.clearErrors()

        this.setState({
            RegisterModal: !this.state.RegisterModal
        })
    }
    
    OnChange(e){

        

        this.setState({
            [e.target.name] : e.target.value
        })
    }

    OnSubmit(e){
        
        e.preventDefault()

        const {name,email,password} = this.state
        
        const newUser = { 
            name,
            email,
            password
            
        }


        this.props.registerUser(newUser)
      
    }


    render(){

        return(
           
               <div>
                   
                <NavLink
                    color="primary"
                    onClick = {this.OpenRegisterModal}
                    href="#"
                    className="NavigationLink"
                >Cadastrar-se</NavLink>  

                <Modal
                    isOpen ={this.state.RegisterModal}
                    toggle={this.OpenRegisterModal}
                    size="md"
                    
                >
                        
                        <ModalHeader toggle={this.OpenRegisterModal}>Register</ModalHeader>
                        <ModalBody>

                            {this.state.msg ? <Alert color="danger">{this.state.msg}</Alert>: null}

                            <Form
                                onSubmit={this.OnSubmit}
                            >
                                <FormGroup>
                                    <Label for="name">Nome</Label>
                                    <Input 
                                        name="name"
                                        type="text"
                                        id ="name"
                                        
                                        onChange = {this.OnChange}
                                    ></Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="email">Email</Label>
                                    <Input 
                                        name="email"
                                        type="email"
                                        id ="email"
                                        
                                        onChange = {this.OnChange}
                                    ></Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="password">Senha</Label>
                                    <Input 
                                        name="password"
                                        type="password"
                                        id = "password"
                                        
                                        onChange = {this.OnChange}
                                    ></Input>
                                </FormGroup>
                                <center>
                                    <Button
                                        color = "success"                                      
                                    >
                                        Cadastrar-se
                                    </Button>
                                </center>
                                
                            </Form>
                        </ModalBody>

                    </Modal>
    

                   
               </div>
                          
                    

           
                
         
                            
        )
        
    }
}

Register.propTypes = {
    authenticated : PropTypes.bool,
    error : PropTypes.object.isRequired,
    registerUser : PropTypes.func.isRequired,
    clearErrors : PropTypes.func.isRequired
    
}

const mapStateToProps = state => ({
    error : state.Error,
    authenticated : state.Auth.authenticated
});

export default connect(mapStateToProps,{registerUser,clearErrors})(Register)