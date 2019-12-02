let matrix = [];
let quantidade = [0,0,0,0,0,0,0,0,0,0];
let faltantes = [];
let funcObjetivo = 0;

const hillClimbing = () => {
	contarNumeros()
	crearFaltantes()
	preencherSudoku()
	inicializarMatriz()

	calFuncObjetivo()
}

const inicializarMatriz = () => {
	for(let linha = 1; linha < 10; linha += 1) {
		matrix[linha] = [];
		for(let coluna = 1; coluna < 10; coluna += 1) {
			matrix[linha][coluna] = sudoku(linha,coluna);
    }
  }
}

const calFuncObjetivo = () => {
	
  funcObjetivo += contarNumerosRepetidosColuna();
  funcObjetivo += contarNumerosRepetidosLinha();
  funcObjetivo += contarNumerosRepetidosBloco();
  console.log(funcObjetivo)
  
  
	// for(let linha = 1; linha < 10; linha += 1) {
	// 	for(let coluna = 1; coluna < 10; coluna += 1) {
	// 		let numero = matrix[linha][coluna]
	// 		funcObjetivo += linhaRepetida(numero,linha);
	// 		funcObjetivo += colunaRepetida(numero,coluna);
	// 		// funcObjetivo += blocoRepetido(numero,linha,coluna);
	// 		console.log(funcObjetivo,linha,coluna,numero)
 //    }
 //  }
 //  console.log(funcObjetivo)
}

const contarNumerosRepetidosColuna = () => {
	let quantidade = 0
	for(let coluna = 1; coluna < 10; coluna += 1) {
		let feitos = [0,0,0,0,0,0,0,0,0,0]
		let q = 0
		for(let linha = 1; linha < 10; linha += 1) {
			let numero = matrix[linha][coluna]
			feitos[numero]++
    }
    // console.log(feitos)
    q += feitos.reduce((a,b)=>(b==1 || b==0)?a:(a+b-1));
    console.log("Coluna",coluna,q)
    quantidade += q
  }
  console.log("Repetidos nas Colunas",quantidade)
  return quantidade
}

const contarNumerosRepetidosLinha = () => {
	let quantidade = 0
	for(let linha = 1; linha < 10; linha += 1) {
		let feitos = [0,0,0,0,0,0,0,0,0,0]
		let q = 0
		for(let coluna = 1; coluna < 10; coluna += 1) {
			let numero = matrix[linha][coluna]
			feitos[numero]++
    }
    // console.log(feitos)
    q += feitos.reduce((a,b)=>(b==1 || b==0)?a:(a+b-1));
    console.log("Linha",linha,q)
    quantidade += q
  }
  console.log("Repetidos nas Linhas",quantidade)
  return quantidade
}

const contarNumerosRepetidosBloco = () => {
	let quantidade = 0
	for(let l = 0; l < 3; l += 1) {		
		for(let c = 0; c < 3; c += 1) {
			let feitos = [0,0,0,0,0,0,0,0,0,0]
			let q = 0
			for(let linha = 0; linha < 3; linha += 1) {
				for(let coluna = 0; coluna < 3; coluna += 1) {
					// console.log(l*3+linha+1,c*3+coluna+1)
					let numero = matrix[l*3+linha+1][c*3+coluna+1]
					feitos[numero]++
		    }
	    }
	    q += feitos.reduce((a,b)=>(b==1 || b==0)?a:(a+b-1));
	    console.log("Bloco",l,c,q)
    	quantidade += q
    }
  }
  console.log("Repetidos nos Blocos",quantidade)
  return quantidade
}

// const linhaRepetida = (numero,linha) => {
// 	let n = 0
// 	for (let i = 1; i < 10; i++) {
// 		if(matrix[linha][i] == numero)
// 			n++
// 	}
// 	return n-1;
// }

// const colunaRepetida = (numero,coluna) => {
// 	let n = 0
// 	for (let i = 1; i < 10; i++) {
// 		if(matrix[i][coluna] == numero)
// 			n++
// 	}
// 	return n-1
// }

const crearFaltantes = () => {
	for(let numero = 1; numero < 10; numero++) {
		for(let vezes = 1; vezes < 10; vezes++) {
			if(quantidade[numero] > 0){
				quantidade[numero]--
			}
			else{
				faltantes.push(numero)
			}
    }
  }
}

const contarNumeros = () => {
	for(let linha = 1; linha < 10; linha++) {
		for(let coluna = 1; coluna < 10; coluna++) {
			if(sudoku(linha,coluna) != 0){
				quantidade[sudoku(linha,coluna)]++;
			}
    }
  }
  console.log("numeros:",quantidade);
}

const preencherSudoku = () => {
	for(let linha = 1; linha < 10; linha += 1) {
		for(let coluna = 1; coluna < 10; coluna += 1) {
			if(sudoku(linha,coluna) == 0){
				let newNumero = Math.floor((Math.random() * faltantes.length));
				setSudoku(linha,coluna,faltantes[newNumero]);
				faltantes.splice(newNumero, 1);
			}
			else{
				disableSudoku(linha,coluna);	
			}
    }
  }
}


const sudoku = (l,c) =>{
	let n = document.getElementById('cell-'+(l)+(c)).value;
	if(n != "")
		return parseInt(n)
	else
		return 0
}

const setSudoku = (l,c,n) =>{
	document.getElementById('cell-'+(l)+(c)).value = n;
}

const disableSudoku = (l,c) =>{
	document.getElementById('cell-'+(l)+(c)).style.color = "blue";
}


hillClimbing()