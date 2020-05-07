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

import {loginUser} from '../../actions/authActions'
import {clearErrors} from '../../actions/errorActions'
import PropTypes from 'prop-types' 






class Login extends Component {
    constructor(props){
        super(props)

        this.state ={
            LoginModal : false,
            password : null,
            email : null,
            msg : null
           
        }

        
    
        this.OpenLoginModal = this.OpenLoginModal.bind(this)
        this.OnChange = this.OnChange.bind(this)
        this.LogIn = this.LogIn.bind(this)
    }

    componentDidUpdate(prevProps){
       
        if(this.props.error !== prevProps.error){
            if(this.props.error.id === 'LOGIN_FAIL'){
                this.setState({
                    msg : this.props.error.msg.msg
                })
            }else(
                
                this.setState({msg:null})
                
            )


        }



        if(this.state.LoginModal){
            if(this.props.authenticated){
                this.OpenLoginModal()
            }
        }
    }
    

    OpenLoginModal(){
        this.props.clearErrors()
        this.setState({
            LoginModal : !this.state.LoginModal
        })
    }
    
    OnChange(e){
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    LogIn(e){

        e.preventDefault()

        const credentials = {
            email : this.state.email,
            password : this.state.password
        }

        this.props.loginUser(credentials)
        
    }


    render(){

        return(
            <div >      

                <NavLink
                    color="success"
                    onClick = {this.OpenLoginModal}
                    href="#"
                >Entrar</NavLink>  

                            
                            
                <Modal
                    isOpen ={this.state.LoginModal}
                    toggle={this.OpenLoginModal}
                    size="sm"
                        
                >
                    <ModalHeader toggle={this.OpenLoginModal}>Log In</ModalHeader>
                    <ModalBody>
                    {this.state.msg ? <Alert color="danger">{this.state.msg}</Alert>: null}
                        <Form
                            onSubmit={this.LogIn}
                        >
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
                                Entrar
                            </Button>
                            </center>
                            
                        </Form>
                    </ModalBody>

                        </Modal>
            </div>
            )
        
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    authenticated : PropTypes.bool,
    error : PropTypes.object.isRequired,
    clearErrors : PropTypes.func.isRequired
    
}

const mapStateToProps = state => ({
    authenticated : state.Auth.authenticated,
    error : state.Error
});

export default connect(mapStateToProps,{loginUser,clearErrors})(Login)