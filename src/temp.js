const preGameBoard = [1, 2, 3];
const updateGameBoard = [...preGameBoard];

// Modificar la copia
//updateGameBoard[0] = 99;

console.log(preGameBoard); // [1, 2, 3] (sin cambios)
console.log(updateGameBoard); // [99, 2, 3] (solo la copia se modificó)
