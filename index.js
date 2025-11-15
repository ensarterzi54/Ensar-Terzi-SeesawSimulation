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

    const plank = document.querySelector(".plank")
    const clickable = document.querySelector(".clickable")

    let previewCircle = document.createElement("div")
    previewCircle.className = "preview-circle"
    plank.appendChild(previewCircle)

    clickable.addEventListener("mousemove", (event) => {
        console.log("Mouse move");
        const rect = clickable.getBoundingClientRect()
        const hoverX = event.clientX - rect.left;
        previewCircle.style.left = hoverX - 20 + "px"
        previewCircle.innerHTML = data["Next Weight"]
        previewCircle.style.opacity = "1"
    })

    // Mouse clickable'dan çıkınca preview kaybolsun
    clickable.addEventListener("mouseleave", () => {
        console.log("mouse leave")
        previewCircle.style.opacity = "0"
    })

    clickable.addEventListener("click", (event) => {
        const plankPosition = plank.getBoundingClientRect()
        let clickX = event.clientX - plankPosition.left - 20

        const plankCenter = plank.offsetWidth / 2
        const distanceToCenter = Math.abs((clickX + 20) - plankCenter)
        const side = (clickX + 20) < plankCenter ? "Sol" : "Sağ"
        console.log(`Clicked at ${clickX}, Side: ${side}, Distance to center: ${distanceToCenter}`)

        //Ağırlık elementi
        const circle = document.createElement("div")
        circle.className = "weight-circle"
        circle.innerHTML = data["Next Weight"]
        circle.title = `${side} - ${distanceToCenter.toFixed(0)}px`

        const container = plank.parentElement
        const containerRect = container.getBoundingClientRect()

        circle.style.position = "fixed"
        circle.style.left = event.clientX - 20 + "px"
        circle.style.top = containerRect.top - 100 + "px"
        circle.style.transition = "top 0.5s ease-in"
        circle.style.transform = "none";

        container.appendChild(circle)

        setTimeout(() => {
            circle.style.top = containerRect.top + plankPosition.top - containerRect.top + "px"
        }, 10);

        setTimeout(() => {
            circle.style.position = "absolute"
            circle.style.left = clickX + "px"
            circle.style.top = "0px";
            circle.style.transition = "none"
            circle.style.transform = ""
            
            plank.appendChild(circle)
        }, 510)

        data["Next Weight"] = Math.floor(Math.random() * 10) + 1
        document.querySelector(".box2 .value").innerHTML = data["Next Weight"]
        if(side === "Sol"){
            data["Left Weight"] += parseInt(circle.innerHTML)
            document.querySelector(".box1 .value").innerHTML = data["Left Weight"]
        } else if(side === "Sağ"){
            data["Right Weight"] += parseInt(circle.innerHTML)
            document.querySelector(".box3 .value").innerHTML = data["Right Weight"]
        }
    })
})