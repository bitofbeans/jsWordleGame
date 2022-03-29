import React, { useContext } from "react";
import { AppContext } from "../App";

function GameOver() {
    const { gameState, setGameState, correctWord, currAttempt } = useContext(AppContext);
    return (
        <div className="gameOver">
            <h3>{gameState.win ? "You Won!" : "Whoops"}</h3>
            <h1>The correct word was {correctWord}</h1>
            {gameState.win && (
                <h3>
                    You guessed in {currAttempt.attempt} attempt
                    {currAttempt.attempt === 1 ? "" : "s"}
                </h3>
            )}
        </div>
    );
}

export default GameOver;
