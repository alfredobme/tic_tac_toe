import './LogTurns.css';

export default function LogTurns({playerNames, gameTurns, playerSymbols}) {
    let winnerText = function winnerMessage(playerName) {
        return <span>👑 El Jugador '{playerName}' es el ganador 👑</span>            
    }

    let draftText = (
        <span>☹️ Nadie ha ganado. Partida Empatada ☹️</span>
    )

    return(
        <>
          <ol id="logTurns">
              {gameTurns.map((turn, index)=> {
                const isWinner = turn.hasWinner
                const playerName = turn.symbol == playerSymbols.symbol1 ? playerNames.name1 : playerNames.name2 
                const isFinalTurn = gameTurns.length - index === 9

                return (
                <li key={index}>
                    <p>
                        Turno: {gameTurns.length - index}
                    </p>
                    <p>
                        {isWinner && winnerText(playerName)}
                    </p>
                    <p>
                        {isFinalTurn && !turn.hasWinner && draftText}
                    </p>
                    <p>
                        {playerName} ha colocado el simbolo '{turn.symbol}' en las coordenadas [{turn.square.rowIndex}][{turn.square.colIndex}]
                    </p>
                </li>)
              })}
          </ol>
        </>
    )
}