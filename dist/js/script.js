import { addElement } from "./addElemToDom.js";
// ADD CSS - - - - - - - - - - - - - - - - - - - -
addElement("head", "link", { rel: "stylesheet", href: "/dist/style/style.css" }); // Add CSS
addElement("head", "link", {
    rel: "stylesheet",
    href: "https://bitofbeans.github.io/cssContainedBootstrap/4.6.1/bootstrap.min.css",
}); // Add Bootstrap
// ADD SCRIPTS - - - - - - - - - - - - - - - - - -
var jqueryscript = addElement("body", "script", {
    src: "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js",
    id: "jquery",
});
// When finished loading, add script
jqueryscript.onload = () => {
    let script = addElement("body", "script", { src: "/dist/js/main.js", id: "index" });
    // When script is loaded
    script.onload = () => {
        // Remove injection scripts
        try {
            document.querySelector("#index").remove();
            document.querySelector("#jquery").remove();
            document.querySelector("#script").remove();
        }
        catch {
            console.log("Error when cleaning up scripts. (Not Found)");
        }
    };
};
