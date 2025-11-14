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

    const plank = document.querySelector(".plank");
    const clickable = document.querySelector(".clickable");
    const resetButton = document.querySelector(".resetButton");
    let circleCount = 0; // Yuvarlakların konumunu takip etmek için

    let previewCircle = document.createElement("div");
    previewCircle.className = "preview-circle";
    plank.appendChild(previewCircle);

    clickable.addEventListener("mousemove", (event) => {
        console.log("Mouse move");
        const rect = clickable.getBoundingClientRect();
        const hoverX = event.clientX - rect.left;
        previewCircle.style.left = hoverX - 20 + "px";
        previewCircle.innerHTML = data["Next Weight"];
        previewCircle.style.opacity = "1";
    });

    // Mouse clickable'dan çıkınca preview kaybolsun
    clickable.addEventListener("mouseleave", () => {
        console.log("mouse leave");
        previewCircle.style.opacity = "0";
    });
})