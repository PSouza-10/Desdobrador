import React from 'react';
import FormDezenas from './FormDezenas'
import AppNavbar from './Navbar/AppNavbar'


import {loadUser} from '../actions/authActions'
import {Provider} from 'react-redux'
import store from '../store'

class  App extends React.Component {

  componentDidMount(){
    
    store.dispatch(loadUser())
  }
  render(){

    return (
      <Provider store={store}>
        <div className="App" style={{margin : "0px",padding:"0px",overflow : "hidden",width:"100vw"}}>
    
          <AppNavbar />
       
          <FormDezenas />
          
      
        </div>
      </Provider>
    );
  }
}

export default App;
