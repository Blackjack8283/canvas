const wrapper = document.getElementById("wrapper");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

//書いている時のマウスの位置情報(２次)
let p_vec = [];
//線の色・太さの情報
let setting = [];
//マウスが押し込まれているかどうか
let hold = false;

//クリック時
canvas.addEventListener("pointerdown", (e)=>{
    const x = e.clientX - canvas.offsetLeft;
    const y = e.clientY - canvas.offsetTop;
    hold = true;
    //マウスの位置ベクトルを入れる空配列を
    //より未来の履歴が入っている配列を消してから先頭に追加
    p_vec.splice(0,cur, []);
    //色情報追加
    setting.splice(0,cur, {c:pencil_color, r: curr});
    cur = 0;
    //空配列ににクリックの位置ベクトルを前から追加
    p_vec[0].unshift( new Vector2(x,y) );
    color(pencil_color);
    line(p_vec[0][0], p_vec[0][0], curr);
});

//ポインターが動いた時
canvas.addEventListener("pointermove", (e)=>{
    if(!hold) return;
    const x = e.clientX - canvas.offsetLeft;
    const y = e.clientY - canvas.offsetTop;
    //マウスの位置ベクトルを前から追加
    p_vec[0].unshift( new Vector2(x,y) );
    line(p_vec[0][1], p_vec[0][0], curr);
});

//マウスを離した時
canvas.addEventListener("pointerup", (e)=>{
    hold = false;
});

//現在見ているindex
let cur = 0;
//現在の色
let pencil_color = 1;

//キー操作
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
        case "d":
            pencil_color = "d";
            //太くする
            curr = 12;
            break;
        case "a":
            if(curr > 1) curr--;
            break;
        case "s":
            curr++;
            break;
    }
    //0~9の数字
    if(e.key.match("[0-9]")){
        //前の作業が削除だった場合元の太さに戻す
        if(pencil_color == "d") curr = 8;
        pencil_color = Number(e.key);
    }
});

//初期化

//現在のペンの太さ
let curr = 8;
//初期設定でペンを黒に
color(1);
//canvasの大きさ定める
onResize();

//線
function line(a, b, r){ //a,b -> vector2
    const ab = b.clone().sub(a); //vAB 
    const n = ab.clone().normal().multiplyScalar(r); //vABの法線ベクトル(の一つ)
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
    //円１
    ctx.beginPath();
    ctx.arc(a.x, a.y, r, 0, 2*Math.PI, false);
    ctx.fill();
    //円２
    ctx.beginPath();
    ctx.arc(b.x, b.y, r, 0, 2*Math.PI, false);
    ctx.fill();
}

//再描画(履歴行き来用)
function repaint(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const len = p_vec.length;
    for(let i = len-1; i >= cur; i--){
        const {c, r} = setting[i];
        const dots = p_vec[i].length;
        color(c);
        if(dots == 1) line(p_vec[i][dots-1],p_vec[i][dots-1], r);
        else {
            for(let j = dots-1; j >= 1; j--){
                line(p_vec[i][j-1], p_vec[i][j], r);
            }
        }
    }
}

//色変更
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
        case "d":
            col = "white";
            break;
    }
    ctx.fillStyle = col;
    ctx.strokeStyle = col;
}

//リサイズ時処理
function onResize(){
    canvas.width = wrapper.offsetWidth;
    canvas.height = wrapper.offsetHeight;
    repaint();
}

window.addEventListener("resize", ()=>{ onResize(); });