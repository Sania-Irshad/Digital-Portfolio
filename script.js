// -----------------------------
// Mobile menu
// -----------------------------
const toggleBtn = document.querySelector(".nav-toggle");
const mobileMenu = document.querySelector(".mobile-menu");

if (toggleBtn && mobileMenu) {
  toggleBtn.addEventListener("click", () => {
    const expanded = toggleBtn.getAttribute("aria-expanded") === "true";
    toggleBtn.setAttribute("aria-expanded", String(!expanded));
    mobileMenu.hidden = expanded;
  });

  mobileMenu.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      toggleBtn.setAttribute("aria-expanded", "false");
      mobileMenu.hidden = true;
    });
  });
}

// -----------------------------
// Projects data (names only)
// -----------------------------
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

const projectDescriptions = {
  "AI-Exam-Generator": "AI-assisted workflow concept for generating exam content and question sets.",
  "Mathematical_Modeling_and_Computing": "Applied computing for mathematical modeling tasks and structured problem-solving.",
  "delish-bites-restaurant": "Responsive restaurant-style front-end project focused on clean UI and navigation.",
  "Airport-Management-System": "Management-system style project demonstrating structured programming and workflows.",
  "Hospital-System": "System-style project built with emphasis on organization and clarity.",
  "Student-performance-tracker": "Tracking and reporting style project aligned with data handling and analysis thinking."
};

const projectsGrid = document.getElementById("projectsGrid");
if (projectsGrid) {
  projects.forEach(name => {
    const card = document.createElement("div");
    card.className = "tilt card";
    card.setAttribute("data-tilt", "");

    const desc = projectDescriptions[name] || "Project showcasing practical implementation and structured development.";

    card.innerHTML = `
      <div class="card-glow" aria-hidden="true"></div>
      <div class="card-content">
        <div class="project-item">
          <div class="project-bullet" aria-hidden="true"></div>
          <div>
            <div class="project-name">${name}</div>
            <p class="project-desc">${desc}</p>
          </div>
        </div>
      </div>
    `;
    projectsGrid.appendChild(card);
  });
}

// -----------------------------
// 3D Tilt cards + glow tracking
// -----------------------------
function clamp(n, min, max){ return Math.max(min, Math.min(max, n)); }

function attachTilt(el){
  let rect = null;

  function updateRect(){
    rect = el.getBoundingClientRect();
  }
  updateRect();

  const onMove = (e) => {
    if (!rect) updateRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const px = (x / rect.width) * 100;
    const py = (y / rect.height) * 100;

    el.style.setProperty("--mx", `${px}%`);
    el.style.setProperty("--my", `${py}%`);

    const rx = ((y / rect.height) - 0.5) * -10; // rotateX
    const ry = ((x / rect.width) - 0.5) * 12;  // rotateY

    el.style.transform = `perspective(900px) rotateX(${clamp(rx, -12, 12)}deg) rotateY(${clamp(ry, -14, 14)}deg) translateY(-2px)`;
  };

  const onLeave = () => {
    el.style.transform = `perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
    el.style.setProperty("--mx", `50%`);
    el.style.setProperty("--my", `40%`);
  };

  el.addEventListener("mouseenter", updateRect);
  el.addEventListener("mousemove", onMove);
  el.addEventListener("mouseleave", onLeave);
  window.addEventListener("resize", updateRect);
}

document.querySelectorAll("[data-tilt]").forEach(attachTilt);

// -----------------------------
// "4D" Parallax blobs (subtle)
// -----------------------------
const blobs = document.querySelectorAll(".blob");
window.addEventListener("mousemove", (e) => {
  const x = (e.clientX / window.innerWidth - 0.5);
  const y = (e.clientY / window.innerHeight - 0.5);
  blobs.forEach((b, i) => {
    const depth = (i + 1) * 16;
    b.style.transform = `translate3d(${x * depth}px, ${y * depth}px, 0)`;
  });
});

// -----------------------------
// Starfield canvas background
// -----------------------------
const canvas = document.getElementById("starfield");
const ctx = canvas?.getContext("2d");

let W = 0, H = 0;
function resize(){
  if (!canvas) return;
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

const stars = [];
function initStars(){
  stars.length = 0;
  const count = Math.floor((W * H) / 14000); // density
  for (let i = 0; i < count; i++){
    stars.push({
      x: Math.random() * W,
      y: Math.random() * H,
      z: Math.random() * 0.9 + 0.1, // depth
      r: Math.random() * 1.2 + 0.2,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15
    });
  }
}
initStars();
window.addEventListener("resize", initStars);

function draw(){
  if (!ctx) return;
  ctx.clearRect(0, 0, W, H);

  for (const s of stars){
    s.x += s.vx * (1 / s.z);
    s.y += s.vy * (1 / s.z);

    if (s.x < -20) s.x = W + 20;
    if (s.x > W + 20) s.x = -20;
    if (s.y < -20) s.y = H + 20;
    if (s.y > H + 20) s.y = -20;

    ctx.beginPath();
    // Do not hardcode colors: use white with alpha for subtle effect
    ctx.fillStyle = `rgba(255,255,255,${0.25 + (1 - s.z) * 0.35})`;
    ctx.arc(s.x, s.y, s.r * (1 / s.z), 0, Math.PI * 2);
    ctx.fill();
  }
  requestAnimationFrame(draw);
}
draw();

// -----------------------------
// Demo form submit
// -----------------------------
function handleFakeSubmit(e){
  e.preventDefault();
  const note = document.getElementById("formNote");
  if (note) note.textContent = "Thanks! Your message is ready to be connected to EmailJS / Formspree for real submissions.";
  return false;
}
window.handleFakeSubmit = handleFakeSubmit;

// Footer year
const year = document.getElementById("year");
if (year) year.textContent = String(new Date().getFullYear());
