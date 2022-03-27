import React, { useContext } from "react";
import { AppContext } from "../App";

function Key({ keyVal, bigKey }) {
    const { onSelectLetter, onDelete, onEnter } = useContext(AppContext);

    const selectLetter = () => {
        if (keyVal === "ENTER") {
            onEnter();
        } else if (keyVal === "DEL") {
            onDelete();
        } else {
            onSelectLetter(keyVal);
        }
    };

    return (
        <div className={`key${bigKey ? " key-big" : ""}`} onClick={selectLetter}>
            {keyVal}
        </div>
    );
}

export default Key;
