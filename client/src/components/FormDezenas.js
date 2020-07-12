import React, { Component } from "react"
import {
	FormGroup,
	Input,
	Label,
	Row,
	Container,
	Button,
	Badge,
	CustomInput,
} from "reactstrap"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import Desdobrador from "../func"
import SaveRes from "./Results/SaveRes"
import MyRes from "./Results/MyRes"
import { setDisplayGame, clearRow } from "../actions/displayActions"

class FormDezenas extends Component {
	constructor() {
		super()

		this.state = {
			nums: [],
			numExtra: null,
			quantos: 0,
			resultado: "",
		}

		this.onChange = this.onChange.bind(this)
		this.sendNums = this.sendNums.bind(this)
		this.changeExtra = this.changeExtra.bind(this)
		this.Limpar = this.Limpar.bind(this)
		this.update = this.update.bind(this)
	}

	onChange(num) {
		let isrepeat = this.state.nums.includes(num)

		if (isrepeat) {
			let arr = this.state.nums.filter(n => n !== num)

			this.setState(prevState => ({
				nums: arr,
				quantos: prevState.quantos - 1,
			}))
		} else {
			this.setState(prev => ({
				nums: [...prev.nums, num],
				quantos: prev.quantos + 1,
			}))
		}
	}

	changeExtra(e) {
		this.setState({
			[e.target.name]: e.target.value,
		})
	}

	sendNums() {
		let dezenas = this.state.nums.map(x => {
			return parseInt(x, 10)
		})
		let ref = Number(this.state.numExtra)

		let mat

		mat = Desdobrador(dezenas, ref)

		this.props.setDisplayGame({
			matrix: mat,
			vector: dezenas,
		})
	}

	Limpar() {
		document
			.querySelectorAll("input[type=checkbox]")
			.forEach(el => (el.checked = false))
		this.setState({ nums: [], quantos: 0 })
	}

	update(arr, quantos) {
		this.setState({
			nums: arr,
			quantos: quantos,
		})
		setTimeout(this.props.clearRow(), 2000)
	}

	componentDidUpdate(prevProps, prevState) {
		if (
			prevProps.selectRow !== this.props.selectRow &&
			this.props.selectRow[0] !== 0
		) {
			let q = 0
			console.log(this.props.selectRow)
			document.querySelectorAll("input[type=checkbox]").forEach(el => {
				let n = parseInt(el.id, 10)

				if (this.props.selectRow.includes(n) && n !== 0) {
					q++
					el.checked = true
				} else {
					el.checked = false
				}
			})

			this.update(
				this.props.selectRow.filter(n => n !== 0),
				q
			)
		}

		if (prevState.resultado !== this.state.resultado) {
			let res = this.state.resultado.split(",").map(x => {
				if (parseInt(x, 10) !== null) return parseInt(x, 10)
				else return null
			})

			this.props.setDisplayGame({ result: res })
		}
	}

	render() {
		const dezenas = [
			[1, 2, 3, 4, 5],
			[6, 7, 8, 9, 10],
			[11, 12, 13, 14, 15],
			[16, 17, 18, 19, 20],
			[21, 22, 23, 24, 25],
		]
		const desdobramentosProibidos = [0, 1, 2, 4, 6, 8, 14]

		return (
			<center>
				<FormGroup className='ml-2'>
					<Label for='resultado'>
						Insira o resultado para comparação (entre vírgulas):
					</Label>
					<Input
						type='text'
						name='resultado'
						value={this.state.resultado}
						onChange={e => {
							this.changeExtra(e)
						}}></Input>
				</FormGroup>
				{this.props.authenticated ? (
					<Row className='mt-1 ml-2  justify-content-around'>
						<SaveRes
							res={this.state.resultado.split(",").map(x => {
								return parseInt(x, 10)
							})}
						/>

						<MyRes />
					</Row>
				) : null}

				<Container>
					<center>
						<div
							style={{
								color: desdobramentosProibidos.includes(this.state.quantos)
									? "red"
									: "green",
								marginBottom: "1%",
							}}>
							{this.state.quantos} números escolhidos{" "}
							<Badge href='#' onClick={this.Limpar} color='danger'>
								Limpar
							</Badge>
						</div>
					</center>

					<table>
						<tbody>
							{dezenas.map((v, index) => (
								<tr key={index}>
									{dezenas[index].map(n => (
										<td key={n}>
											<CustomInput
												className='m-2'
												type='checkbox'
												id={n}
												key={n}
												label={n}
												onChange={() => this.onChange(n)}
											/>
										</td>
									))}
								</tr>
							))}
						</tbody>
					</table>

					<Label for='numExtra'>Insira o número adicional do reforço : </Label>
					<Input
						type='number'
						name='numExtra'
						onChange={this.changeExtra}
						style={{
							backgroundColor:
								desdobramentosProibidos.includes(this.state.quantos) ||
								this.state.quantos % 2 !== 0
									? "red"
									: "white",
						}}></Input>

					<Button
						onClick={this.sendNums}
						disabled={
							desdobramentosProibidos.includes(this.state.quantos)
								? true
								: false
						}
						className='mt-2 mb-3'
						color='success'>
						Desdobrar
					</Button>
				</Container>
			</center>
		)
	}
}

FormDezenas.propTypes = {
	authenticated: PropTypes.bool,
	setDisplayGame: PropTypes.func.isRequired,
	selectRow: PropTypes.array,
	clearRow: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
	authenticated: state.Auth.authenticated,
	selectRow: state.Display.numbers,
})

export default connect(mapStateToProps, { setDisplayGame, clearRow })(
	FormDezenas
)
