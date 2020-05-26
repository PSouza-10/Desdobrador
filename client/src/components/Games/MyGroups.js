import React, {useState,useEffect} from 'react'
import {
    Button,
    Modal,
    ModalBody,
    ModalHeader,
    Input,
    ListGroup,
    ListGroupItem,
    Row,
    Col,
    Collapse,
    InputGroup,
    InputGroupAddon,
    Form,
    Badge
    
} from 'reactstrap'
import AddGroup from './AddGroup'
import {useDispatch,useSelector} from 'react-redux'
import {getGames,deleteGame,editGame} from '../../actions/gameActions'
import { loadGroups, editGroup} from '../../actions/groupActions'
import {setDisplayGame} from '../../actions/displayActions'
import GroupAddModal from './GroupAddModal'
import DisplayGame from './DisplayGame'

const MyGroups = () => {
    const initialState = {
        matrix : [[]],
        vector : [],
        _id : "",
        name : "",
        user : "",
        index : null
        
    }
    const [modal, setModal] = useState(false)
    const [game, selectGame] = useState(initialState)
    const [todos,toggle] = useState(false)
    const [collapse,setCollapse] = useState([]) 
    const [name,changeName] = useState("")

    const dispatch = useDispatch()
    const auth = useSelector(state => state.Auth.authenticated)
    const groups = useSelector(state=> state.Group.groups)
    const games = useSelector(state => state.Games.Games)
    
    useEffect(()=>{
        dispatch(getGames())
    },[])//eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() =>{  
        dispatch(loadGroups())
        setTimeout(()=>{
            setCollapse(Array(groups.length).fill(false))
        },1000)
    },[])//eslint-disable-line react-hooks/exhaustive-deps

    const controlCollapse = i =>{
        const cop = [...collapse]

        cop[i] = !collapse[i]

        setCollapse(cop)
    }

    const style = (id,i) => {
        if(game._id === id && collapse[i]){
            return {backgroundColor:"green",color:"white"}
        }else if (game._id === id){
            return {backgroundColor:"lightblue",color:"black"}
        }else{
            return {backgroundColor:"white",color:"black"}
        }
    }
    
    return (
        <div>
                <Button
                    onClick={() => setModal(!modal)}
                    disabled={!auth}
                    color="success"
                    className="mt-2"
                >
                    Meus Jogos
                </Button>
                <Modal
                    toggle={()=>setModal(!modal)}
                    isOpen={modal}
                    size="xl"
                >
                    <ModalHeader toggle={()=>setModal(!modal)}>
                        <Form inline>
                            Meus Jogos
                        <InputGroup size="sm" className="ml-3">
                            <Input type="text" onChange={e => changeName(e.target.value)} placeholder={game.name}></Input>
                            <InputGroupAddon addonType="append">
                                <Button
                                    onClick={()=>dispatch(editGame(game._id,name ))}
                                >Renomear</Button>
                            </InputGroupAddon> 
                        </InputGroup>
                        <Badge color="danger"
                            className="ml-3"
                            href="#"
                            onClick={()=>{
                                let temp = {}
                                groups.forEach(o => {
                                    temp = {...o,
                                        jogos : o.jogos.filter(id => id !== game._id) 
                                    }
                                    dispatch(editGroup(temp))
                                })
                                dispatch(deleteGame(game._id))
                                selectGame(initialState)
                            } 
                            }
                        >Deletar</Badge>
                        </Form>

                    </ModalHeader>
                    <ModalBody>
                        <Row>
                            <Col xl="9">
                                {
                                    game._id ?
                                    <DisplayGame game={game}/>:
                                    null
                                }

                            </Col>
                            <Col xl="3">
                                <Row className="d-flex justify-content-evenly">
                                    <AddGroup/>
                                    <Button
                                        color="success"
                                        className="mb-3 ml-2"
                                        onClick={()=> {
                                            dispatch(setDisplayGame(game))
                                            setModal(!modal)
                                        }}
                                    >
                                        Exportar
                                    </Button>
                                </Row>

                                <div style={{maxHeight:"80vh",overflowY:'auto'}}>
                                    <ListGroup>
                                        <ListGroupItem onClick={() => toggle(!todos)} href="#" action tag="a" key="Todos">Todos ({games.length})</ListGroupItem>
                                        <Collapse isOpen={todos} className="ml-2">
                                            
                                                {
                                                    games.map((game,i) => (
                                                        <ListGroupItem
                                                            href="#" action tag="a" key={game.name}
                                                            style={style(game._id)}
                                                            onClick={() => selectGame({...game,index : i})}
                                                        >{
                                                            game.name + " (" + game.tipo +" dezenas)" 
                                                        }</ListGroupItem>
                                                    ))
                                                }
                                            
                                        </Collapse>
                                        {
                                            groups.map((group,i)=>(
                                                <div key={i}>
                                                    <ListGroupItem onClick={() => controlCollapse(i)}
                                                        href="#" action tag="a" key={group.name}
                                                        style={
                                                            collapse[i] ? {backgroundColor:"#333333",color:"white"}:
                                                            {backgroundColor:"white",color:"black"}
                                                        }
                                                    >
                                                        <div>
                                                            {group.nome}({group.jogos.length})
                                                            <GroupAddModal group={group}/>
                                                        </div>    
                                                    </ListGroupItem>
                                                    <Collapse isOpen={collapse[i]} className="ml-2">
                                                        <ListGroup>
                                                        {
                                                            games.filter((g) => group.jogos.includes(g._id)).map((game,ind) => (
                                                                <ListGroupItem
                                                                style={style(game._id,i)}
                                                                    href="#" action tag="a" key={game.name}
                                                                    onClick={() => selectGame({...game,index:ind})}
                                                                    >{
                                                                        game.name + " (" + game.tipo +" dezenas)" 
                                                                    }</ListGroupItem>
                                                            ))
                                                            
                                                            
                                                        }
                                                        </ListGroup>
                                                    </Collapse>
                                                </div>   
                                            ))
                                        }
                                    </ListGroup>
                                </div>
                            </Col>
                        </Row>  
                    </ModalBody>
                </Modal>
            </div>
    )
}


export default MyGroups