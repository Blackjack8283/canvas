const wrapper = document.getElementById("wrapper");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

class Vector2 {
    constructor(x=0,y=0) {
        this.x = x;
        this.y = y;
    }

    set(x,y){
        this.x = x;
        this.y = x;
        return this;
    }
    copy(array){
        this.x = array[0];
        this.y = array[1];
        return this;
    }
    clone(){
        return new Vector2(this.x,this.y);
    }
    add(vec){
        this.x += vec.x;
        this.y += vec.y;
        return this;
    }
    sub(vec){
        this.x -= vec.sub;
        this.y -= vec.sub;
        return this;
    }
    multiplyScalar(k){
        this.x *= k;
        this.y *= k;
        return this;
    }
    negate(){
        this.x *= -1;
        this.y *= -1;
        return this;
    }
    length(){
        const {x,y} = this;
        return Math.sqrt(x**2 + y**2);
    }
    normalize(){
        return this.multiplyScalar(1/this.length());
    }
}

let hold = false;
canvas.addEventListener("pointerdown", (e)=>{
    const x = e.clientX - canvas.offsetLeft;
    const y = e.clientY - canvas.offsetTop;
    hold = true;
    // line(x,y,r);
});

canvas.addEventListener("pointermove", (e)=>{
    const x = e.clientX - canvas.offsetLeft;
    const y = e.clientY - canvas.offsetTop;
    // line(x,y,r);
});

canvas.addEventListener("pointerup", (e)=>{
    hold = false;
});


const r = 3;
ctx.fillStyle = "black";
ctx.strokeStyle = "black";
onResize();

//四角形+半円二つ作って
ctx.beginPath();


function line(x,y,r){
    if(!hold) return;
    ctx.beginPath();
    ctx.arc(x-r, y-r, r, 0, 2*Math.PI, false);
    ctx.fill();
}

window.addEventListener("resize", ()=>{ onResize(); });

function onResize(){
    canvas.width = wrapper.offsetWidth;
    canvas.height = wrapper.offsetHeight;
}