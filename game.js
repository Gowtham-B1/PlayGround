// THE LAST LAMP — self-contained first-person temple mystery.
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';
const $=id=>document.getElementById(id);
const scene=new THREE.Scene();scene.background=new THREE.Color(0x101715);scene.fog=new THREE.FogExp2(0x101715,.027);
const camera=new THREE.PerspectiveCamera(73,innerWidth/innerHeight,.08,90);camera.position.set(0,1.65,15.1);
const renderer=new THREE.WebGLRenderer({antialias:true,powerPreference:'high-performance'});renderer.setSize(innerWidth,innerHeight);renderer.setPixelRatio(Math.min(devicePixelRatio,1.7));renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.08;document.body.prepend(renderer.domElement);
scene.add(new THREE.HemisphereLight(0x9ca99c,0x241d16,1.05));const moon=new THREE.DirectionalLight(0xb7cbbd,1.15);moon.position.set(-5,14,8);moon.castShadow=true;moon.shadow.mapSize.set(1024,1024);moon.shadow.camera.left=-22;moon.shadow.camera.right=22;moon.shadow.camera.top=24;moon.shadow.camera.bottom=-24;scene.add(moon);
const lantern=new THREE.PointLight(0xffa844,1.7,8,2);lantern.position.set(.22,-.25,-.25);camera.add(lantern);scene.add(camera);
const gold=new THREE.MeshStandardMaterial({color:0x9a7137,metalness:.7,roughness:.34}),stone=new THREE.MeshStandardMaterial({color:0x5c5547,roughness:.92}),dark=new THREE.MeshStandardMaterial({color:0x34362f,roughness:.94}),red=new THREE.MeshStandardMaterial({color:0x8c4334,roughness:.8}),floorMat=new THREE.MeshStandardMaterial({color:0x363a34,roughness:.83});
const colliders=[],interactables=[],animatables=[];
function box(name,x,y,z,sx,sy,sz,mat,collision=true){const m=new THREE.Mesh(new THREE.BoxGeometry(sx,sy,sz),mat);m.name=name;m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;scene.add(m);if(collision)colliders.push({x,z,hx:sx/2,hz:sz/2,bottom:y-sy/2});return m;}
function cyl(x,y,z,rt,rb,h,mat,n=12){const m=new THREE.Mesh(new THREE.CylinderGeometry(rt,rb,h,n),mat);m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;scene.add(m);return m;}
function light(x,y,z,color,intensity,range){const l=new THREE.PointLight(color,intensity,range,2);l.position.set(x,y,z);scene.add(l);return l;}
// Tamil Nadu hill-temple interior: worn granite, vermilion paint, brass and oil light.
box('flagstones',0,-.18,0,30,.36,36,floorMat,false);box('north wall',0,2.4,-18,30,4.8,.7,stone);box('south wall',0,2.4,18,30,4.8,.7,stone);box('west wall',-15,2.4,0,.7,4.8,36,stone);box('east wall',15,2.4,0,.7,4.8,36,stone);box('ceiling',0,5,0,30,.35,36,new THREE.MeshStandardMaterial({color:0x282e29,roughness:1}),false);
// Gallery dividers include an opening north and south of the central hall.
for(const x of [-7.55,7.55])for(const [a,b] of [[-18,-9],[-3,7],[12,18]])box('gallery wall',x,2.25,(a+b)/2,.55,4.5,b-a,stone);
// Side-room walls have door gaps centered on the entry path.
for(const [x,z]of[[-13.75,-7],[-8.7,-7],[8.7,7],[13.75,7]])box('side chamber wall',x,2.1,z,2.5,4.2,.45,dark);
for(const [x,z]of[[-11.2,-7],[11.2,7]])box('chamber lintel',x,4.1,z,2.55,.4,.5,gold,false);
for(const x of [-5.4,5.4])for(const z of [-14,-8,-2,4,10,15]){cyl(x,.48,z,.7,.76,.55,dark,8);cyl(x,2,z,.42,.52,2.65,stone,8);cyl(x,3.48,z,.72,.56,.45,gold,8);cyl(x,3.78,z,.62,.62,.18,red,8);cyl(x,2.75,z,.44,.44,.11,gold,8);}
for(const z of [-15,-10,-4,2,8,14])for(const x of [-14.45,14.45]){box('pilaster',x,2.1,z,.35,4.15,.42,dark,false);box('pilaster cap',x,4.25,z,.58,.24,.62,gold,false);}
box('vermilion frieze',0,4.12,-17.57,28,.15,.08,red,false);
// Rows of brass lamps create pools of amber light.
for(const z of [-13,-5,3,11])for(const x of [-10.2,10.2]){cyl(x,3.05,z,.34,.18,.13,gold,10);cyl(x,3.2,z,.07,.07,.22,gold,8);const flame=new THREE.Mesh(new THREE.SphereGeometry(.11,8,8),new THREE.MeshBasicMaterial({color:0xffad43}));flame.position.set(x,3.35,z);scene.add(flame);const l=light(x,3.25,z,0xff9638,.8,5);animatables.push({type:'light',obj:l,base:.8,seed:Math.random()*7});}
for(let z=-16;z<=16;z+=2){const m=new THREE.Mesh(new THREE.BoxGeometry(2.5,.025,1.8),new THREE.MeshStandardMaterial({color:z%4===0?0x4a4031:0x3c4039,roughness:.7}));m.position.set(0,.015,z);m.receiveShadow=true;scene.add(m);}
cyl(0,.04,-1,2.05,2.05,.06,gold,32);cyl(0,.08,-1,1.75,1.75,.04,stone,32);for(let i=0;i<16;i++){const a=i*Math.PI/8,m=box('sunburst',Math.sin(a)*1.24,.11,-1+Math.cos(a)*1.24,.18,.035,.8,gold,false);m.rotation.y=-a;}
box('threshold',0,.02,17.6,5,.16,.7,gold,false);for(let i=0;i<5;i++){const w=4.5-i*.6;box('gopuram relief',0,5.1+i*.45,-17.35,w,.45,.45,i%2?red:gold,false);for(let j=0;j<5-i;j++)cyl((j-(4-i)/2)*.7,5.28+i*.45,-17.04,.12,.17,.22,i%2?gold:red,8);}
// Door frames and simple wall niches.
for(const [x,z]of[[-7.55,-6],[7.55,9]]){for(const dz of[-2.7,2.7])box('door jamb',x,1.5,z+dz,.55,3,.55,stone,false);box('door lintel',x,3.15,z,.65,.45,6,gold,false);}
for(const [x,z]of[[-13.8,-13.7],[-13.8,4],[13.8,-13.4],[13.8,-3]]){box('wall niche',x,2.25,z,.08,1.4,1.3,dark,false);cyl(x+(x<0?.08:-.08),2.15,z,.22,.3,.22,gold,10);}
function altar(x,z){box('altar base',x,.38,z,3.8,.7,2.2,dark);box('altar rim',x,.78,z,4,.12,2.35,gold,false);box('sanctum slab',x,1.15,z,2.7,.65,1.35,stone);box('altar crown',x,1.55,z,3.1,.16,1.6,gold,false);box('offering cloth',x,1.65,z,.95,.08,.92,red,false);for(const dx of[-1.35,1.35]){cyl(x+dx,1.13,z,.16,.19,.7,gold,10);cyl(x+dx,1.5,z,.22,.22,.08,gold,10);}cyl(x,1.88,z,.2,.29,.45,gold,10);const f=new THREE.Mesh(new THREE.SphereGeometry(.14,10,8),new THREE.MeshBasicMaterial({color:0xffae4d}));f.position.set(x,2.25,z);scene.add(f);light(x,2.4,z,0xffa43d,1.25,8);}
altar(0,-14.2);
// Bell shrine in the south hall.
box('bell plinth',0,.19,12.6,2.4,.36,2.1,dark);const bell=cyl(0,3,12.5,.55,.3,1.05,gold,12);cyl(0,3.65,12.5,.12,.12,.5,gold,8);const rope=cyl(.5,2.65,12.2,.035,.035,1.7,red,6);rope.rotation.z=-.22;
// Archive table and palm-leaf bundle, north-west side chamber.
box('archive table',-11,.77,-12.1,3.1,.18,1.8,gold);for(const dx of[-1.25,1.25])for(const dz of[-.65,.65])box('table leg',-11+dx,.38,-12.1+dz,.13,.8,.13,dark);for(let i=0;i<5;i++)box('palm leaf',-11,.89+i*.025,-12.1,.8,.025,1.05,i%2?red:gold,false);
// Lamp-keeper's room: cot, mat and copper ornaments.
box('low cot',11,.42,11.3,3.3,.28,1.6,dark,false);box('cot mat',11,.62,11.3,3.05,.15,1.4,red,false);for(const [x,z]of[[9.5,10],[12.5,12],[12,9.5]]){cyl(x,.55,z,.38,.48,.9,stone,10);cyl(x,1.04,z,.18,.35,.14,gold,10);}for(let i=0;i<3;i++){const m=new THREE.Mesh(new THREE.TorusGeometry(.23+i*.06,.035,8,24),gold);m.rotation.x=Math.PI/2;m.position.set(11,.8+i*.06,11.3);scene.add(m);}
// Three evidence traces are the heart of the mystery.
function marker(x,y,z){const m=new THREE.Mesh(new THREE.OctahedronGeometry(.12),new THREE.MeshBasicMaterial({color:0xe7b75d,transparent:true,opacity:.8}));m.position.set(x,y,z);scene.add(m);const l=light(x,y,z,0xe7b75d,1.1,3.4);animatables.push({type:'marker',obj:m,baseY:y,seed:Math.random()*7},{type:'light',obj:l,base:1.1,seed:Math.random()*7});return m;}
function evidence(id,title,description,pos,mesh,mark){interactables.push({type:'evidence',id,title,description,position:new THREE.Vector3(...pos),mesh,marker:marker(...mark),found:false});}
const deed=box('copper deed',-11,1.22,-12.1,.68,.14,.82,red,false);deed.rotation.y=-.12;
evidence('deed','The copper deed','A palm-leaf copy names Valli as keeper of the spring-boundary deed. Beside it: “The headman diverted the water. When the rain comes, warn the lower hamlet. I will ring the bell.”',[-11,1.3,-12.1],deed,[-11,1.85,-12.1]);
const anklet=new THREE.Mesh(new THREE.TorusGeometry(.28,.055,10,28),gold);anklet.rotation.x=Math.PI/2;anklet.position.set(11,.83,11.3);scene.add(anklet);
evidence('anklet','Valli’s anklet','A copper anklet, bent as if torn away. On its inner edge, a child’s scratch: “Akka said—first the rain, then the seed she hid.” The lamp keeper was helping the families below the hill.',[11,.83,11.3],anklet,[11,1.45,11.3]);
const clapper=box('bell clapper',0,2.45,12.5,.12,.4,.12,red,false);
evidence('witness','A child’s testimony','A charcoal note folded into the bell rope: “She rang until the water turned. When the sun came, she would show everyone the deed. They barred the doors and left her inside.” The bell was the warning; the sun was the promise.',[.5,2.4,12.2],clapper,[.5,3.2,12.2]);
interactables.push({type:'altar',position:new THREE.Vector3(0,1.1,-12.1)},{type:'bell',position:new THREE.Vector3(.5,1.1,12.2)});
// Valli: a veiled, blood-marked silhouette made from layered cloth and shadow.
const ghost=new THREE.Group();ghost.position.set(0,.1,-16.2);ghost.visible=false;scene.add(ghost);
const sari=new THREE.MeshStandardMaterial({color:0x382a32,roughness:.72,transparent:true,opacity:.91,side:THREE.DoubleSide});
const shawl=new THREE.MeshStandardMaterial({color:0x762f32,roughness:.66,transparent:true,opacity:.94,side:THREE.DoubleSide});
const hairMat=new THREE.MeshStandardMaterial({color:0x111312,roughness:.88});
const skin=new THREE.MeshStandardMaterial({color:0xbba18b,roughness:.72,emissive:0x291716,emissiveIntensity:.28});
const skirt=new THREE.Mesh(new THREE.ConeGeometry(.68,1.52,10,1,true),sari);skirt.position.y=.9;ghost.add(skirt);
const torso=new THREE.Mesh(new THREE.CapsuleGeometry(.29,.62,5,9),sari);torso.position.y=1.7;ghost.add(torso);
const veil=new THREE.Mesh(new THREE.PlaneGeometry(1.05,1.82),shawl);veil.position.set(.13,1.72,.24);veil.rotation.z=-.42;ghost.add(veil);
const face=new THREE.Mesh(new THREE.SphereGeometry(.28,14,12),skin);face.position.set(0,2.38,.05);ghost.add(face);
const hair=new THREE.Mesh(new THREE.SphereGeometry(.32,12,10),hairMat);hair.scale.set(1,1.2,.92);hair.position.set(0,2.51,-.015);ghost.add(hair);
for(let i=0;i<5;i++){const lock=new THREE.Mesh(new THREE.CylinderGeometry(.025,.055,.95+i*.12,6),hairMat);lock.position.set((i-2)*.11,1.92,-.02);lock.rotation.z=(i-2)*.09;ghost.add(lock);}
for(const x of[-.105,.105]){const eye=new THREE.Mesh(new THREE.SphereGeometry(.035,8,7),new THREE.MeshBasicMaterial({color:0xffd4ac}));eye.position.set(x,2.4,.292);ghost.add(eye);}
const blood=new THREE.MeshBasicMaterial({color:0x7d1719,transparent:true,opacity:.94,side:THREE.DoubleSide});
for(const [x,y,len,rot]of[[-.17,2.31,.45,-.08],[-.04,2.28,.6,.04],[.14,2.32,.36,.15],[.21,2.23,.3,.04]]){const streak=new THREE.Mesh(new THREE.PlaneGeometry(.035,len),blood);streak.position.set(x,y,.294);streak.rotation.z=rot;ghost.add(streak);}
for(const side of[-1,1]){const arm=new THREE.Mesh(new THREE.CapsuleGeometry(.1,.66,4,7),sari);arm.position.set(side*.41,1.65,.03);arm.rotation.z=side*-.24;ghost.add(arm);}
const aura=new THREE.PointLight(0xb94438,1.05,5);aura.position.set(0,1.7,.1);ghost.add(aura);
const ghostHome=new THREE.Vector3(0,.1,-16.2);let ghostActive=false,ghostStun=0;

// State, journal and investigation logic.
const found=new Set(),entries=[],keys={},player={x:0,z:15.1,yaw:0,pitch:0},moveInput={x:0,z:0};
let started=false,won=false,puzzleOpen=false,sequence=[],toastTimer=0,pointerLocked=false,lastTime=performance.now();
function tell(text,duration=3200){const el=$('toast');el.textContent=text;el.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),duration);}
function updateObjective(){const n=found.size;$('clueCount').textContent=`${n} / 3`;$('progress').style.width=`${n/3*100}%`;$('objectiveText').textContent=n<3?['Find the three traces Valli left','Search the old archive','Look in the lamp-keeper’s room','Listen at the temple bell'][n]:'Order the signs at the sanctum';}
function renderJournal(){const list=$('journalList');list.innerHTML='';const lockedCopy=['A record of the stolen spring and the warning Valli tried to deliver.','A child’s memory gives the first two signs: rain, then the seed.','The bell warned the village; the sun came after the storm.'];for(let i=0;i<3;i++){const e=document.createElement('div');e.className='entry'+(i>=entries.length?' locked':'');e.innerHTML=`<small>${i<entries.length?entries[i].title:'Trace not yet found'}</small><p>${i<entries.length?entries[i].description:lockedCopy[i]}</p>`;list.appendChild(e);}}
function showJournal(){if(!started||won||puzzleOpen)return;renderJournal();$('journal').classList.remove('hidden');if(document.pointerLockElement)document.exitPointerLock();}
function hideJournal(){$('journal').classList.add('hidden');if(started&&!won&&matchMedia('(pointer:fine)').matches)renderer.domElement.requestPointerLock?.();}
function nearestTarget(){let best=null,dist=2.65;for(const it of interactables){if(it.found)continue;const dx=it.position.x-camera.position.x,dz=it.position.z-camera.position.z,d=Math.hypot(dx,dz);if(d>=dist)continue;const facing=(-Math.sin(player.yaw))*dx+(-Math.cos(player.yaw))*dz;if(facing<-.35)continue;best=it;dist=d;}return best;}
function promptFor(it){if(!it)return '';if(it.type==='evidence')return `E · Record ${it.title}`;if(it.type==='altar')return found.size===3?'E · Set the signs at the altar':'The sanctum needs all three traces';if(it.type==='bell')return 'E · Ring the temple bell';return '';}
function interact(){if(!started||won||puzzleOpen||!$('journal').classList.contains('hidden'))return;const target=nearestTarget();if(!target){tell('The stones offer no answer from here.',1700);return;}if(target.type==='evidence'){
 target.found=true;found.add(target.id);entries.push(target);target.marker.visible=false;tell(`Evidence recorded · ${target.title}`,2700);updateObjective();renderJournal();
 if(found.size===1){ghost.visible=true;ghostActive=true;tell('A bell rings somewhere in the dark. Something has noticed you.',3800);}
 if(found.size===3){tell('The three signs are clear. Find the altar in the north sanctum.',4000);playChime();}
 }else if(target.type==='altar'){if(found.size<3){tell('The sanctum is sealed. Three traces are missing.',2300);return;}puzzleOpen=true;sequence=[];$('sequence').textContent='Choose three signs';$('puzzleMessage').textContent='';$('puzzle').classList.remove('hidden');if(document.pointerLockElement)document.exitPointerLock();}
 else if(target.type==='bell'){playChime();bell.rotation.z=.12;setTimeout(()=>bell.rotation.z=0,420);tell('The bell answers. The echo rolls down the hill.',2200);}}

let audio=null;function startAudio(){if(audio)return;try{const C=window.AudioContext||window.webkitAudioContext;audio=new C();const master=audio.createGain();master.gain.value=.035;master.connect(audio.destination);for(const [freq,vol]of[[55,.48],[82.4,.22]]){const o=audio.createOscillator(),g=audio.createGain();o.type='sine';o.frequency.value=freq;g.gain.value=vol;o.connect(g).connect(master);o.start();}}catch(e){}}
function playChime(){if(!audio)return;const o=audio.createOscillator(),g=audio.createGain();o.type='sine';o.frequency.setValueAtTime(460,audio.currentTime);o.frequency.exponentialRampToValueAtTime(170,audio.currentTime+1.4);g.gain.setValueAtTime(.14,audio.currentTime);g.gain.exponentialRampToValueAtTime(.001,audio.currentTime+1.5);o.connect(g).connect(audio.destination);o.start();o.stop(audio.currentTime+1.55);}
function offerSigns(){if(sequence.length!==3){$('puzzleMessage').textContent='Offer exactly three signs.';return;}if(sequence.join(',')!=='rain,seed,sun'){$('puzzleMessage').textContent='The lamp gutters. The story is still out of order.';sequence=[];$('sequence').textContent='Choose three signs';return;}puzzleOpen=false;won=true;$('puzzle').classList.add('hidden');$('ending').classList.remove('hidden');ghostActive=false;ghost.visible=false;playChime();}
document.querySelectorAll('.sym').forEach(button=>button.addEventListener('click',()=>{if(sequence.length>=3)return;sequence.push(button.dataset.sym);const labels={rain:'☔ Rain',seed:'❋ Seed',sun:'☼ Sun'};$('sequence').innerHTML=sequence.map(s=>`<span>${labels[s]}</span>`).join(' → ');}));
$('offerBtn').addEventListener('click',offerSigns);$('resetPuzzle').addEventListener('click',()=>{sequence=[];$('sequence').textContent='Choose three signs';$('puzzleMessage').textContent='';});

// Desktop keyboard/mouse plus mobile joystick, look surface and action buttons.
function setView(){camera.rotation.order='YXZ';camera.rotation.y=player.yaw;camera.rotation.x=player.pitch;}
function startGame(){if(started)return;started=true;startAudio();$('intro').classList.add('hidden');if(matchMedia('(pointer:fine)').matches)renderer.domElement.requestPointerLock?.();tell('Find the archive, the lamp-keeper’s room, and the bell.',3800);}
$('startBtn').addEventListener('click',startGame);$('returnBtn').addEventListener('click',()=>location.reload());
renderer.domElement.addEventListener('click',()=>{if(started&&!won&&$('journal').classList.contains('hidden')&&$('puzzle').classList.contains('hidden')&&matchMedia('(pointer:fine)').matches&&!document.pointerLockElement)renderer.domElement.requestPointerLock?.();});
document.addEventListener('pointerlockchange',()=>{pointerLocked=document.pointerLockElement===renderer.domElement;});
document.addEventListener('mousemove',e=>{if(!pointerLocked)return;player.yaw-=e.movementX*.0022;player.pitch=Math.max(-1.25,Math.min(1.25,player.pitch-e.movementY*.0019));setView();});
document.addEventListener('keydown',e=>{keys[e.code]=true;if(['Space','ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.code))e.preventDefault();if(e.code==='KeyE'&&!e.repeat)interact();if(e.code==='KeyJ'&&!e.repeat){if($('journal').classList.contains('hidden'))showJournal();else hideJournal();}if(e.code==='Escape'&&puzzleOpen){puzzleOpen=false;$('puzzle').classList.add('hidden');}});
document.addEventListener('keyup',e=>{keys[e.code]=false;});$('closeJournal').addEventListener('click',hideJournal);$('journalBtn').addEventListener('click',()=>{$('journal').classList.contains('hidden')?showJournal():hideJournal();});$('interactBtn').addEventListener('click',interact);
const stick=$('stick'),knob=$('knob');let stickPointer=null;stick.addEventListener('pointerdown',e=>{stickPointer=e.pointerId;stick.setPointerCapture(e.pointerId);updateStick(e);e.preventDefault();});function updateStick(e){const r=stick.getBoundingClientRect(),dx=e.clientX-(r.left+r.width/2),dy=e.clientY-(r.top+r.height/2),max=39,len=Math.min(max,Math.hypot(dx,dy)),a=Math.atan2(dy,dx),x=Math.cos(a)*len,y=Math.sin(a)*len;knob.style.transform=`translate(${x}px,${y}px)`;moveInput.x=x/max;moveInput.z=y/max;}
stick.addEventListener('pointermove',e=>{if(e.pointerId===stickPointer)updateStick(e);});function releaseStick(e){if(e.pointerId===stickPointer){stickPointer=null;moveInput.x=moveInput.z=0;knob.style.transform='';}}stick.addEventListener('pointerup',releaseStick);stick.addEventListener('pointercancel',releaseStick);
let lookPointer=null,lastTouch={x:0,y:0};const look=$('look');look.addEventListener('pointerdown',e=>{if(!started)return;lookPointer=e.pointerId;lastTouch={x:e.clientX,y:e.clientY};look.setPointerCapture(e.pointerId);e.preventDefault();});look.addEventListener('pointermove',e=>{if(e.pointerId!==lookPointer)return;const dx=e.clientX-lastTouch.x,dy=e.clientY-lastTouch.y;lastTouch={x:e.clientX,y:e.clientY};player.yaw-=dx*.006;player.pitch=Math.max(-1.2,Math.min(1.2,player.pitch-dy*.005));setView();});look.addEventListener('pointerup',e=>{if(e.pointerId===lookPointer)lookPointer=null;});
$('runBtn').addEventListener('pointerdown',e=>{keys.ShiftLeft=true;e.currentTarget.setPointerCapture(e.pointerId);});$('runBtn').addEventListener('pointerup',()=>keys.ShiftLeft=false);$('runBtn').addEventListener('pointercancel',()=>keys.ShiftLeft=false);
function blocked(x,z){const r=.32;for(const c of colliders){if(c.bottom>1.8)continue;const qx=Math.max(c.x-c.hx,Math.min(x,c.x+c.hx)),qz=Math.max(c.z-c.hz,Math.min(z,c.z+c.hz));if((x-qx)**2+(z-qz)**2<r*r)return true;}return false;}
function animate(now){requestAnimationFrame(animate);const dt=Math.min(.04,(now-lastTime)/1000),t=now*.001;lastTime=now;
 if(started&&!won&&$('journal').classList.contains('hidden')&&!puzzleOpen){let ix=moveInput.x,iz=moveInput.z;if(keys.KeyA||keys.ArrowLeft)ix-=1;if(keys.KeyD||keys.ArrowRight)ix+=1;if(keys.KeyW||keys.ArrowUp)iz-=1;if(keys.KeyS||keys.ArrowDown)iz+=1;const len=Math.hypot(ix,iz);if(len>1){ix/=len;iz/=len;}const speed=keys.ShiftLeft||keys.ShiftRight?4.65:2.55,fx=-Math.sin(player.yaw),fz=-Math.cos(player.yaw),rx=Math.cos(player.yaw),rz=-Math.sin(player.yaw),vx=(fx*(-iz)+rx*ix)*speed*dt,vz=(fz*(-iz)+rz*ix)*speed*dt;if(!blocked(player.x+vx,player.z))player.x+=vx;if(!blocked(player.x,player.z+vz))player.z+=vz;camera.position.set(player.x,1.65+Math.sin(t*8)*.008*(Math.abs(ix)+Math.abs(iz)),player.z);setView();const target=nearestTarget(),hint=$('hint');if(target){hint.textContent=promptFor(target);hint.classList.add('show');}else hint.classList.remove('show');
  if(ghostActive){const dx=player.x-ghost.position.x,dz=player.z-ghost.position.z,d=Math.hypot(dx,dz);ghost.rotation.y=Math.atan2(dx,dz);if(d>1.55){ghost.position.x+=dx/d*.68*dt;ghost.position.z+=dz/d*.68*dt;ghost.position.y=.12+Math.sin(t*1.7)*.09;}else if(ghostStun<=0){ghostStun=1.6;player.x=0;player.z=15.1;camera.position.set(0,1.65,15.1);ghost.position.copy(ghostHome);tell('The temple rejects you. You wake at the threshold, still carrying the evidence.',3600);document.body.animate([{filter:'brightness(.2)'},{filter:'brightness(1)'}],500);} $('threat').classList.toggle('active',d<8);aura.intensity=.8+Math.sin(t*6)*.28;ghostStun=Math.max(0,ghostStun-dt);
  }else $('threat').classList.remove('active');
 }
 for(const a of animatables){if(a.type==='marker'){a.obj.position.y=a.baseY+Math.sin(t*2+a.seed)*.11;a.obj.rotation.y=t*.7;}else if(a.type==='light')a.obj.intensity=a.base*(.83+.17*Math.sin(t*5+a.seed)+.07*Math.sin(t*11+a.seed));}
 renderer.render(scene,camera);}
requestAnimationFrame(animate);addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight);renderer.setPixelRatio(Math.min(devicePixelRatio,1.7));});

