// Mobile menu
const toggle = document.querySelector(".nav-toggle");
const menu = document.querySelector(".mobile-menu");

if (toggle && menu) {
  toggle.addEventListener("click", () => {
    const expanded = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!expanded));
    menu.hidden = expanded;
  });

  menu.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      toggle.setAttribute("aria-expanded", "false");
      menu.hidden = true;
    });
  });
}

// Projects (names only)
const projects = [
  "OOP-Project",
  "delish-bites-restaurant",
  "Mathematical_Modeling_and_Computing",
  "AI-Exam-Generator",
  "My-Portfolio",
  "Ggoogle_Sign-in_-pg-clone-",
  "Airport-Management-System",
  "E-commerce-system-",
  "Smart-House",
  "Shopping-website",
  "Number-Guessing-Game",
  "Student-performance-tracker",
  "Hospital-System",
  "Mobile-AI-Assistant",
  "Library-Project",
  "inventory-management-system"
];

const desc = {
  "AI-Exam-Generator": "AI-assisted workflow for question generation.",
  "Mathematical_Modeling_and_Computing": "Computing work for mathematical modeling.",
  "delish-bites-restaurant": "Responsive restaurant interface project.",
  "Student-performance-tracker": "Tracking + reporting style project."
};

const grid = document.getElementById("projectsGrid");
if (grid) {
  projects.forEach(p => {
    const card = document.createElement("div");
    card.className = "project-card";
    card.innerHTML = `
      <div class="pname">${p}</div>
      <div class="pline">${desc[p] || "Structured implementation with clean presentation."}</div>
    `;
    grid.appendChild(card);
  });
}

// 4D tilt only for hero card (clean)
function clamp(n, min, max){ return Math.max(min, Math.min(max, n)); }

document.querySelectorAll("[data-tilt]").forEach(el => {
  let rect = null;
  const update = () => rect = el.getBoundingClientRect();
  update();
  window.addEventListener("resize", update);

  el.addEventListener("mousemove", (e) => {
    if (!rect) update();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    el.style.setProperty("--mx", `${(x / rect.width) * 100}%`);
    el.style.setProperty("--my", `${(y / rect.height) * 100}%`);

    const rx = ((y / rect.height) - 0.5) * -7;
    const ry = ((x / rect.width) - 0.5) * 9;
    el.style.transform = `perspective(900px) rotateX(${clamp(rx,-10,10)}deg) rotateY(${clamp(ry,-10,10)}deg)`;
  });

  el.addEventListener("mouseleave", () => {
    el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
    el.style.setProperty("--mx","50%");
    el.style.setProperty("--my","40%");
  });
});

// Subtle animated background dots
const canvas = document.getElementById("bg");
const ctx = canvas?.getContext("2d");
let W=0,H=0;

function resize(){
  if(!canvas) return;
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

const dots=[];
function init(){
  dots.length=0;
  const count = Math.floor((W*H)/18000);
  for(let i=0;i<count;i++){
    dots.push({
      x: Math.random()*W,
      y: Math.random()*H,
      r: Math.random()*1.2 + 0.2,
      vx:(Math.random()-0.5)*0.18,
      vy:(Math.random()-0.5)*0.18,
      a: Math.random()*0.35 + 0.10
    });
  }
}
init();
window.addEventListener("resize", init);

function draw(){
  if(!ctx) return;
  ctx.clearRect(0,0,W,H);

  for(const d of dots){
    d.x += d.vx;
    d.y += d.vy;

    if(d.x < -10) d.x = W + 10;
    if(d.x > W + 10) d.x = -10;
    if(d.y < -10) d.y = H + 10;
    if(d.y > H + 10) d.y = -10;

    ctx.beginPath();
    ctx.fillStyle = `rgba(255,255,255,${d.a})`;
    ctx.arc(d.x,d.y,d.r,0,Math.PI*2);
    ctx.fill();
  }
  requestAnimationFrame(draw);
}
draw();

// Demo form
function fakeSubmit(e){
  e.preventDefault();
  const note = document.getElementById("note");
  if(note) note.textContent = "Thank you. Your message draft is ready to be connected to a real form service.";
  return false;
}
window.fakeSubmit = fakeSubmit;

// Year
const year = document.getElementById("year");
if (year) year.textContent = String(new Date().getFullYear());
