const wrapper = document.getElementById("wrapper");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let p_vec = [];

let hold = false;
canvas.addEventListener("pointerdown", (e)=>{
    const x = e.clientX - canvas.offsetLeft;
    const y = e.clientY - canvas.offsetTop;
    hold = true;
    //p_vecにクリックの位置ベクトルを前から追加
    p_vec.unshift([]);
    p_vec[0].unshift( new Vector2(x,y) );
    dot(p_vec[0][0]);
});

canvas.addEventListener("pointermove", (e)=>{
    if(!hold) return;
    const x = e.clientX - canvas.offsetLeft;
    const y = e.clientY - canvas.offsetTop;
    //移動後のマウスの位置ベクトルを前から追加
    p_vec[0].unshift( new Vector2(x,y) );
    line(p_vec[0][1], p_vec[0][0]);
});

canvas.addEventListener("pointerup", (e)=>{
    hold = false;
    console.log(p_vec);
});

const r = 10;
ctx.fillStyle = "black";
ctx.strokeStyle = "black";
onResize();

function line(a, b){ //a,b -> vector2
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
}

function dot(v){ // v -> vector2
    ctx.beginPath();
    ctx.arc(v.x, v.y, r, 0, 2*Math.PI, false);
    ctx.fill();
}

window.addEventListener("resize", ()=>{ onResize(); });

function onResize(){
    canvas.width = wrapper.offsetWidth;
    canvas.height = wrapper.offsetHeight;
}