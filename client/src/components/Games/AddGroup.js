import React, {useState} from 'react'
import {groupPost} from '../../actions/groupActions'
import {
    Button,
    Input,
    Label,
    Modal,
    ModalBody,
    ModalHeader,
    Alert
} from 'reactstrap'
import {useDispatch,useSelector} from 'react-redux'
import { clearErrors } from '../../actions/errorActions'


const AddGroup = () => {
    const [name, changeName] = useState("")
    const [modal, setOpen] = useState(false)
    const dispatch = useDispatch()
    const err = useSelector(state => state.Error)

    return(
        <div>
            <Button
                color="primary"
                onClick ={()=> setOpen(!modal)}
                className="mb-3 ml-2"
            > Criar Grupo</Button>

            <Modal isOpen={modal} toggle={() => setOpen(!modal)} size="xs">
                <ModalHeader toggle={() => setOpen(!modal)}>
                    Criar Grupo
                </ModalHeader>
                <ModalBody>
                    {
                        err.msg.msg  ? <Alert color= "danger">{err.msg.msg}</Alert> : null                        
                    }
                    <Label for="groupName">Nome do Grupo :</Label>
                    <Input 
                        type="text" name="groupName" 
                        onChange={e => changeName(e.target.value)}
                        valid={name !== ""}
                    ></Input>
                    <Button
                        color="success"
                        onClick={() => {
                            dispatch(groupPost(name))
                            
                            dispatch(clearErrors())
                        }}
                        className="mt-2"
                        size="sm"
                    >Criar</Button>
                </ModalBody>
            </Modal>
        </div>
    )
}

export default AddGroup