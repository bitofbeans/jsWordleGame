import React from "react";

function Key({ keyVal, bigKey }) {
    const bigClass = bigKey ? "key-big" : ""
    return (
        <div className={`key ${bigClass}`}>
            {keyVal}
        </div>
    );
}

export default Key;
