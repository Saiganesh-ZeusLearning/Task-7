// const wrapper = document.querySelector(".wrapper");

// class ParentDiv{
    //     constructor(){
        //         const backgroundDiv = document.createElement("div");
        //     }
// };

// let obj = new ParentDiv();
// console.log(obj.ParentDiv);

const body = document.body;

const childDiv = document.createElement("div");
childDiv.classList.add("childDiv");

const backgroundDiv = document.createElement("div");
backgroundDiv.classList.add("parentDiv");
backgroundDiv.appendChild(childDiv);
body.appendChild(backgroundDiv);

let offSetX = 0;
let offSetY = 0;

let startX, startY;
let dragging = false;


const parent = childDiv.parentElement;
let maxX, maxY;

function updateBounds() {
    maxX = parent.clientWidth - childDiv.clientWidth;
    maxY = parent.clientHeight - childDiv.clientHeight;

    offSetX = Math.min(offSetX, maxX);
    offSetY = Math.min(offSetY, maxY);
    moveTo(offSetX, offSetY);
}

updateBounds();

window.addEventListener("resize", updateBounds);

function moveTo(x, y){
    
    x = Math.max(0, Math.min(x,maxX));
    y = Math.max(0, Math.min(y, maxY));
    
    offSetX = x;
    offSetY = y;

    childDiv.style.transform = `translate(${x}px, ${y}px)`;
}


childDiv.addEventListener("pointerdown", e =>{
    dragging = true;
    startX = e.clientX - offSetX;
    startY = e.clientY - offSetY;
    childDiv.style.transform = `scale(0.7)`;
    childDiv.style.cursor = "grabbing";
});

document.addEventListener("pointermove", e => {
    if(!dragging) return;
    moveTo(e.clientX - startX, e.clientY - startY);
});

document.addEventListener("pointerup", () => {
    dragging = false;
    childDiv.style.transform = `scale(1)`;
    childDiv.style.cursor = "grab";
})

