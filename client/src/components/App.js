import React from 'react'
import FormDezenas from './FormDezenas'
import AppNavbar from './Navbar/AppNavbar'
import { Row, Col } from 'reactstrap'

import { loadUser } from '../actions/authActions'
import { Provider } from 'react-redux'
import store from '../store'
import Numeros from './Numeros'

import GameOptions from './Games/GameOptions'
import { Lucro } from './Lucro'
class App extends React.Component {
  componentDidMount() {
    store.dispatch(loadUser())
  }
  render() {
    return (
      <Provider store={store}>
        <div className='App'>
          <AppNavbar />
          <Row style={{ margin: '0' }}>
            <Col xl='3'>
              <FormDezenas />
              <GameOptions />
              <Lucro />
            </Col>
            <Col xl='9'>
              <Numeros />
            </Col>
          </Row>
        </div>
      </Provider>
    )
  }
}

export default App
