import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";

import dice1 from "../../resources/dice1.png";
import dice2 from "../../resources/dice2.png";
import dice3 from "../../resources/dice3.png";
import dice4 from "../../resources/dice4.png";
import dice5 from "../../resources/dice5.png";
import dice6 from "../../resources/dice6.png";

import './gameStyle.css';

const GameView = observer(({ gameState }) => {
    const [dice, setDice] = useState(null);

    useEffect(() => {
        switch (gameState.dicePoints) {
            case 1:
                setDice(dice1);
                break;
            case 2:
                setDice(dice2);
                break;
            case 3:
                setDice(dice3);
                break;
            case 4:
                setDice(dice4);
                break;
            case 5:
                setDice(dice5);
                break;
            case 6:
                setDice(dice6);
                break;
            default:
                setDice(dice1);
        }
    }, [gameState.dicePoints]);

    return (
        <main>
            <section className={`player player--0 
            ${gameState.activePlayer ? 'player--active' : null} 
            ${!gameState.activePlayer && gameState.isWinner ? 'player--winner' : null}
            `} >
                <h2 className="name" id="name--0">Игрок 1</h2>
                <p className="score" id="score--0">{gameState.onePlayerPoints}</p>
                <div className="current">
                    <p className="current-label">Текущие очки</p>
                    <p className="current-score" id="current--0">{gameState.currentOnePlayerPoints}</p>
                </div>
            </section>
            <section className={`player player--1 
            ${gameState.activePlayer ? null : 'player--active'}
            ${gameState.activePlayer && gameState.isWinner ? 'player--winner' : null}
            `}>
                <h2 className="name" id="name--1">Игрок 2</h2>
                <p className="score" id="score--1">{gameState.twoPlayerPoints}</p>
                <div className="current">
                    <p className="current-label">Текущие очки</p>
                    <p className="current-score" id="current--1">{gameState.currentTwoPlayerPoints}</p>
                </div>
            </section>

            <img src={dice}
                alt="Playing dice"
                className="dice" />
            <button onClick={() => gameState.resetGame()} className="btn btn--new">🐷 Новая игра</button>
            <button onClick={() => gameState.rollDice()} className="btn btn--roll">🎲 Бросить кубик</button>
            <button onClick={() => gameState.savePoints()} className="btn btn--hold">👌 Оставить</button>
        </main>
    );
});

export default GameView;