import React, { useContext } from "react";
import { AppContext } from "../App";

function GameOver() {
    const { gameState, setGameState, correctWord, currAttempt } = useContext(AppContext);
    return (
        <div className="gameOver">
            <h2>
                {gameState.win ? (
                    <div className="win-txt">You Won!</div>
                ) : (
                    <div className="lose-txt">Whoops</div>
                )}
            </h2>
            <h1>
                The correct word was <div className="correct-word-txt">{correctWord}</div>
            </h1>
            {gameState.win && (
                <h3>
                    You guessed in{" "}
                    <div className="attempt-txt">
                        {currAttempt.attempt} attempt
                        {currAttempt.attempt === 1 ? "" : "s"}
                    </div>
                </h3>
            )}
            <h3>Press Enter to try again</h3>
        </div>
    );
}

export default GameOver;
