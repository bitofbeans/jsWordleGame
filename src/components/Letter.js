import React, { useContext, useEffect } from "react";
import { AppContext } from "../App";

// Attempt val = row
// Letter pos = column
function Letter({ letterPos, attemptVal }) {
    const { board, correctWord, currAttempt, usedLetters, setUsedLetters } = useContext(AppContext);
    const letter = board[attemptVal][letterPos];

    const correct = correctWord[letterPos] === letter;
    const almost = !correct && letter !== "" && correctWord.includes(letter);

    let containsUnguessedLetter;
    if (letter && currAttempt.attempt <= attemptVal) {
        containsUnguessedLetter = true;
    } else {
        containsUnguessedLetter = false;
    }
    const letterState =
        currAttempt.attempt > attemptVal && (correct ? "correct" : almost ? "present" : "absent");

    useEffect(() => {
        if (letter !== "") {
            const newUsedLetters = {}; // copy of used letters
            if (newUsedLetters[letter]) {
                // if the letter already exists
                if (!newUsedLetters[letter] === "correct") {
                    // skip if its correct, we don't want to change it
                    if (newUsedLetters[letter] === "present" && letterState === "correct") {
                        // if the letter is now in correct spot, set it
                        newUsedLetters[letter] = letterState;
                    }
                }
            } else {
                // if the letter doesnt already exist
                newUsedLetters[letter] = letterState;
            }
            // needs to be like this because otherwise it doesn't update immediately
            setUsedLetters((prev) => {
                return { ...prev, ...newUsedLetters };
            });
        }
    }, [currAttempt.attempt]);

    return (
        <div
            className={`tile${containsUnguessedLetter ? " tile-full" : ""}`}
            id={letterState ? letterState : ""}
        >
            {letter}
        </div>
    );
}

export default Letter;
