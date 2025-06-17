class ParentDiv {
    constructor(container = document.body) {
        this.element = document.createElement("div");
        this.element.classList.add("parentDiv");
        container.appendChild(this.element);
    }

    get width() {
        return this.element.clientWidth;
    }

    get height() {
        return this.element.clientHeight;
    }

    appendChild(childElement) {
        this.element.appendChild(childElement);
    }
}

class ChildDiv {
    constructor(parentDiv) {
        this.parent = parentDiv;
        this.element = document.createElement("div");
        this.element.classList.add("childDiv");

        this.offsetX = 0;
        this.offsetY = 0;
        this.dragging = false;

        this.parent.appendChild(this.element);
        this.updateBounds();
        this.initEvents();
        window.addEventListener("resize", () => this.updateBounds());
    }

    updateBounds() {
        this.maxX = this.parent.width - this.element.clientWidth;
        this.maxY = this.parent.height - this.element.clientHeight;

        this.offsetX = Math.min(this.offsetX, this.maxX);
        this.offsetY = Math.min(this.offsetY, this.maxY);

        this.moveTo(this.offsetX, this.offsetY);
    }

    moveTo(x, y) {
        x = Math.max(0, Math.min(x, this.maxX));
        y = Math.max(0, Math.min(y, this.maxY));

        this.offsetX = x;
        this.offsetY = y;

        this.element.style.transform = `translate(${x}px, ${y}px)`;
    }

    initEvents() {
        this.element.addEventListener("pointerdown", (e) => {
            this.dragging = true;
            this.startX = e.clientX - this.offsetX;
            this.startY = e.clientY - this.offsetY;
            this.element.style.cursor = "grabbing";
        });
        
        document.addEventListener("pointermove", (e) => {
            if (!this.dragging) return;
            this.moveTo(e.clientX - this.startX, e.clientY - this.startY);
        });
        
        document.addEventListener("pointerup", () => {
            this.dragging = false;
            this.element.style.cursor = "grab";
        });
    }
}


const parent1 = new ParentDiv();          
const child1 = new ChildDiv(parent1);      

const parent2 = new ParentDiv();          
const child2 = new ChildDiv(parent2);      

const parent3 = new ParentDiv();          
const child3 = new ChildDiv(parent3);      

const parent4 = new ParentDiv();          
const child4 = new ChildDiv(parent4);      
