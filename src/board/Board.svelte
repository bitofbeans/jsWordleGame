<!-- Game Board -->
<script>
    import { onMount } from "svelte";
    import Tile from "./Tile.svelte";
    import Row from "./Row.svelte";
    import {
        board,
        boardElem,
        cursor,
        handleKeyDown,
        getDefaultBoard,
        correctWord,
        wordSet,
        addToast,
        usedLetters,
        gameState,
        toasts,
    } from "../util";

    // Get Board element
    let boardBinding;
    onMount(() => boardElem.set(boardBinding));

    let boardState = getDefaultBoard();

    let specialEvent = { row: -1 };

    $handleKeyDown = ({ key }) => {
        if (key === "Enter") {
            if ($gameState.gameOver === true) {
                // reset game
                $board = getDefaultBoard();
                boardState = getDefaultBoard();
                $cursor = { row: 0, letterPos: 0 };
                $gameState.gameOver = false;
                $gameState.win = false;
                $usedLetters = [];
                $toasts = []
                
                return;
            }

            if ($cursor.row > 5) return;

            onEnter();
        } else if (key === "Backspace") {
            if ($gameState.gameOver === true) return;
            if ($cursor.letterPos === 0) return; // left edge

            deleteLetter();
        } else if ([..."qwertyuiopasdfghjklzxcvbnm"].includes(key)) {
            // if it is a keyboard letter
            if ($gameState.gameOver === true) return;
            if ($cursor.letterPos > 4) return; // right edge

            writeLetter(key);
        }
    };

    const onEnter = () => {
        const boardWord = $board[$cursor.row].join("");

        if (boardWord.length !== 5) {
            showFeedback("Not enough letters", "shake", 750);
            return;
        } else if (!$wordSet.has(boardWord)) {
            showFeedback("Not in wordlist", "shake", 750);
            return;
        }
        // else

        colorLetters(boardWord);

        let row = $cursor.row;

        if (boardWord === $correctWord) {
            setTimeout(() => {
                // after all letters are flipped
                addToast({ content: "Great, press Enter to play again", timeOut: 5000 });
                
                boardState[row] = boardState[row].map((x) => "guessed-correct");
                
                $gameState.gameOver = true;
                $gameState.win = true;
            }, 1600);
        } else if (row === 5) {
            setTimeout(() => {
                // after all letters are flipped
                addToast({
                    content: `The correct word was ${$correctWord.toUpperCase()}, press Enter to try again`,
                    timeOut: false,
                });

                $gameState.gameOver = true;
                $gameState.win = false;
            }, 1600);
        } else {
            // move cursor down
            $cursor.row++;
            $cursor.letterPos = 0;

            pauseInput(1500);
        }
    };

    const showFeedback = (toastMsg, event, eventMS, row = $cursor.row) => {
        addToast({ content: toastMsg });
        specialEvent = {
            row,
            event,
        };
        setTimeout(() => (specialEvent = { row: -1 }), eventMS);
    };

    const colorLetters = (boardWord) => {
        let charArray = $correctWord.split("");
        let uniqueChars = charArray.filter((letter, i) => boardWord[i] !== letter);

        boardWord.split("").forEach((letter, i) => {
            if ($correctWord[i] == letter) {
                boardState[$cursor.row][i] = "correct";

                $usedLetters[letter] = "correct";
            } else if (uniqueChars.includes(letter)) {
                // remove so we dont repeat it
                const index = uniqueChars.indexOf(letter);
                uniqueChars[index] = "";
                boardState[$cursor.row][i] = "present";

                if (!$usedLetters[letter]) {
                    // make sure that we don't overwrite it if it exists
                    // if it exists, then it might equal "correct"
                    $usedLetters[letter] = "present";
                }
            } else {
                boardState[$cursor.row][i] = "absent";

                $usedLetters[letter] = "absent";
            }
        });
    };

    const pauseInput = (ms) => {
        // if it is used, handleKeyDown wont do anything for some ms
        let temp = $handleKeyDown;
        $handleKeyDown = null;
        setTimeout(() => ($handleKeyDown = temp), 1500);
    };

    const writeLetter = (key) => {
        $board[$cursor.row][$cursor.letterPos] = key;

        $cursor.letterPos++;
    };

    const deleteLetter = () => {
        $board[$cursor.row][$cursor.letterPos - 1] = "";

        $cursor.letterPos--;
    };
</script>

<div class="board" bind:this={boardBinding}>
    {#each $board as row, i}
        <Row special={specialEvent.row === i ? specialEvent.event : ""}>
            {#each row as _, j}
                <Tile state={boardState[i][j]} row={i} letterPos={j} />
            {/each}
        </Row>
    {/each}
</div>

<style>
    .board {
        display: grid;
        grid-template-rows: repeat(6, 1fr);
        grid-gap: 5px;
        padding: 10px;
        box-sizing: border-box;
        -ms-grid-rows: repeat(6, 1fr);
    }
</style>
