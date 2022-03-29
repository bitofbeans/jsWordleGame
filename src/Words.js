import wordBank from "./word-bank.txt";
export const boardDefault = [
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
];

export const generateWordSet = async () => {
    let wordSet;
    let word;
    await fetch(wordBank)
        .then((response) => response.text())
        .then((result) => {
            const wordArray = result.split("\r\n");
            word = wordArray[Math.floor(Math.random() * wordArray.length)];
            wordSet = new Set(wordArray);
        });
    return { wordSet, word };
};
