import React, { useContext } from "react";
import { AppContext } from "../App";

function Key({ keyVal, bigKey }) {
    const { onSelectLetter, onDelete, onEnter, usedLetters } = useContext(AppContext);
    let classes = "key";

    const selectLetter = () => {
        if (keyVal === "ENTER") {
            onEnter();
        } else if (keyVal === "DEL") {
            onDelete();
        } else {
            onSelectLetter(keyVal);
        }
    };
    classes = classes.concat(bigKey ? " key-big" : "");

    if (usedLetters[keyVal]) {
        classes = classes.concat(` key-${usedLetters[keyVal]}`);
    }

    return (
        <div className={classes} onClick={selectLetter}>
            {keyVal}
        </div>
    );
}

export default Key;
