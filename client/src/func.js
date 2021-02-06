function alinhar(matrix) {
	return matrix[0].map((_, colIndex) => matrix.map(row => row[colIndex]))
}

function trocarDezenas(arr) {
	let newArray = []

	let lastIndex = arr.length - 1

	for (
		let column = 0, nextColumn = 1;
		column <= lastIndex;
		column += 2, nextColumn += 2
	) {
		if (column !== lastIndex) {
			let aux = arr[nextColumn]
			newArray[nextColumn] = arr[column]
			newArray[column] = aux
		} else {
			newArray[column] = arr[column]
		}
	}

	return newArray
}

function dezenasDe2aoFim(arr) {
	return [...arr.slice(2, arr.length), arr[0], arr[1]]
}

function desdobrar(dezenasTrocadas, dezenasIniciais) {
	let matrix = [dezenasIniciais, dezenasTrocadas]

	const casaDoUltimonumero = dezenasTrocadas.length - 1
	let ultimoNumero = dezenasIniciais[casaDoUltimonumero]
	let aux = 1

	while (matrix[aux][0] !== ultimoNumero) {
		// console.log(matrix[aux])
		matrix = [...matrix, dezenasDe2aoFim(matrix[aux])]
		aux++
	}

	return matrix
}

function reforcarEgirar(matriz, numeroDeDezenas) {
	let alinhada = alinhar(matriz)
	let len = alinhada[0].length

	const tamanhoDaLinha = numeroDeDezenas % 2 === 0 ? 16 : numeroDeDezenas - 1

	const index = len - (tamanhoDaLinha - len - 1) //pegar o index a partir do qual cortar

	for (
		let line = 0, nextLine = 1;
		line < alinhada.length;
		line += 2, nextLine += 2
	) {
		if (line !== alinhada.length - 1) {
			alinhada[line] = [
				...alinhada[line],
				...alinhada[nextLine].slice(index, len),
			]
			alinhada[nextLine] = [
				...alinhada[nextLine],
				...alinhada[line].slice(index, len),
			]
		} else {
			alinhada[line] = [
				...alinhada[line],
				...alinhada[line - 1].slice(index, len),
			]
		}
	}

	return alinhada
}

function aplicarEnchimento(matriz, enchimento) {
	let novaMatriz = matriz.map(line => {
		return [...line, enchimento]
	})
	return novaMatriz
}

export default function Desdobrador(dezenas, enchimento) {
	let numeroDeDezenas = dezenas.length
	if (numeroDeDezenas % 2 !== 0) {
		enchimento = dezenas[numeroDeDezenas - 1]
		dezenas = dezenas.slice(0, numeroDeDezenas - 1)
	}

	const trocadas = trocarDezenas(dezenas)

	const desdobradas = desdobrar(trocadas, dezenas)

	let matrix = reforcarEgirar(desdobradas, numeroDeDezenas)

	matrix = aplicarEnchimento(matrix, enchimento)

	return matrix
}

Desdobrador([1, 2, 3, 4, 5, 6])

module.exports = Desdobrador
