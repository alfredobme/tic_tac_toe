import './Player.css'
import { useState } from 'react'

export default function Player({namePlayer, onChangeName, keyName, playerSymbol, onChangeSymbol, keySymbol, gameTurnsLength, isActive}) {
    const [isEditing, setIsEditing] = useState(false);

    function handleClickButton() {
        //setEditing(!isEditing)
        //No es recomendable hacerlo asi, cuando se esta usando el valor del
        //estado anterior.

        //Se recomienda usar una arrow function asi:
        setIsEditing((isEditing) => !isEditing);
    }

    const playerNameField = isEditing 
    ? (<input type="text" name="" id="" required value={namePlayer} onChange={(event)=> onChangeName(event, keyName)} />) 
    : (<span className="player-name">{namePlayer}</span>)

    const playerSimbolField = isEditing 
    ? (<input type="text" name="" id="" maxLength="1" required value={playerSymbol} onChange={(event)=> onChangeSymbol(event, keySymbol, gameTurnsLength)} />) 
    : (<span className="player-symbol">{playerSymbol}</span>)

    const buttonChangeValue = isEditing 
    ? ("Guardar") 
    : ("Cambiar")

    return ( 
        <>
        <li className={isActive ? 'active' : undefined}>  
            <span className="player">
                {playerNameField}
                {playerSimbolField}
            </span>
            <button onClick={()=>handleClickButton()} disabled={!isActive}>{buttonChangeValue}</button>
        </li>
        </>
    );
}