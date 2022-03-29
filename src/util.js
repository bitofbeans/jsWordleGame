// Utility functions and stores
import { writable } from 'svelte/store';

export const getDefaultBoard = () => {
    return [
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
    ];
};

// create a store for the board
export const board = writable(getDefaultBoard())

export const boardElem = writable()
export const boardContainerElem = writable()