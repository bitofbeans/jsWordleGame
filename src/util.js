// Utility functions and stores
import { writable } from "svelte/store";
import guessableWords from "./guessable-words.json";
import targetWords from "./target-words.json";

const getDefaultBoard = () => [
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
];

const generateWordSet = () => {
    // random word from the target words
    let word = targetWords[Math.floor(Math.random() * targetWords.length)];

    // guessable word set
    let words = new Set(guessableWords);

    wordSet.set(words);
    correctWord.set(word);
};

const board = writable(getDefaultBoard());

const boardElem = writable();

const cursor = writable({ row: 0, letterPos: 0 });

const wordSet = writable();
const correctWord = writable();
generateWordSet();
correctWord.set("still"); // for testing

const handleKeyDown = writable();

export {
    getDefaultBoard,
    generateWordSet,
    board,
    boardElem,
    wordSet,
    correctWord,
    cursor,
    handleKeyDown,
};
