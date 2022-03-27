import { createContext, useState } from "react";
import { boardDefault } from "./Words";
import Board from "./components/Board";
import Keyboard from "./components/Keyboard";
import "./App.css";

export const AppContext = createContext();

function App() {
    const [board, setBoard] = useState(boardDefault);

    return (
        <div className="App">
            <nav>
                <h1>Wordle</h1>
            </nav>
            <AppContext.Provider value={{ board, setBoard }}>
                <div className="game-container">
                    <div className="board-container">
                        <Board />
                    </div>
                    <Keyboard />
                </div>
            </AppContext.Provider>
        </div>
    );
}

export default App;
