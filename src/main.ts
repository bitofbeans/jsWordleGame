// Compiled from TypeScript
class GameManager {
    html: HTMLManager;
    input: InputManager;
    constructor() {
        this.html = new HTMLManager();
        this.input = new InputManager(this);
        
        this.setup()
    }

    setup() {
        this.html.createBoard
    }
}

class HTMLManager {
    createBoard() {
        // Game container will contain grid and tile containers
        // Grid container will contain rows of tiles
        // Tile container will contain tiles that are visible on screen
        $("div.bootstrap").remove();
        let game_container = $("<div>", { class: "game-container" });
        let grid_container = $("<div>", { class: "grid-container" });
        let tile_container = $("<div>", { class: "tile-container" });

        for (let i = 0; i < 6; i++) {
            let gridRow = $("<div>", { class: "grid-row" });
            for (let j = 0; j < 5; j++) {
                let gridCell = $("<div>", { class: "grid-cell cell" });
                gridRow.append(gridCell);
            }
            $(grid_container).append(gridRow);
        }

        let reset_button = $("<div>", {
            tabindex: "0",
            class: "button reset-button",
            text: "⟳",
        });
        let delete_button = $("<div>", {
            tabindex: "0",
            text: "×",
            class: "button delete-button",
        });

        let score_container = $("<div>", {
            class: "score-container",
        }).append(
            $("<div>", {
                class: "score-text",
                text: "0",
            })
        );
        let game_message = $("<div>", {
            class: "game-message",
        }).append(
            $("<p>"),
            $("<div>", {
                tabindex: "0",
                class: "button main-continue-button",
                text: "▶",
            }),
            $("<div>", {
                tabindex: "0",
                class: "button main-reset-button",
                text: "⟳",
            }),
            
        );

        $(game_container).append(game_message);
        $(game_container).append(reset_button);
        $(game_container).append(delete_button);
        $(game_container).append(score_container);

        $(game_container).append(grid_container);
        $(game_container).append(tile_container);

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
