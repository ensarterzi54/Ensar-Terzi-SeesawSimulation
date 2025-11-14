document.addEventListener('DOMContentLoaded', () => {
    const initialData = {
        "Left Weight": 0,
        "Next Weight": 5,
        "Right Weight": 0,
        "Tilt Angle": 0,
    }

    const data = { ...initialData }

    document.querySelector(".box1 .value").textContent = data["Left Weight"]
    document.querySelector(".box2 .value").textContent = data["Next Weight"]
    document.querySelector(".box3 .value").textContent = data["Right Weight"]
    document.querySelector(".box4 .value").textContent = data["Tilt Angle"]


    
})