export const validarMatriz = matriz => {
	let isValid = true
	matriz.map(line => {
		line.map((number, lineIndex) => {
			let quantNumero = line.filter(n => n === number).length
			if (quantNumero > 1) {
				isValid = false
				console.log(
					`Linha ${lineIndex + 1}: ${number} aparece ${quantNumero} vezes`
				)
			}
			return null
		})
		return null
	})
	return isValid ? "Valida" : "Invalida"
}
export const logMatrix = matrix => {
	console.log("------------------------------------")
	matrix.map(line => console.log(`${line}`))
	console.log("------------------------------------")
}
