import React, {useContext} from "react";
import {AppContext} from "../App"

// Attempt val = row
// Letter pos = column
function Letter({ letterPos, attemptVal }) {
    const {board} = useContext(AppContext)
    const letter = board[attemptVal][letterPos]
    return <div className="tile">{letter}</div>;
}

export default Letter;
