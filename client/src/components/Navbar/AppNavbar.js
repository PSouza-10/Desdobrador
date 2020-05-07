import React , {Component} from 'react'
import {
    Navbar,
    NavbarToggler,
    Nav,NavItem,
    NavbarBrand,
    Collapse

} from 'reactstrap'

import Login from './Login'
import Register from './Register'
import Logout from './Logout'

import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import UserPanel from './UserPanel'

class AppNavbar extends Component {
    constructor(props){
        super(props)

        this.state ={
            barIsOpen : false,
            msg : null
           
        }

        
        
       
        this.Open = this.Open.bind(this)
        
    
    }

    
    
    Open(){
        this.setState({
            barIsOpen : !this.state.barIsOpen,
           
        })
    }

    

   
    render(){

        return(
            <div >
                <Navbar
                   dark
                    expand="sm"
                    color="success"
                >
                    
                    <NavbarBrand 
                        style={{fontSize:'1.5rem'}}
                    >
                       Desdobrador
                    </NavbarBrand>

                    <NavbarToggler onClick={this.Open}>
                        
                    </NavbarToggler>
                    
                    <Collapse isOpen={this.state.barIsOpen} navbar >
                        
                            
                        <Nav navbar>
                            
                            {
                                this.props.authenticated ? 

                                <UserPanel name={this.props.user.name}/>
                                
                                :
                                <NavItem>
                                    <Login />
                                </NavItem>
                                
                            
                            }
                            {
                                this.props.authenticated ? 
                                                                    
                               <Logout/>
                                
                                :
                                <NavItem>

                                    <Register/>
                                    
                                </NavItem>
                                
                            }
                            
                        </Nav>
                       
                    </Collapse>
                        

                        
                
                </Navbar>
                
            </div>
            )
        
    }
}

Login.propTypes = {
    authenticated : PropTypes.bool,
    user : PropTypes.object,  
}

const mapStateToProps = state => ({
    authenticated : state.Auth.authenticated,
    user : state.Auth.user,
   
});

export default connect(mapStateToProps)(AppNavbar)


