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
        b: "white",
        nl: [1, 14] },
    {   x: 25,      // 3
        y: 25,
        b: "FireBrick", // https://htmlcolorcodes.com/color-names/
        nl: [4, 10] },
    {   x: 60,      // 4
        y: 25,
        b: "white",
        nl: [1, 3, 5, 7] },
    {   x: 95,      // 5
        y: 25,
        b: "Teal",
        nl: [4, 13] },
    {   x: 40,      // 6
        y: 40,
        b: "white",
        nl: [7, 11] },
    {   x: 60,      // 7
        y: 40,
        b: "white",
        nl: [4, 6, 8] },
    // HW: to continue!
]
drag = { started: -1, sx: 0, sy: 0, lastx: 0, lasty: 0 }
function dragstart(e) {
    t = e.target
    id = t.getAttribute("id").substring(1)
    document.getElementById(`c${id}`).setAttribute("fill","#bababe")
    drag.sx = t.getAttribute("cx"), drag.sy = t.getAttribute("cy")
    drag.started = id, drag.lastx = e.x, drag.lasty = e.y
    t.style = "cursor: grab;"
    t.remove()
    document.getElementById("mt").appendChild(t)
}
function dragend(e) {
    e.target.style = ""
    id = drag.started
    if (id >= 0) {
        document.getElementById(`c${id}`).setAttribute("fill", "white")
        cx = Number(e.target.getAttribute("cx"))
        cy = Number(e.target.getAttribute("cy"))
        gp = false
        d[id].nl.forEach(n => {
            if (n < d.length && d[n].b == "white" && Math.abs(d[n].x - cx) < r && Math.abs(d[n].y - cy) < r)
                gp = true, gpn = n
        })
        if (gp) {
            d[gpn].b = d[id].b, d[id].b = "white"
            e.target.setAttribute("cx",  d[gpn].x)
            e.target.setAttribute("cy",  d[gpn].y)
            e.target.setAttribute("id",`x${gpn}`)
        } else {
            e.target.setAttribute("cx", drag.sx)
            e.target.setAttribute("cy", drag.sy)
        }
        gp = false
        drag.started = -1
    }
}
function move(e) {
    if (drag.started >= 0) {
        id = drag.started
        o = document.getElementById(`x${id}`)
        x = Number(o.getAttribute("cx"))
        y = Number(o.getAttribute("cy"))
        nx = x + (e.x - drag.lastx) / 5
        ny = y + (e.y - drag.lasty) / 5
        o.setAttribute("cx", nx )
        o.setAttribute("cy", ny )
        drag.lastx = e.x, drag.lasty = e.y
    }
}
function endmove(t) {
    id = t.getAttribute("id").substring(1)
    if (drag.started == id) {
        t.style = "", drag.started = -1
        document.getElementById(`c${id}`).setAttribute("fill","white")
        t.setAttribute("cx", drag.sx), t.setAttribute("cy", drag.sy)
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
                onmouseup="dragend(event)" onmousemove="move(event)"/>`
    }).join("")
})
