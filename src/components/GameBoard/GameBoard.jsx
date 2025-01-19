import './GameBoard.css';

//INITIAL_GAME se puede crear asi:
//const INITIAL_GAME = [
//    [null, null, null],
//    [null, null, null],
//    [null, null, null]
//]

//o asi:
//const INITIAL_GAME = []
//for (let i = 0; i < 3; i++) {
//    INITIAL_GAME.push(Array(3).fill(null));
//}

//Pero mas optimo asi:
const INITIAL_GAME = Array.from({length:3}, ()=> Array(3).fill(null))


export default function GameBoard({onSelectedSquare, gameTurns}) {
    const gameBoard = [...INITIAL_GAME.map((array)=> [...array])]

    for (const turn of gameTurns) {
        const {square, symbol} = turn
        const {rowIndex, colIndex} = square

        gameBoard[rowIndex][colIndex] = symbol
    }
    
    function isWinningSquare(rowIndex, colIndex) {
        if (gameTurns.length > 4 && gameTurns[0].hasWinner) {
            return gameTurns[0].hasWinner.winningCombination.some(
                //(combination) => combination.row === rowIndex && combination.column === colIndex
                //Queda mejor usando las desestructuracion de parametros asi:
                (row, column) => row === rowIndex && column === colIndex
            )
        }

        return false
    }

    return(
        <ol id="gameBoard">
            {gameBoard.map((row, rowIndex)=> <li key={rowIndex}>
                <ol>
                    {row.map((col, colIndex)=> <li key={colIndex}>
                        <button 
                            className={isWinningSquare(rowIndex, colIndex) ? "winningSquare" :""}
                            onClick={()=> {
                                if (gameTurns.length > 4 && gameTurns[0].hasWinner) return
                                if (gameBoard[rowIndex][colIndex] === null) onSelectedSquare(rowIndex, colIndex, gameBoard)
                                }}>
                                {col}
                        </button>
                    </li>)}
                </ol>
            </li>)}
        </ol>
    )
}