// script.js


const images = [
    { id: "pic1", src: "../pics/pic1.JPG" },
    { id: "pic2", src: "../pics/pic2.JPG" },
    {id: "pic3", src: "../pics/pic3.JPG" },
];

const defs = document.getElementById("pattern-defs");

images.forEach(img => {
    const pattern = document.createElementNS("http://www.w3.org/2000/svg", "pattern");
    pattern.setAttribute("id", img.id);
    pattern.setAttribute("patternUnits", "objectBoundingBox");
    pattern.setAttribute("width", "1");
    pattern.setAttribute("height", "1");

    const image = document.createElementNS("http://www.w3.org/2000/svg", "image");
    image.setAttribute("href", img.src);
    image.setAttribute("x", "0");
    image.setAttribute("y", "0");
    image.setAttribute("width", "170");
    image.setAttribute("height", "170");
    image.setAttribute("preserveAspectRatio", "xMidYMid slice");

    pattern.appendChild(image);
    defs.appendChild(pattern);
});