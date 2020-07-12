import React, { useState } from "react"
import {
	Button,
	Modal,
	ModalBody,
	ModalHeader,
	ListGroup,
	ListGroupItem,
	Badge,
} from "reactstrap"

import { useDispatch, useSelector } from "react-redux"
import { editGroup, deleteGroup } from "../../actions/groupActions"

const Group = props => {
	const [modal, setModal] = useState(false)
	const [selected, mark] = useState([])

	const games = useSelector(state => state.Games.Games)
	const dispatch = useDispatch()

	const style = id => {
		if (selected.includes(id)) {
			return { backgroundColor: "green", color: "white" }
		} else {
			return { backgroundColor: "white", color: "black" }
		}
	}

	const markAll = () => {}

	return (
		<div>
			<Button
				onClick={() => {
					setModal(!modal)
					mark([...props.group.jogos])
				}}
				size='xs'
				color='primary'
				style={{ marginLeft: "75%" }}>
				Editar
			</Button>

			<Modal size='xs' isOpen={modal} toggle={() => setModal(!modal)}>
				<ModalHeader toggle={() => setModal(!modal)}>
					Selecionar Jogos{" "}
					<Badge
						color='danger'
						href='#'
						onClick={() => {
							dispatch(deleteGroup(props.group._id))
							setModal(!modal)
						}}>
						Apagar Grupo
					</Badge>
				</ModalHeader>
				<ModalBody>
					<ListGroup style={{ maxHeight: "70vh", overflowY: "auto" }}>
						{games.map(g => (
							<ListGroupItem
								href='#'
								action
								tag='a'
								key={g.nome}
								style={style(g._id)}
								onClick={() => {
									if (selected.includes(g._id)) {
										mark(selected.filter(id => id !== g._id))
									} else {
										mark([g._id, ...selected])
									}
								}}>
								{g.name}
							</ListGroupItem>
						))}
					</ListGroup>

					<Button
						className='mt-3'
						color='success'
						onClick={() => {
							let group = {
								...props.group,
								jogos: [...selected],
							}
							dispatch(editGroup(group))
							setModal(!modal)
						}}>
						Adicionar
					</Button>

					<Badge
						color='secondary'
						className='ml-3'
						onClick={() => markAll()}
						href='#'>
						Selecinar Todos
					</Badge>
				</ModalBody>
			</Modal>
		</div>
	)
}

export default Group
