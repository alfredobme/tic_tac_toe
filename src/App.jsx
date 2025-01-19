import './App.css'
import Player from './components/Player/Player';
import GameBoard from './components/GameBoard/GameBoard';
import LogTurns from './components/LogTurns/LogTurns';
import GameOver from './components/GameOver/GameOver';
import { useState } from 'react';
import { WINNING_COMBINATIONS } from './data/winningCombination';


function setActivePlayer(gameTurns, playerSymbols) {
  let activePlayer = playerSymbols.symbol1
  activePlayer = (gameTurns.length > 0 && gameTurns[0].symbol == playerSymbols.symbol1) ? playerSymbols.symbol2 : playerSymbols.symbol1

  if (gameTurns.length > 4 && gameTurns[0].hasWinner) activePlayer = gameTurns[0].symbol
  
  return activePlayer
}

function setHasWinnerOLD(prevGameTurns, gameBoardTemp) {
  if (prevGameTurns.length < 4) return false

  if (prevGameTurns.length >= 4)
    {
      for (const combination of WINNING_COMBINATIONS) {
        let symbolsWinner = {
          firstSymbol: gameBoardTemp[combination[0].row][combination[0].column],
          secondSymbol: gameBoardTemp[combination[1].row][combination[1].column],
          thrirdSymbol: gameBoardTemp[combination[2].row][combination[2].column],
        }

        if (
          symbolsWinner.firstSymbol &&
          symbolsWinner.firstSymbol === symbolsWinner.secondSymbol &&
          symbolsWinner.secondSymbol === symbolsWinner.thrirdSymbol
        ) 
        {
          return {isWinner: true, winningCombination: combination}
        }
      }

      return false
    }
}

function setHasWinner(prevGameTurns, gameBoardTemp) {
  if (prevGameTurns.length >= 4)
    {
      for (const combination of WINNING_COMBINATIONS) {
        const [first, second, third] = combination
        const [firstSymbol, secondSymbol, thrirdSymbol] = [
          gameBoardTemp[first.row][first.column],
          gameBoardTemp[second.row][second.column],
          gameBoardTemp[third.row][third.column],
        ]

        if (firstSymbol && firstSymbol === secondSymbol &&  secondSymbol === thrirdSymbol) 
        {
          return {isWinner: true, winningCombination: combination}
        }
      }

      return false
    }

    return false
}


function App() {
  const [gameTurns, setGameTurns] = useState([])
  const [playerNames, setPlayerNames] = useState({name1: "Jugador 1", name2: "Jugador 2"})
  const [playerSymbols, setPlayerSymbols] = useState({symbol1: "X", symbol2: "O"})

  function handleSelectedSquare(rowIndex, colIndex, gameBoard) {
    setGameTurns((prevGameTurns)=>{
      const actualSymbol = setActivePlayer(prevGameTurns, playerSymbols)

      let gameBoardTemp = {...gameBoard}
      gameBoardTemp[rowIndex][colIndex] = actualSymbol

      const hasWinner = setHasWinner(prevGameTurns, gameBoardTemp)
 
      const actualGameTurns = [
          {
            square: {rowIndex: rowIndex, colIndex: colIndex},
            symbol: actualSymbol,
            hasWinner: hasWinner
          },
          ...prevGameTurns
      ]

      return actualGameTurns
    })
  }

  function handleRestartGame() {
    setGameTurns([])
  }

  function handleChangueName(event, nameKey) {
    setPlayerNames((...prevPlayerNames)=>
      {
        const otherKey = nameKey === "name1" ? "name2" : "name1"
        const newPlayerNames = {
          [nameKey]: event.target.value,
          [otherKey]:prevPlayerNames[otherKey]
        }

        return newPlayerNames
      }
    )
  }

  function handleChangueSymbol(event, symbolKey, gameTurnsLength) {
    setPlayerSymbols((...prevPlayerSymbols)=>
      {
        const otherKey = symbolKey === "symbol1" ? "symbol2" : "symbol1"
        const newPlayerSymbols = {
          [symbolKey]: event.target.value,
          [otherKey]: prevPlayerSymbols[otherKey]
        }

        if (gameTurnsLength > 1) {
          alert("los simbolos no se pueden camboiar")          
          return copPlayerSymbols[0]
        }

        if (newPlayerSymbols.symbol1 === newPlayerSymbols.symbol2) {
          alert("no se puede")
          return copPlayerSymbols[0]
        }

        return newPlayerSymbols
      }
    )
  }

  const activePlayer = setActivePlayer(gameTurns, playerSymbols)

  return (
    <>
      <main>
        <div id="game-container">
          <ol id="playersContainer" className="highlight-player">
            <Player 
              namePlayer={playerNames.name1} 
              onChangeName={handleChangueName} 
              keyName="name1" 
              onChangeSymbol={handleChangueSymbol}
              keySymbol="symbol1"
              playerSymbol={playerSymbols.symbol1}
              gameTurnsLength={gameTurns.length}
              isActive={activePlayer === playerSymbols.symbol1}>
            </Player>        
            <Player 
              namePlayer={playerNames.name2} 
              onChangeName={handleChangueName} 
              keyName="name2" 
              onChangeSymbol={handleChangueSymbol}
              keySymbol="symbol2"
              playerSymbol={playerSymbols.symbol2}
              gameTurnsLength={gameTurns.length}
              isActive={activePlayer === playerSymbols.symbol2}>
            </Player>                
          </ol>
          {(gameTurns.length > 4 && gameTurns[0].hasWinner) && <GameOver handleRestartGame={handleRestartGame} title="¡ Revancha !" />}
          {(gameTurns.length > 8 && !gameTurns[0].hasWinner) && <GameOver handleRestartGame={handleRestartGame} title="¡ Otra Partida !" />}
          <GameBoard onSelectedSquare={handleSelectedSquare} gameTurns={gameTurns} />
        </div>
        <LogTurns 
          playerNames={playerNames} 
          playerSymbols={playerSymbols}
          gameTurns={gameTurns} 
        />        
      </main>
    </>
  );
}

export default App