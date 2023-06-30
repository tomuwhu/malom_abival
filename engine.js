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
drag = { started: false, sx: 0, sy: 0, lastx: 0, lasty: 0 }
function dragstart(e) {
    id = e.target.getAttribute("id").substring(1)
    document.getElementById(`c${id}`).setAttribute("fill","#bababe")
    drag.sx = e.target.getAttribute("cx"), drag.sy = e.target.getAttribute("cy")
    drag.started = true, drag.lastx = e.x, drag.lasty = e.y
    e.target.style = "cursor: grab;"
}
function dragend(e) {
    e.target.style = ""
    drag.started = false
    id = e.target.getAttribute("id").substring(1)
    document.getElementById(`c${id}`).setAttribute("fill","white")
    cx = Number(e.target.getAttribute("cx"))
    cy = Number(e.target.getAttribute("cy"))
    gp = false
    d[id].nl.forEach(n => {
        if (n < d.length && d[n].b && Math.abs(d[n].x - cx) < r && Math.abs(d[n].x - cx) < r)
            gp = true, gpn = n
    })
    if (gp) {
        d[gpn].b = d[id].b
        d[id].b = "white"
        e.target.setAttribute("cx",  d[gpn].x)
        e.target.setAttribute("cy",  d[gpn].y)
        e.target.setAttribute("id", `x${gpn}`)
    } else {
        e.target.setAttribute("cx", drag.sx)
        e.target.setAttribute("cy", drag.sy)
    }
    gp = false
}
function move(e) {
    if (drag.started) {
        x = Number(e.target.getAttribute("cx"))
        y = Number(e.target.getAttribute("cy"))
        e.target.setAttribute("cx", x + (e.x - drag.lastx)/5)
        e.target.setAttribute("cy", y + (e.y - drag.lasty)/5)
        drag.lastx = e.x
        drag.lasty = e.y
    }
}
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("mt").innerHTML = d.map((p, i) => 
        `<circle id="c${i}" cx="${p.x}" cy="${p.y}" r="${r}" fill="white" stroke="#123432" stroke-width="0.6" />`
    ).join("") + 
    d.map(p => p.nl.map(i => {
        if (i < d.length) {
            x = [d[i].x, p.x], y = [d[i].y, p.y], dy = y[1] - y[0], dx = x[1] - x[0]
            c = Math.sqrt((x[1] - x[0]) ** 2 + (y[1] - y[0]) ** 2)
            y = [y[0] + r*dy/c, y[1] - r*dy/c], x = [x[0] + r*dx/c, x[1] - r*dx/c]
            // https://user-images.githubusercontent.com/34095687/249900032-7441001b-7f75-422e-a8f1-31fd893f7538.jpeg
            return `<line x1="${x[0]}" y1="${y[0]}" x2="${x[1]}" y2="${y[1]}" stroke="#123432" stroke-width="0.6"/>`
        }
    }).join("")).join("") + 
    d.map((p, i) => {
        if (p.b != "white") return `
        <circle id="x${i}" cx="${p.x}" cy="${p.y}" r="${r - .8}" fill="${p.b}" 
                class="cx" onmousedown="dragstart(event)" stroke="#333" stroke-width=".3"
                onmouseup="dragend(event)" onmousemove="move(event)" />`
    }).join("")

})



