r = 3.1
d = [
    {   x: 10,      // 0
        y: 10,
        b: "white",
        sz: [1, 9] }, 
    {   x: 60,      // 1
        y: 10,
        b: "white",
        sz: [0, 2, 4] },
    {   x: 110,     // 2
        y: 10,
        b: "white",
        sz: [1, 7, 14] },  // a 7-eshez nem kell kötni, az csak a srég-vonal-teszt
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
    {   x: 100,      // 7   // ez igazából x: 60, y: 40, és sz: [4, 6, 8], csak a srég-vonal-teszt miatt van ez
        y: 100,
        b: "#94c7fe",
        sz: [2, 4, 6, 8] },
    // HF: folytatni!
]
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("mt").innerHTML = d.map(p => 
        `<circle cx="${p.x}" cy="${p.y}" r="${r}" fill="${p.b}" stroke="#123432" stroke-width="0.6" />`
    ).join("") + 
    d.map(p => p.sz.map(i => {
        if (i < d.length) {
            x = [d[i].x, p.x]
            y = [d[i].y, p.y]
            c = Math.sqrt((x[1] - x[0]) ** 2 + (y[1] - y[0]) ** 2)
            y = [y[0] + r * (y[1] - y[0]) / c, y[1] - r * (y[1] - y[0]) / c]
            x = [x[0] + r * (x[1] - x[0]) / c, x[1] - r * (x[1] - x[0]) / c]
            return `<line x1="${x[0]}" y1="${y[0]}" x2="${x[1]}" y2="${y[1]}" stroke="#123432" stroke-width="0.6"/>`
        }
    }).join("")).join("")
})



