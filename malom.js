malom = [
    {
        x: 10,
        y: 10,
        b: "none",
        sz: [1, 9]
    },
    {
        x: 60,
        y: 10,
        b: "none",
        sz: [0, 2, 4]
    },
    {
        x: 110,
        y: 10,
        b: "none",
        sz: [1, 14]
    },
    {
        x: 25,
        y: 25,
        b: "none",
        sz: [4, 10]
    },
    {
        x: 60,
        y: 25,
        b: "none",
        sz: [1, 3, 5]
    },
    {
        x: 95,
        y: 25,
        b: "none",
        sz: [4, 13]
    }
]
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("mt").innerHTML = malom.map((p, i) => 
        `<circle cx="${p.x}" cy="${p.y}" r="6" fill="none" stroke="black"></circle>`
    ).join("") + 
    malom.map((p, i) => p.sz.map(j => {
        if (j < malom.length) {
            x = [malom[j].x, p.x].sort((a, b) => a - b)
            y = [malom[j].y, p.y].sort((a, b) => a - b)
            if (x[0] == x[1]) y = [y[0]+6, y[1]-6]
            else x = [x[0]+6, x[1]-6]
            return  `<line x1="${x[0]}" y1="${y[0]}" x2="${x[1]}" y2="${y[1]}" stroke="black" />`
        }
    }).join("")). join("")
    
})



