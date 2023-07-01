r = 3.1
malom = [
    {   x: 10,      // 0
        y: 10,
        b: "white",
        sz: [1, 10] }, 
    {   x: 60,      // 1
        y: 10,
        b: "white",
        sz: [0, 2, 4] },
    {   x: 110,     // 2
        y: 10,
        b: "white",
        sz: [1, 14] },
    {   x: 25,      // 3
        y: 25,
        b: "white",
        sz: [4, 10] },
    {   x: 60,      // 4
        y: 25,
        b: "red",
        sz: [1, 3, 5, 7] },
    {   x: 95,      // 5
        y: 25,
        b: "blue",
        sz: [4, 13] },
    {   x: 40,      // 6
        y: 40,
        b: "white",
        sz: [7, 11] },
    {   x: 60,      // 7
        y: 40,
        b: "white",
        sz: [4, 6, 8] },
]
function cica() {
    document.getElementById("mt").innerHTML = malom.map(p => 
        `<circle cx="${p.x}" cy="${p.y}" r="${r}" fill="${p.b}" stroke="#123432" stroke-width="0.6" />`
    ).join("") + 
    malom.map(p => p.sz.map(i => {
        if (i < malom.length) {
            x = [malom[i].x, p.x].sort((a, b) => a - b)
            y = [malom[i].y, p.y].sort((a, b) => a - b)
            if (x[0] == x[1]) y = [y[0] + r, y[1] - r]
            else x = [x[0] + r, x[1] - r]
            return `<line x1="${x[0]}" y1="${y[0]}" x2="${x[1]}" y2="${y[1]}" stroke="#123432" stroke-width="0.6"/>`
        }
    }).join("")).join("")
}
document.addEventListener("DOMContentLoaded", cica)