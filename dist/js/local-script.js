function addElement(location, type, values) {
    let element = document.createElement(type); // "script", "link"
    Object.entries(values).forEach(([key, value]) => {
        element[key] = value; // element.src = value
    });
    document[location].appendChild(element);
    return element;
}
// ADD CSS - - - - - - - - - - - - - - - - - - - -
addElement("head", "link", { rel: "stylesheet", href: "./style/style.css" }); // Add CSS
addElement("head", "link", {
    rel: "stylesheet",
    href: "https://bitofbeans.github.io/cssContainedBootstrap/4.6.1/bootstrap.min.css",
}); // Add Bootstrap
// ADD SCRIPTS - - - - - - - - - - - - - - - - - -
var jQuery = addElement("body", "script", {
    src: "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js",
    id: "jquery",
});
// When finished loading, add script
jQuery.onload = () => {
    let script = addElement("body", "script", { src: "./js/main.js", id: "index" });
    // When script is loaded
    script.onload = () => {
        // Remove injection scripts
        try {
            document.querySelector("#script").remove();
            document.querySelector("#index").remove();
            document.querySelector("#jquery").remove();
        }
        catch {
            console.log("Error when cleaning up scripts. (Not Found)");
        }
    };
};
