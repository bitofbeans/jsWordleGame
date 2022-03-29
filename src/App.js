import { createContext, useState, useRef, useCallback, useEffect } from "react";
import { defaultBoard, generateWordSet } from "./Words";
import Board from "./components/Board";
import Keyboard from "./components/Keyboard";
import GameOver from "./components/GameOver";
import Toast from "./components/Toast";
import "./App.css";

export const AppContext = createContext();

function App() {
    let boardElem = useRef(null);
    let boardContainerElem = useRef(null);

    const [board, setBoard] = useState(defaultBoard());
    const [currAttempt, setCurrAttempt] = useState({ attempt: 0, letterPos: 0 });
    const [wordSet, setWordSet] = useState(new Set());
    const [usedLetters, setUsedLetters] = useState([]);
    const [gameState, setGameState] = useState({ gameOver: false, win: false });
    const [kbBusy, setKbBusy] = useState(false);
    const [toastMessage, setToastMessage] = useState("");

    const [correctWord, setCorrectWord] = useState("");

    const getWords = () => {
        generateWordSet().then((words) => {
            setWordSet(words.wordSet);
            setCorrectWord(words.word.toUpperCase());
            console.log(words.word)
        });
    };

    useEffect(() => {
        getWords();
    }, []);

    const onSelectLetter = (keyVal) => {
        if (gameState.gameOver) return;
        if (currAttempt.letterPos > 4) return;

        if (toastMessage) setToastMessage("");

        const newBoard = { ...board };
        newBoard[currAttempt.attempt][currAttempt.letterPos] = keyVal;

        setBoard(newBoard);
        setCurrAttempt({ ...currAttempt, letterPos: currAttempt.letterPos + 1 });
    };

    const onDelete = () => {
        if (gameState.gameOver) return;
        if (currAttempt.letterPos === 0) return;

        if (toastMessage) setToastMessage("");

        const newBoard = { ...board };
        newBoard[currAttempt.attempt][currAttempt.letterPos - 1] = "";

        setBoard(newBoard);
        setCurrAttempt({ ...currAttempt, letterPos: currAttempt.letterPos - 1 });
    };

    const onEnter = () => {
        if (gameState.gameOver) {
            setBoard(defaultBoard());
            setCurrAttempt({ attempt: 0, letterPos: 0 });
            setWordSet(new Set());
            setUsedLetters([]);
            setGameState({ gameOver: false, win: false });

            setCorrectWord("");

            getWords();
            return;
        }
        if (currAttempt.letterPos !== 5) return;

        if (toastMessage) setToastMessage("");

        let currWord = "";
        for (let i = 0; i < 5; i++) {
            currWord += board[currAttempt.attempt][i];
        }
        if (wordSet.has(currWord.toLowerCase())) {
            setCurrAttempt({ attempt: currAttempt.attempt + 1, letterPos: 0 });
        } else {
            setToastMessage("Not a valid word");
            return;
        }

        if (currWord === correctWord) {
            setGameState({ gameOver: true, win: true });
            return;
        }

        if (currAttempt.attempt === 5) {
            setGameState({ gameOver: true, win: false });
        }
    };

    const resizeBoardToFit = useCallback(() => {
        var width = Math.min(Math.floor(boardContainerElem.current.clientHeight * (5 / 6)), 350);
        var height = 6 * Math.floor(width / 5);
        boardElem.current.style.width = `${width}px`;
        boardElem.current.style.height = `${height}px`;
    }, []);

    useEffect(() => {
        window.addEventListener("resize", resizeBoardToFit);
        return () => window.removeEventListener("resize", resizeBoardToFit);
    }, [resizeBoardToFit]);

    useEffect(() => {
        resizeBoardToFit();
    }, [resizeBoardToFit]);

    return (
        <div className="App">
            <nav>
                <h1>Wordle</h1>
            </nav>
            <AppContext.Provider
                value={{
                    board,
                    setBoard,
                    currAttempt,
                    setCurrAttempt,
                    onSelectLetter,
                    onDelete,
                    onEnter,
                    correctWord,
                    usedLetters,
                    setUsedLetters,
                    gameState,
                    setGameState,
                    kbBusy,
                    setKbBusy,
                }}
            >
                <div className="game-container">
                    {toastMessage ? <Toast message={toastMessage} /> : ""}
                    {gameState.gameOver ? <GameOver /> : ""}
                    <div className="board-container" ref={boardContainerElem}>
                        <Board useRef={boardElem} />
                    </div>
                    <Keyboard />
                </div>
            </AppContext.Provider>
        </div>
    );
}

export default App;
