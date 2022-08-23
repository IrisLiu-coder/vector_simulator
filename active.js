const canvas = document.getElementById('x_yplain');
const ctx = canvas.getContext('2d');
var light=0;
var mode=["source/switch_on.png","source/switch_off.png"]
var myImage = document.getElementById("light");
var color=[
{
    background:"#ffffff",
    x_yplain:"#bbcdff"
},{
    background:"#5b5b5b",
    x_yplain:"#8f8f8f"
}];
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
function background(){
    var x_axis=[[320,0],[320,360]],y_axis=[[0,180],[640,180]];
    ctx.fillStyle = color[light].background;
    ctx.fillRect(0, 0, 640, 360);
    ctx.closePath(); 

    ctx.strokeStyle = color[light].x_yplain;
    ctx.lineWidth="1";
    ctx.beginPath();   
    ctx.moveTo(x_axis[0][0],x_axis[0][1]);  
    ctx.lineTo(x_axis[1][0],x_axis[1][1]);
    ctx.moveTo(y_axis[0][0],y_axis[0][1]);  
    ctx.lineTo(y_axis[1][0],y_axis[1][1]);
    ctx.closePath(); 
    ctx.stroke();
}
function draw(){
    background();
}
setInterval('draw()',10);


