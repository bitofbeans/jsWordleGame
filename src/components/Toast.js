import React, { useContext } from "react";
import { AppContext } from "../App";

function Toast({ message }) {
    return <div className={`toast${message ? " toast-visible" : ""}`}>{message}</div>;
}

export default Toast;
