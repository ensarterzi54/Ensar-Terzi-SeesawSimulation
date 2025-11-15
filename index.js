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
    const resetButton = document.querySelector(".resetButton")

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

    const angleValue = (rightTorque, leftTorque) => {
        const rawAngle = (rightTorque - leftTorque) / 10
        const angle = Math.max(-30, Math.min(30, rawAngle))

        return angle
    }
    const calculateTilt = () => {
        const circles = plank.querySelectorAll(".weight-circle")
        const plankCenter = plank.offsetWidth / 2
        let leftTorque = 0
        let rightTorque = 0

        circles.forEach((circle) => {
            const weight = parseInt(circle.innerHTML) || 0
            const position = parseFloat(circle.style.left) + 20
            const distanceFromCenter = position - plankCenter

            if (distanceFromCenter < 0) {
                leftTorque += weight * Math.abs(distanceFromCenter)
            } else {
                rightTorque += weight * Math.abs(distanceFromCenter)
            }
        })

        const angle = angleValue(rightTorque, leftTorque)
        plank.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`
        data["Tilt Angle"] = Math.round(angle)
        document.querySelector(".box4 .value").innerHTML = data["Tilt Angle"]

    }

    clickable.addEventListener("click", (event) => {
        const plankPosition = plank.getBoundingClientRect()
        let clickX = event.clientX - plankPosition.left - 20

        if (clickX < 0) {
            clickX = 0
        }
        if (clickX > plank.offsetWidth - 40) {
            clickX = plank.offsetWidth - 40
        }
        
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
            calculateTilt()
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

    resetButton.addEventListener("click", () => {
        const circles = plank.querySelectorAll(".weight-circle")
        circles.forEach((circle) => circle.remove())

        data["Left Weight"] = initialData["Left Weight"]
        data["Next Weight"] = initialData["Next Weight"]
        data["Right Weight"] = initialData["Right Weight"]
        data["Tilt Angle"] = initialData["Tilt Angle"]

        const angle = angleValue(0, 0)
        plank.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`

        document.querySelector(".box1 .value").innerHTML = data["Left Weight"]
        document.querySelector(".box2 .value").innerHTML = data["Next Weight"]
        document.querySelector(".box3 .value").innerHTML = data["Right Weight"]
        document.querySelector(".box4 .value").innerHTML = data["Tilt Angle"]

        previewCircle.innerHTML = data["Next Weight"]
    });

    
})