// Compiled from TypeScript
class GameManager {
    html: HTMLManager;
    input: InputManager;
    board: Board;
    wordlist: any;
    constructor() {
        this.html = new HTMLManager();
        this.input = new InputManager(this);

        $.get("https://bitofbeans.github.io/jsWordleGame/dist/js/wordlist.txt", (data) => {
            this.wordlist = data.split(",");
        }).done(() => {
            // After wordlist is retrieved
            this.setup();
        });
    }

    setup() {
        this.html.createBoard(this, (letter) => {
            this.letter(letter);
        });

        this.board = new Board(this.wordlist);

        let keys = [..."qwertyuiopasdfghjklzxcvbnm"];
        keys.forEach((key) => {
            this.input.addKeys(key, () => {
                this.letter(key);
                this.animateKeyboardKey(key.toUpperCase());
            });
        });
        this.input.addKeys("Enter", () => {
            this.entered();
        });
        this.input.addKeys("Backspace", () => {
            this.delete();
        });
    }

    letter(letter: string) {
        // add letter to the word
        let tryWrite = this.board.write(letter);
        if (tryWrite) {
            // if successful,
            this.html.update(this.board, letter);
        }
    }

    delete() {
        this.board.delete();
        console.log(this.board.board);
    }

    entered() {
        let word = this.board.getWord();
        if (word.text.length < 5) {
            alert("too short");
        } else if (!this.wordlist.includes(word.text)) {
            alert("not in word list");
        } else if (word.text === this.board.solution) {
            alert("yup, you got it cuh");
        } else {
            this.html.enter(this.board, this.board.wordIdx, this.board.solution)
            this.board.newLine();
        }
    }

    animateKeyboardKey(key: string) {
        let button = $("#" + key);
        this.html.effect(button, "btn-click");
    }
}

class HTMLManager {
    update(board: Board, key: string) {

    }

    enter(board: Board, idx: number, solution: string) {
        var colorMap = board.board[idx].colorize(solution)
        for (let i = 0; i < 5; i++) {
            let id: string = `.cell-${idx}-${i}`
            $(id).text(board.board[idx].text[i])
            $(id).addClass(`letter-${colorMap[i]}`)

        }
    }

    effect(element: any, effect: string) {
        switch (effect) {
            case "btn-click":
                element.addClass("btn-clicked");
                setTimeout(() => {
                    element.removeClass("btn-clicked");
                }, 200);
                break;
        }
    }

    createBoard(gamemanager, callbackOnKeyPress) {
        // Game container will contain grid and tile containers
        // Grid container will contain rows of tiles
        // Tile container will contain tiles that are visible on screen
        let game_container = $("<div>", { class: "game-container" });
        let grid_container = $("<div>", { class: "grid-container" });
        let keyboard_container = $("<div>", { class: "keyboard-container" });

        for (let i = 0; i < 6; i++) {
            let gridRow = $("<div>", { class: "grid-row" });
            for (let j = 0; j < 5; j++) {
                let gridCell = $("<div>", { class: `grid-cell cell-${i}-${j}` });
                gridRow.append(gridCell);
            }
            $(grid_container).append(gridRow);
        }

        let keymap = [[..."qwertyuiop"], [..."asdfghjkl"], ["enter", ..."zxcvbnm", "del"]];

        for (let i = 0; i < 3; i++) {
            let row = $("<div>", { class: "keyboard-row" });
            if (i == 1) {
                // Spacer on second row, first item
                row.append(
                    $("<div>", {
                        class: "spacer",
                    })
                );
            }
            keymap[i].forEach((letter) => {
                let button = $("<button>", {
                    id: letter,
                    class: "button keyboard-button",
                    text: letter,
                });
                button.on("mousedown", () => {
                    this.effect(button, "btn-click");
                    callbackOnKeyPress.apply(gamemanager, [letter]);
                });
                row.append(button);
            });

            if (i == 1) {
                // Spacer on second row, last item
                row.append(
                    $("<div>", {
                        class: "spacer",
                    })
                );
            }

            $(keyboard_container).append(row);
        }

        $(game_container).append(grid_container);
        $(game_container).append(keyboard_container);

        let container = $("<div>", {
            class: "bootstrap",
        }).append(game_container);

        $(document.body).append(container);
    }
}

class InputManager {
    gamemanager: GameManager;
    constructor(gamemanager: GameManager) {
        this.gamemanager = gamemanager;
    }

    addKeys(key: string, callback: any): void {
        document.addEventListener("keydown", (event) => {
            switch (event.key) {
                case key:
                    callback.call(this.gamemanager);
                    break;
            }
        });
    }

    bind(element: HTMLElement, event: string, callback: any): void {
        element.addEventListener(event, callback);
    }
}

class Board {
    board: Word[];
    wordIdx: number;
    solution: string;
    constructor(wordlist: string[]) {
        let idx = Math.floor(Math.random() * wordlist.length);
        this.solution = wordlist[idx];
        console.log(this.solution);
        this.wordIdx = 0;

        this.board = [new Word(), new Word(), new Word(), new Word(), new Word(), new Word()];
        console.log(this.board);
    }

    write(char: string) {
        let word = this.board[this.wordIdx]; // get word value
        if (this.wordIdx > 5 || word.text.length >= 5) {
            // if last word or word is already too long
            return false;
        }
        this.board[this.wordIdx].text = word.text.concat(char);
        console.log(this.board);

        return true;
    }

    delete() {
        let word = this.board[this.wordIdx]; // get word value
        if (word.text == "" || word.text.length == 0) {
            // if word is empty
            return;
        }
        // cut off last letter with substring()
        this.board[this.wordIdx].text = word.text.substring(0, word.length - 1);
    }

    newLine(): boolean {
        if (this.wordIdx > 5) {
            // last row, game over
            return false;
        } else {
            this.wordIdx++;
            return true;
        }
    }

    getWord(idx = this.wordIdx) {
        return this.board[idx];
    }
}

class Word {
    text: string;
    length: number;
    colorMap: any[];
    constructor() {
        this.text = "";
        this.length = 0;
    }
    add(str: string) {
        this.text = this.text.concat(str);
    }
    colorize(solution: string) {
        this.colorMap = [];

        for (let i = 0; i < 5; i++) {
            console.log(solution.split(""));
            if (this.text[i] == solution[i]) {
                // in correct spot
                this.colorMap.push("green");
            } else if (solution.split("").includes(this.text[i])) {
                // in word but wrong spot
                this.colorMap.push("yellow");
            } else {
                // not in word
                this.colorMap.push("grey");

            }
        }
        return this.colorMap
    }
}

var game: GameManager;
window.requestAnimationFrame(() => {
    game = new GameManager();
});
