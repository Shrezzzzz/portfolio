/* ── HERO CANVAS — particle mesh ── */
const hc=document.getElementById('heroCanvas'),hx=hc.getContext('2d');
let W,H,pts=[];
function resize(){W=hc.width=window.innerWidth;H=hc.height=window.innerHeight}
function makePoints(){
  pts=[];
  const n=Math.min(Math.floor(W*H/14000),80);
  for(let i=0;i<n;i++)pts.push({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.25,vy:(Math.random()-.5)*.25});
}
let pmx=W/2,pmy=H/2;
document.addEventListener('mousemove',e=>{pmx=e.clientX;pmy=e.clientY});
let heroOpacity=0;
function drawHero(){
  hx.clearRect(0,0,W,H);
  if(heroOpacity<.38)heroOpacity+=.003;
  hc.style.opacity=heroOpacity;
  pts.forEach(p=>{
    p.x+=p.vx;p.y+=p.vy;
    if(p.x<0||p.x>W)p.vx*=-1;
    if(p.y<0||p.y>H)p.vy*=-1;
    const dx=p.x-pmx,dy=p.y-pmy,d=Math.hypot(dx,dy);
    if(d<100){p.x+=dx/d*.4;p.y+=dy/d*.4}
  });
  pts.forEach((a,i)=>{
    pts.slice(i+1).forEach(b=>{
      const d=Math.hypot(a.x-b.x,a.y-b.y);
      if(d<130){
        hx.beginPath();hx.moveTo(a.x,a.y);hx.lineTo(b.x,b.y);
        hx.strokeStyle=`rgba(99,211,206,${(1-d/130)*.12})`;
        hx.lineWidth=.5;hx.stroke();
      }
    });
    hx.beginPath();hx.arc(a.x,a.y,.8,0,Math.PI*2);
    hx.fillStyle='rgba(99,211,206,.5)';hx.fill();
  });
  requestAnimationFrame(drawHero);
}
resize();makePoints();drawHero();
window.addEventListener('resize',()=>{resize();makePoints()});
