import React, { useEffect, useCallback, useContext } from "react";
import { AppContext } from "../App";

import Key from "./Key";

function Keyboard() {
    const { onSelectLetter, onDelete, onEnter } = useContext(AppContext);

    const keys1 = [..."QWERTYUIOP"];
    const keys2 = [..."ASDFGHJKL"];
    const keys3 = [..."ZXCVBNM"];

    const handleKeyboard = useCallback((event) => {
        if (event.key === "Enter") {
            onEnter();
        } else if (event.key === "Backspace") {
            onDelete();
        } else {
            [..."QWERTYUIOPASDFGHJKLZXCVBNM"].forEach((key) => {
                if (event.key === key.toLowerCase()) {
                    onSelectLetter(key);
                }
            });
        }
    });

    useEffect(() => {
        document.addEventListener("keydown", handleKeyboard);
        return () => document.removeEventListener("keydown", handleKeyboard);
    }, [handleKeyboard]);

    return (
        <div className="keyboard" onKeyDown={handleKeyboard}>
            <div className="kb-line">
                {keys1.map((key) => {
                    return <Key key={key} keyVal={key} />;
                })}
            </div>
            <div className="kb-line">
                {keys2.map((key) => {
                    return <Key key={key} keyVal={key} />;
                })}
            </div>
            <div className="kb-line">
                <Key key={"ENTER"} keyVal={"ENTER"} bigKey />
                {keys3.map((key) => {
                    return <Key key={key} keyVal={key} />;
                })}
                <Key key={"DEL"} keyVal={"DEL"} bigKey />
            </div>
        </div>
    );
}

export default Keyboard;
