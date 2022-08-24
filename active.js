const canvas = document.getElementById('x_yplain');
const ctx = canvas.getContext('2d');
var light=0;
var mode=["source/switch_on.png","source/switch_off.png"]
var myImage = document.getElementById("light");
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
var vectors=[{x:0,y:0},{x:10,y:0},{x:0,y:10}];
myImage.onclick = function() {
    let mySrc = myImage.getAttribute('src');
    var body= document.querySelector('body');
    if(mySrc === mode[0]) {
        myImage.setAttribute ('src',mode[1]);
        body.className="light_off";
        light=1;
    } else {
        myImage.setAttribute ('src',mode[0]);
        body.className="light_on";
        light=0;
    }
}
function x(x){
    return x+320;
}
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
    
    var angle=Math.round(Math.atan((y1-y2)/(x1-x2)) * 180 / Math.PI);
    if((x1-x2)==0&&y1<=y2){
        angle=90;
    }else if((x1-x2)==0&&y1>=y2){
        angle=270;
    }
    ctx.beginPath();
    ctx.save();
    var radians=(240-angle)*Math.PI/180;
    ctx.translate(x(x2), y(y2));
    ctx.rotate(radians);
    ctx.beginPath();
    ctx.moveTo (5 * Math.cos(0), 5 * Math.sin(0));          
    for (var i = 1; i <= 3;i += 1) {
        ctx.lineTo (5 * Math.cos(i * 2 * Math.PI / 3), 5 * Math.sin(i * 2 * Math.PI / 3));
    }
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
    for(var i=-320;i<=320;i++){
        ctx.beginPath();
        ctx.arc(x(i), y(shoot((vectors[0].x),(vectors[0].y),(vectors[1].x),(vectors[1].y),i)), 1, 0, 2 * Math.PI, false);
        ctx.fillStyle = color[light].x_yplain;
        ctx.fill();
    }
    for(var i=-320;i<=320;i++){
        if(((vectors[0].x)-(vectors[2].x))==0){
            ctx.beginPath();
            ctx.arc(x(vectors[0].x), y(i), 1, 0, 2 * Math.PI, false);
            ctx.fillStyle = color[light].x_yplain;
            ctx.fill();
        }else{
            ctx.beginPath();
            ctx.arc(x(i), y(shoot((vectors[0].x),(vectors[0].y),(vectors[2].x),(vectors[2].y),i)), 1, 0, 2 * Math.PI, false);
            ctx.fillStyle = color[light].x_yplain;
            ctx.fill();
        }
    }    
}
function draw(){
    background();
    vector(0,0,0,10);
}
setInterval('draw()',10);


