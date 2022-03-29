import React, { useEffect, useCallback, useContext } from "react";
import { AppContext } from "../App";

import Key from "./Key";

function Keyboard() {
    const { onSelectLetter, onDelete, onEnter, kbBusy, setKbBusy } = useContext(AppContext);

    const keys1 = [..."QWERTYUIOP"];
    const keys2 = [..."ASDFGHJKL"];
    const keys3 = [..."ZXCVBNM"];

    const handleKbEvent = (callback) => {
        setKbBusy(true);
        callback();
        setKbBusy(false);
    };

    const handleKeyboard = useCallback((event) => {
        if (event.key === "Enter") {
            handleKbEvent(() => onEnter());
        } else if (event.key === "Backspace") {
            handleKbEvent(() => onDelete());
        } else {
            [..."QWERTYUIOPASDFGHJKLZXCVBNM"].forEach((key) => {
                if (event.key === key.toLowerCase()) {
                    if (kbBusy) {
                        // To prevent event listener collisions
                        // basically to get rid of bug where you press delete and a key fast and it will leave a space
                        setTimeout(() => {
                            handleKbEvent(() => onSelectLetter(key));
                        }, 50);
                    } else {
                        handleKbEvent(() => onSelectLetter(key));
                    }
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
                <div className="spacer"></div>
                {keys2.map((key) => {
                    return <Key key={key} keyVal={key} />;
                })}
                <div className="spacer"></div>
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
