/* ── CONTACT CANVAS ── */
const cc=document.getElementById('cCanvas'),cx=cc.getContext('2d');
let cpts=[];
function resizeC(){cc.width=cc.offsetWidth;cc.height=cc.offsetHeight}
function makeC(){
  cpts=[];
  for(let i=0;i<35;i++)cpts.push({x:Math.random()*cc.width,y:Math.random()*cc.height,vx:(Math.random()-.5)*.15,vy:(Math.random()-.5)*.15});
}
function drawC(){
  if(!cx)return;
  cx.clearRect(0,0,cc.width,cc.height);
  cpts.forEach(p=>{
    p.x+=p.vx;p.y+=p.vy;
    if(p.x<0||p.x>cc.width)p.vx*=-1;
    if(p.y<0||p.y>cc.height)p.vy*=-1;
    cx.beginPath();cx.arc(p.x,p.y,.7,0,Math.PI*2);
    cx.fillStyle='rgba(99,211,206,.4)';cx.fill();
  });
  requestAnimationFrame(drawC);
}
resizeC();makeC();drawC();
