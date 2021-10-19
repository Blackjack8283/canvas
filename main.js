const wrapper = document.getElementById("wrapper");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

//書いている時のマウスの位置情報を記録
let p_vec = [];

let hold = false;
canvas.addEventListener("pointerdown", (e)=>{
    const x = e.clientX - canvas.offsetLeft;
    const y = e.clientY - canvas.offsetTop;
    hold = true;
    //マウスの位置ベクトルを入れる空配列を
    //より未来の履歴が入っている配列を消してから先頭に追加
    p_vec.splice(0,cur, []);
    cur = 0;
    //空配列ににクリックの位置ベクトルを前から追加
    p_vec[0].unshift( new Vector2(x,y) );
    dot(p_vec[0][0]);
});

canvas.addEventListener("pointermove", (e)=>{
    if(!hold) return;
    const x = e.clientX - canvas.offsetLeft;
    const y = e.clientY - canvas.offsetTop;
    //マウスの位置ベクトルを前から追加
    p_vec[0].unshift( new Vector2(x,y) );
    line(p_vec[0][1], p_vec[0][0]);
});

canvas.addEventListener("pointerup", (e)=>{
    hold = false;
});

let cur = 0;
window.addEventListener("keydown", (e)=>{
    const key = e.key;
    if(key == "r"){
        repaint();
    } else if(key == "z"){
        if(cur < p_vec.length) cur++;
        repaint();
    } else if(key == "x"){
        if(cur > 0) cur--;
        repaint();
    }
});

const r = 8;
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

function repaint(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const len = p_vec.length;
    for(let i = len-1; i >= cur; i--){
        const dots = p_vec[i].length;
        if(dots == 1) dot(p_vec[i][dots-1]);
        else {
            for(let j = dots-1; j >= 1; j--){
                line(p_vec[i][j-1], p_vec[i][j]);
            }
        }
    }
}


window.addEventListener("resize", ()=>{ onResize(); });

function onResize(){
    canvas.width = wrapper.offsetWidth;
    canvas.height = wrapper.offsetHeight;
    repaint();
}