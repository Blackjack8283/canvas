const wrapper = document.getElementById("wrapper");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

//書いている時のマウスの位置情報を記録
//色の情報を対応させる！！
let p_vec = [];
let colors = [];

let hold = false;
canvas.addEventListener("pointerdown", (e)=>{
    const x = e.clientX - canvas.offsetLeft;
    const y = e.clientY - canvas.offsetTop;
    hold = true;
    //マウスの位置ベクトルを入れる空配列を
    //より未来の履歴が入っている配列を消してから先頭に追加
    p_vec.splice(0,cur, []);
    //色情報追加
    colors.splice(0,cur, pencil_color);
    cur = 0;
    //空配列ににクリックの位置ベクトルを前から追加
    p_vec[0].unshift( new Vector2(x,y) );
    color(pencil_color);
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
let pencil_color = 1;
window.addEventListener("keydown", (e)=>{
    switch(e.key){
        case "r":
            repaint();
            break;
        case "z":
            if(cur < p_vec.length) cur++;
            repaint();
            break;
        case "x":
            if(cur > 0) cur--;
            repaint();
            break;
    }
    if(e.key.match("[0-9]")) pencil_color = Number(e.key);
});

const r = 8;
color(1);
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
        color(colors[i]);
        const dots = p_vec[i].length;
        if(dots == 1) dot(p_vec[i][dots-1]);
        else {
            for(let j = dots-1; j >= 1; j--){
                line(p_vec[i][j-1], p_vec[i][j]);
            }
        }
    }
}

function color(num){
    let col;
    switch(num){
        case 1:
            col = "black";
            break;
        case 2:
            col = "red";
            break;
        case 3:
            col = "blue";
            break;
        case 4:
            col = "green";
            break;
        case 5:
            col = "orange";
            break;
        case 6:
            col = "purple";
            break;
        case 7:
            col = "aqua";
            break;
        case 8:
            col = "gray";
            break;
        case 9:
            col = "maroon";
            break;
        case 0:
            col = "teal";
            break;
    }
    ctx.fillStyle = col;
    ctx.strokeStyle = col;
}

window.addEventListener("resize", ()=>{ onResize(); });

function onResize(){
    canvas.width = wrapper.offsetWidth;
    canvas.height = wrapper.offsetHeight;
    repaint();
}