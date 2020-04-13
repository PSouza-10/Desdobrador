import React, { Component } from 'react';
import {getRes,deleteRes}  from '../../actions/resActions'
import {setDisplayGame} from '../../actions/displayActions'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import {
    Button,
    Modal,
    ModalBody,
    ModalHeader,
    Card,
    CardDeck,
    CardBody,
    CardHeader,
    Badge,
    Table
    
} from 'reactstrap'


class MyRes extends Component {
    constructor(props) {
        super(props);
        
        this.state={
            Modal : false,
            selectedRes : [],
            msg : null
        }

        this.toggleModal = this.toggleModal.bind(this)
        this.selectRes = this.selectRes.bind(this)
      
        
    }

    exportarResultado(res){

        const game = {
            matrix : null,
            vector : null,
            result : res
        }

        this.props.setDisplayGame(game)
        this.toggleModal()
    }
    
    
    toggleModal(){
 
        this.setState({
            Modal : !this.state.Modal
        })
    
          
    }

    delete(id){
        this.props.deleteRes(id)
    }
    
    componentDidMount(){
        this.props.getRes()  
    }
   

    selectRes(arr){
        this.setState({selectedRes : arr})
    }

  
    render() {
        return (
            <div>
                <Badge
                    onClick={this.toggleModal}
                    disabled={!this.props.authenticated}
                    color="success"
                    
                    href="#"
                >
                    Meus Resultados
                </Badge>
                <Modal
                    toggle={this.toggleModal}
                    isOpen={this.state.Modal}
                    size="lg"
                >
                    <ModalHeader toggle={this.toggleModal}>Meus Resultados</ModalHeader>
                    <ModalBody>
                        
                       
                            
                           
                            <div style={{maxHeight:"80vh",overflowY:'auto'}}>
                                <CardDeck style={{width: "57vw"}}>
                                {
                                    

                                    this.props.Res.map((result,index) => (
                                        <Card key={index} >
                                            <CardHeader>
                                                {result.name}
                                            </CardHeader>
                                            <CardBody>
                                                <Table bordered hover>
                                                    <tbody>
                                                        <tr key={result}>
                                                            {this.props.Res[index].vector.map(n => (
                                                                <td key={n}>{n}</td>
                                                            ))}
                                                        </tr>
                                                    </tbody>
                                                </Table>
                                                <Button
                                                    color="success"
                                                    className="mr-2"
                                                    onClick={this.exportarResultado.bind(this,result.vector)}
                                                >Comparar</Button>
                                                <Button
                                                    color="danger"
                                                    onClick={this.delete.bind(this,result._id)}
                                                >Deletar</Button>
                                            </CardBody>
                                        </Card>
                                    ))
                                    
                                }
                                </CardDeck>
                            </div>
                           
                        
                           
                            

                            
                        
                    </ModalBody>
                </Modal>
                
            </div>
        )
  }
}

MyRes.propTypes = {
    Res : PropTypes.array,
    getRes : PropTypes.func.isRequired,
    deleteRes : PropTypes.func.isRequired,
    setDisplayGame : PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    Res : state.Res.Results,
    loading : state.Games.loading
});


export default connect(
  mapStateToProps,{getRes,deleteRes,setDisplayGame}
)(MyRes);
