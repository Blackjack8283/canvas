const wrapper = document.getElementById("wrapper");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

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

const r = 10;
ctx.fillStyle = "black";
ctx.strokeStyle = "black";
onResize();

//四角形+半円二つ作って
const a = new Vector2(300,500);
const b = new Vector2(200,200);
const ab = b.clone().sub(a);
const n = ab.clone().normal().multiplyScalar(r);
//長方形
ctx.beginPath();
const s = a.clone().add(n);
const t = s.clone().add(ab);
const v = a.clone().sub(n);
const u = v.clone().add(ab); 
ctx.moveTo(s.x, s.y);
ctx.lineTo(t.x, t.y);
ctx.lineTo(u.x, u.y);
ctx.lineTo(v.x, v.y);
ctx.lineTo(s.x, s.y);
ctx.fill();
//円二つ
ctx.beginPath();
ctx.arc(a.x, a.y, r, 0, 2*Math.PI, false);
ctx.fill();
ctx.beginPath();
ctx.arc(b.x, b.y, r, 0, 2*Math.PI, false);
ctx.fill();




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