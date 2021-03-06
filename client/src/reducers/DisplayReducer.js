import { DISPLAY_game, RESET, SET_NUMBERS } from "../actions/types"

const initialState = {
	matrix: [[]],
	vector: [],
	_id: "",
	result: [],
	points: [],
	active: false,
	index: null,
	name: "",
	numbers: [],
}

export default function (state = initialState, action) {
	switch (action.type) {
		case DISPLAY_game:
			if (
				action.payload.matrix &&
				action.payload.vector &&
				action.payload.result
			) {
				return {
					...state,
					matrix: action.payload.matrix,
					vector: action.payload.vector,
					_id: action.payload._id,
					result:
						action.payload.result[0] !== null
							? action.payload.result
							: state.result,
					points: conferir(action.payload.matrix, action.payload.result),
					active: true,
					index: 0,
					name: "",
				}
			} else if (!action.payload.matrix && !action.payload.vector) {
				return {
					...state,
					result:
						action.payload.result[0] !== null
							? action.payload.result
							: state.result,
					points: conferir(state.matrix, action.payload.result),
					active: true,
				}
			} else {
				return {
					...state,
					matrix: action.payload.matrix,
					vector: action.payload.vector,
					_id: action.payload._id,
					points: conferir(action.payload.matrix, state.result),
					active: true,
					index: action.payload.index,
					name: action.payload.name,
				}
			}

		case SET_NUMBERS:
			return {
				...state,
				result: state.result,
				numbers: action.payload,
			}

		case RESET:
			return {
				state: initialState,
			}

		default:
			return state
	}
}

function conferir(matriz, resultado) {
	let ac = new Array(matriz.length).fill(0)

	matriz.map((line, i) => {
		for (let x = 0; x <= 14; x++) {
			if (line.includes(resultado[x])) {
				ac[i]++
			}
		}
		return null
	})

	return ac
}
