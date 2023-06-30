r = 3.1
d = [
    {   x: 10,      // 0
        y: 10,
        b: "white",
        nl: [1, 9] }, 
    {   x: 60,      // 1
        y: 10,
        b: "white",
        nl: [0, 2, 4] },
    {   x: 110,     // 2
        y: 10,
        b: "#94c7fe",       // color-test #1
        nl: [1, 7, 14] },   // a 7-is wrong, this is only a test for slant line. Correctly: [1, 14]
    {   x: 25,      // 3
        y: 25,
        b: "white",
        nl: [4, 10] },
    {   x: 60,      // 4
        y: 25,
        b: "Crimson",           // color-test #2  //https://htmlcolorcodes.com/color-names/
        nl: [1, 3, 5, 7] },
    {   x: 95,      // 5
        y: 25,
        b: "RoyalBlue",          // color-test #3 
        nl: [4, 13] },
    {   x: 40,      // 6
        y: 40,
        b: "white",
        nl: [7, 11] },
    {   x: 100,      // 7   (correctly:  x: 60, y: 40, és nl: [4, 6, 8], slant line test)
        y: 33,
        b: "yellow",        // color-test #4
        nl: [2, 4, 6, 8] },
    // HW: to continue! (the slant line test and the color-test can be deleted)
]
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("mt").innerHTML = d.map((p, i) => 
        `<circle    id="c${i}" cx="${p.x}" cy="${p.y}" r="${r}" fill="${p.b}" 
                    class="cx" stroke="#123432" stroke-width="0.6" />`
    ).join("") + 
    d.map(p => p.nl.map(i => {
        if (i < d.length) {
            x = [d[i].x, p.x], y = [d[i].y, p.y], dy = y[1] - y[0], dx = x[1] - x[0]
            c = Math.sqrt((x[1] - x[0]) ** 2 + (y[1] - y[0]) ** 2)
            y = [y[0] + r*dy/c, y[1] - r*dy/c], x = [x[0] + r*dx/c, x[1] - r*dx/c]
            // https://user-images.githubusercontent.com/34095687/249900032-7441001b-7f75-422e-a8f1-31fd893f7538.jpeg
            return `<line x1="${x[0]}" y1="${y[0]}" x2="${x[1]}" y2="${y[1]}" stroke="#123432" stroke-width="0.6"/>`
        }
    }).join("")).join("")
})



