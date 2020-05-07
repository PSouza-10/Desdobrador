export function desdobrador16 (dezenas,numExtra){

var matriz = []
var adicional = numExtra

matriz.push(dezenas)
matriz.push(trocarDezenas(dezenas))

let desdobramento = desdobrar(matriz[1])

for(let z = 0;z <=6; z++){
    matriz.push(desdobramento[z])
}

let reforco = reforcar(matriz,3)

for(let o = 0; o <= 5; o++){
    matriz.push(reforco[o])
}

matriz[15] = []

for(let f = 0;f <= 15; f++){
    matriz[15].push(adicional)
}

return alinhar(matriz)

}

export function desdobrar18 (dezenas,numExtra){
    var matriz = []
    var adicional = numExtra

    matriz.push(dezenas)

    
    matriz.push(trocarDezenas(dezenas))
    
    let desdobramento = desdobrar(matriz[1])

    for(let z = 0;z <=7; z++){
        matriz.push(desdobramento[z])
    }

   
    let reforco = reforcar(matriz,5)
    
    for(let o = 0; o <= 4; o++){
        matriz.push(reforco[o])
    }
    
    
    matriz[15] = []

    for(let f = 0;f <= 17; f++){
        matriz[15].push(adicional)
    }
    
    return alinhar(matriz)
}

function alinhar (arr){
    let t = arr[0].length
    let array = []
    let matrix = []
    if(t === 18){
        for(let k = 0; k < t ; k++){
            for(let g = 0; g < t-2;g++ ){
                array.push(arr[g][k])
            }
            matrix.push(array)
            array = []
        }
    }else{
        for(let k = 0;k<=15;k++){
            for(let g = 0;g <= 15;g++){
                array.push(arr[g][k])
            }
            matrix.push(array)
            array = []
        }
    }
    
    return matrix
}

function trocarDezenas (arr){
    
    let newArr = []
    
    let l = arr.length-1

    for(let i=0,j=1;i < l;i+=2,j+=2){
     
        let aux = arr[j]
        newArr[j] = arr[i]
        newArr[i] = aux
        
    }


    return newArr;
}

function take(arr1){
    
    

    let newArr = []
    let aux = arr1[0]
    let aux2 = arr1[1]
    
    for(let i=2,j=0;i < arr1.length && j < arr1.length;i++,j++){
        
        newArr[j] = arr1[i] 

        
    }

    newArr[arr1.length-2] = aux
    newArr[arr1.length-1] = aux2

    return newArr
}

function desdobrar (arr) {
    
    let newArr = []
    let aux = arr.length === 18 ? 6 : 5
    newArr.push(take(arr))
    
    let auxArr = newArr[0]
    for(let p = 0; p <= aux; p++){

        if(p===0){

            newArr.push(take(auxArr))

        }else{

            newArr.push(take(newArr[p]))
        }
        
    }
    return newArr
}

function reforcar(arr,linha){
    
    let newArr= []

    let f = linha === 3 ? 8 : 9

    for(let x = linha;x<=f;x++){    

        
        newArr.push(trocarDezenas(arr[x]))

    }
    
    
    return newArr
    
}

