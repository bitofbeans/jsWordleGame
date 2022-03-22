export function addElement(location, type, values) {
    let element = document.createElement(type); // "script", "link"
    Object.entries(values).forEach(([key, value]) => {
        element[key] = value; // element.src = value
    });
    document[location].appendChild(element);
    return element;
}
