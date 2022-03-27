import React from "react";
import Key from "./Key";

function Keyboard() {
    const keys1 = [..."QWERTYUIOP"];
    const keys2 = [..."ASDFGHJKL"];
    const keys3 = [..."ZXCVBNM"];
    return (
        <div className="keyboard">
            <div className="kb-line">
                {keys1.map((key) => {
                    return <Key keyVal={key} />;
                })}
            </div>
            <div className="kb-line">
                {keys2.map((key) => {
                    return <Key keyVal={key} />;
                })}
            </div>
            <div className="kb-line">
                <Key keyVal={"ENTER"} bigKey />
                {keys3.map((key) => {
                    return <Key keyVal={key} />;
                })}
                <Key keyVal={"DEL"} bigKey />
            </div>
        </div>
    );
}

export default Keyboard;
