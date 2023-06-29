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
    }
]
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("mt").innerHTML = malom.map((p, i) => 
        `<circle cx="${p.x}" cy="${p.y}" r="6" fill="none" stroke="black"></circle>`
    ).join("")
})



