const canvas = document.getElementById('x_yplain');
const ctx = canvas.getContext('2d');
var light=0;
var mode=["source/switch_on.png","source/switch_off.png"]
var color=[
{
    background:"#ffffff",
    x_yplain:"#bbcdff",
    vec:"#00159d"
},{
    background:"#5b5b5b",
    x_yplain:"#3b3b3b",
    vec:"#e3e3e3"
}];
var vectors=[{x:0,y:0},{x:10,y:0},{x:0,y:10},{x:0,y:0}];
var matrixs=[[["",1],["",0],["",0],["",1]]];
var matrixA=document.getElementById("a"),matrixB=document.getElementById("b"),matrixC=document.getElementById("c"),matrixD=document.getElementById("d");
function send_matrix(){
    console.log("matrix");
    matrixs.push([[document.getElementById("a").value,document.getElementById("A").value],
    [document.getElementById("b").value,document.getElementById("B").value],
    [document.getElementById("c").value,document.getElementById("C").value],
    [document.getElementById("d").value,document.getElementById("D").value]]
    );
    document.getElementById("old_revise").insertAdjacentHTML("afterbegin",'<div class="l">[</div><span class="new_revise"><div>'+
    document.getElementById("a").value+document.getElementById("A").value+
    ' '+document.getElementById("b").value+document.getElementById("B").value+'</div><br><div>'+document.getElementById("c").value+document.getElementById("C").value+
    ' '+document.getElementById("d").value+document.getElementById("D").value+'</div></span><div class="r" >]</div>')
}
function send_vectors(){
    console.log("vector");
    vectors.push({x:document.getElementById("x").value,y:document.getElementById("y").value});
    document.getElementById("old_vec").insertAdjacentHTML("beforeend",'<span class="new_revise"><div>&nbsp'+
    document.getElementById("x").value+'&nbsp</div><br><div>&nbsp'+document.getElementById("y").value+'&nbsp</div></span>')
}

var myImage = document.getElementById("light");
myImage.onclick = function() {
    let mySrc = myImage.getAttribute('src');
    var body= document.querySelector('body');
    if(mySrc === mode[0]) {
        myImage.setAttribute ('src',mode[1]);
        body.className="light_off";
        light=1;
        document.querySelector("a").className="dmenu";
        document.getElementById("1").className="dmenu";document.getElementById("2").className="dmenu";
    } else {
        myImage.setAttribute ('src',mode[0]);
        body.className="light_on";
        document.querySelector("a").className="menu";
        document.getElementById("1").className="menu";document.getElementById("2").className="menu";
        light=0;
    }
}
function x(x){return x+320;}
function y(y){
    y=-y+180;
    return y;
}
function shoot(ox,oy,x,y,X){
    var m=(oy-y)/(ox-x);
    return m*X;
}
function vector(x1,y1,x2,y2){
    ctx.beginPath();
    ctx.moveTo(x(x1), y(y1));
    ctx.lineTo(x(x2), y(y2));
    ctx.strokeStyle = color[light].vec;
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.closePath();
    
    var angle=Math.round(Math.atan((y2-y1)/(x2-x1)) * 180 / Math.PI);
    if((x1-x2)>0){angle=angle+180;}
    else if((x1-x2)==0&&y1<=y2){angle=90;}
    else if((x1-x2)==0&&y1>=y2){angle=270; }
    ctx.beginPath();
    ctx.save();
    var radians=(240-angle)*Math.PI/180;
    ctx.translate(x(x2), y(y2));
    ctx.rotate(radians);
    ctx.beginPath();
    ctx.moveTo (5 * Math.cos(0), 5 * Math.sin(0));          
    for (var i = 1; i <= 3;i += 1) {ctx.lineTo (5 * Math.cos(i * 2 * Math.PI / 3), 5 * Math.sin(i * 2 * Math.PI / 3));}
    ctx.closePath();
    ctx.fillStyle=color[light].vec;
    ctx.fill();
    ctx.rotate(-radians);
    ctx.translate(-x(x2), -y(y2));
    ctx.restore();
}
function background(){
    ctx.fillStyle = color[light].background;
    ctx.fillRect(0, 0, 640, 360);
    
}
function xy(a,b,c,d){
   for(var i=-320;i<=320;i++){
        ctx.beginPath();
        ctx.arc(x(i), y(shoot((vectors[0].x),(vectors[0].y),(a),(b),i)), 1, 0, 2 * Math.PI, false);
        ctx.fillStyle = color[light].x_yplain;
        ctx.fill();
    }
    for(var i=-320;i<=320;i++){
        if(((vectors[0].x)-(c))==0){
            ctx.beginPath();
            ctx.arc(x(vectors[0].x), y(i), 1, 0, 2 * Math.PI, false);
            ctx.fillStyle = color[light].x_yplain;
            ctx.fill();
        }else{
            ctx.beginPath();
            ctx.arc(x(i), y(shoot((vectors[0].x),(vectors[0].y),(c),(d),i)), 1, 0, 2 * Math.PI, false);
            ctx.fillStyle = color[light].x_yplain;
            ctx.fill();
        }
    } 
}
function vec_mutiple(){
    var matrix=[0,0,0,0],new_matrix=[1,0,0,1];
    for(var j=matrixs.length-1;j>=0;j--){
        for(var k=0;k<4;k++){
            if(matrixs[j][k][0]==""){matrix[k]=Number(matrixs?.[j]?.[k]?.[1]);}else              
            if(matrixs[j][k][0]=="sin"){matrix[k]=Math.sin(Number(matrixs?.[j]?.[k]?.[1])* Math.PI/180);}else
            if(matrixs[j][k][0]=="-sin"){matrix[k]=-Math.sin(Number(matrixs?.[j]?.[k]?.[1])* Math.PI/180);}else
            if(matrixs[j][k][0]=="cos"){matrix[k]=Math.cos(Number(matrixs?.[j]?.[k]?.[1])* Math.PI/180);}else
            if(matrixs[j][k][0]=="-cos"){matrix[k]=-Math.cos(Number(matrixs?.[j]?.[k]?.[1])* Math.PI/180);}
        }
        new_matrix=[new_matrix[0]*matrix[0]+new_matrix[1]*matrix[2],
            new_matrix[0]*matrix[1]+new_matrix[1]*matrix[3],
            new_matrix[2]*matrix[0]+new_matrix[3]*matrix[2],
            new_matrix[2]*matrix[1]+new_matrix[3]*matrix[3]
        ];
    }
    return new_matrix;
}
function draw(){
    ctx.clearRect(0,0,640,360);
    background();
    var last=[0,0],final=[0,0],matrix=vec_mutiple();
    for(var i=0;i<vectors.length;i++){
        if(i>=4){
                final[0]=final[0]+Number(vectors[i].x);
                final[1]=final[1]+Number(vectors[i].y);
                vector(matrix[0]*last[0]+matrix[1]*last[1],matrix[2]*last[0]+matrix[3]*last[1],matrix[0]*final[0]+matrix[1]*final[1],matrix[2]*final[0]+matrix[3]*final[1]);
            }
        last=[final[0],final[1]];   
    }
    xy(matrix[0]*vectors[1].x+matrix[1]*vectors[1].y,
        matrix[2]*vectors[1].x+matrix[3]*vectors[1].y,
        matrix[0]*vectors[2].x+matrix[1]*vectors[2].y,
        matrix[2]*vectors[2].x+matrix[3]*vectors[2].y
        );
}
setInterval('draw()',10);