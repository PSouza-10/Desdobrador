import React, { Component } from 'react'
import {connect} from 'react-redux'
import {logout} from '../../actions/authActions'

import PropTypes from 'prop-types' 
import {
    NavLink
} from 'reactstrap'

class Logout extends Component {
    
    
    render() {
        return (
            <NavLink
                href="#"
                onClick={this.props.logout}
                style={{color:"red"}}
            >
                Sair
            </NavLink>
        )
    }
}

Logout.propTypes = {
    logout : PropTypes.func.isRequired
   
    
}

export default connect(null,{logout})(Logout)