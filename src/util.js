// Utility functions and stores
import { writable } from 'svelte/store';
import wordBank from "./word-bank.json"
export const getDefaultBoard = () => {
    return [
        ["D", "", "", "", ""],
        ["", "", "D", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
    ];
};

export const generateWordSet = () => {
    let correctWord = wordBank[Math.floor(Math.random() * wordBank.length)];
    
    let wordSet = new Set(wordBank);

    return { wordSet, correctWord };
};

// create a store for the board
export const board = writable(getDefaultBoard())

export const boardElem = writable()
export const boardContainerElem = writable()

const result = generateWordSet()

export const wordSet = writable(result.wordSet)
export const correctWord = writable(result.correctWord)