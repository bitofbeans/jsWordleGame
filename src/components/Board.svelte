<!-- Game Board -->
<script>
    import { onMount } from "svelte";
    import Tile from "./Tile.svelte";
    import { board, boardElem, cursor, handleKeyDown, getDefaultBoard, correctWord } from "../util";

    // Get Board element
    let boardBinding;
    onMount(() => boardElem.set(boardBinding));

    let boardState = getDefaultBoard();

    $handleKeyDown = ({ key }) => {
        if (key === "Enter") {
            if ($cursor.row > 5) return;

            const boardWord = $board[$cursor.row].join("");

            let charArray = $correctWord.split("");
            let uniqueChars = charArray.filter((letter, i) => boardWord[i] !== letter);

            boardWord.split("").forEach((letter, i) => {
                if ($correctWord[i] == letter) {
                    boardState[$cursor.row][i] = "correct";
                } else if (uniqueChars.includes(letter)) {
                    const index = uniqueChars.indexOf(letter);
                    uniqueChars[index] = ""; // remove so we dont repeat it
                    boardState[$cursor.row][i] = "present";
                } else {
                    boardState[$cursor.row][i] = "absent";
                }
            });

            // move cursor down
            $cursor.row++;
            $cursor.letterPos = 0;
        } else if (key === "Backspace") {
            if ($cursor.letterPos === 0) return;

            $board[$cursor.row][$cursor.letterPos - 1] = "";
            $cursor.letterPos--;
        } else if ([..."qwertyuiopasdfghjklzxcvbnm"].includes(key)) {
            // if it is a keyboard letter
            if ($cursor.letterPos > 4) return;

            $board[$cursor.row][$cursor.letterPos] = key;
            $cursor.letterPos++;
        }
    };
</script>

<div class="board" bind:this={boardBinding}>
    {#each $board as row, i}
        <div class="board-row">
            {#each row as _, j}
                <Tile state={boardState[i][j]} row={i} letterPos={j} />
            {/each}
        </div>
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

    .board-row {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        grid-gap: 5px;
        -ms-grid-columns: repeat(5, 1fr);
    }
</style>
