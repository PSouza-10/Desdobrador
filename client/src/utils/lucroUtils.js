export const escolherCotacao = numeroDeDezenas => {
	if (numeroDeDezenas >= 18) return "18"
	else if (numeroDeDezenas <= 15) return "15"
	else return `${numeroDeDezenas}`
}

export const calcularLucro = (matriz, pontos) => {
	let precoPorLinha = []

	matriz.map(line => {
		precoPorLinha.push(cotacao[escolherCotacao(line.length)])
		return null
	})

	let precoTotal = precoPorLinha.reduce(
		(accumulator, item) => accumulator + item,
		0
	)

	let retornoTotal = 0

	pontos.map(ponto => {
		if (ponto >= 11) {
			retornoTotal += premio[`${ponto}`]
		} else {
			retornoTotal += 0
		}
		return null
	})

	let lucro = retornoTotal - precoTotal
	let resultado = lucro > 0 ? "Lucro" : "Prejuízo"

	return {
		labels: ["Investimento", "Retorno", resultado],
		values: [precoTotal, retornoTotal, lucro],
	}
}

let premio = {
	"11": 5,
	"12": 10,
	"13": 25,
	"14": 2000,
	"15": 1500000,
}
let cotacao = {
	"15": 2.5,
	"16": 40,
	"17": 340,
	"18": 2040,
}
