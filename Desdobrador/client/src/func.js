export default function desdobrador (dezenas,numExtra){

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

function alinhar (arr){

    let array = []
    let matrix = []
    for(let k = 0;k<=15;k++){
        for(let g = 0;g <= 15;g++){
            array.push(arr[g][k])
        }
        matrix.push(array)
        array = []
    }

    return matrix
}

function trocarDezenas (arr){
    
    let newArr = []
    
    for(let i=0,j=1;i < 15;i+=2,j+=2){
     
        let aux = arr[j]
        newArr[j] = arr[i]
        newArr[i] = aux
        
    }


    return newArr;
}

function take14(arr1){
    let newArr = []
    let aux = arr1[0]
    let aux2 = arr1[1]
    
    for(let i=2,j=0;i < 16 && j < 16;i++,j++){
        
        newArr[j] = arr1[i] 

        
    }

    newArr[14] = aux
    newArr[15] = aux2

    return newArr
}

function desdobrar (arr) {
    
    let newArr = []
    
    newArr.push(take14(arr))
    
    let auxArr = newArr[0]
    for(let p = 0; p <= 5; p++){

        if(p===0){

            newArr.push(take14(auxArr))

        }else{

            newArr.push(take14(newArr[p]))
        }
        
    }
    return newArr
}

function reforcar(arr,linha){
    
    let newArr= []

    for(let x = linha;x<=8;x++){    

        
        newArr.push(trocarDezenas(arr[x]))

    }
    
    
    return newArr
    
}

