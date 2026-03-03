// Mobile Menu
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

const grid = document.getElementById("projectsGrid");

const descMap = {
  "AI-Exam-Generator": "AI-based workflow project for structured question generation.",
  "Mathematical_Modeling_and_Computing": "Applied computing for mathematical modeling and problem solving.",
  "delish-bites-restaurant": "Responsive front-end restaurant UI with clean layout and navigation.",
  "Airport-Management-System": "System-style project demonstrating structured workflows and logic.",
  "Student-performance-tracker": "Tracking & reporting project aligned with data handling and analysis.",
  "Hospital-System": "Organized system project focused on clear structure and user flows."
};

if (grid) {
  projects.forEach(name => {
    const card = document.createElement("div");
    card.className = "card tilt";
    card.setAttribute("data-tilt", "");

    const desc = descMap[name] || "Project demonstrating structured development and implementation.";

    card.innerHTML = `
      <div class="glow" aria-hidden="true"></div>
      <div class="card-body">
        <div class="project">
          <div class="bullet" aria-hidden="true"></div>
          <div>
            <div class="pname">${name}</div>
            <p class="pdesc">${desc}</p>
          </div>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

// 4D Tilt + Dynamic glow tracking
function clamp(n, min, max) { return Math.max(min, Math.min(max, n)); }

function tilt(el) {
  let rect = null;
  const update = () => rect = el.getBoundingClientRect();
  update();

  el.addEventListener("mouseenter", update);
  window.addEventListener("resize", update);

  el.addEventListener("mousemove", (e) => {
    if (!rect) update();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    el.style.setProperty("--mx", `${(x / rect.width) * 100}%`);
    el.style.setProperty("--my", `${(y / rect.height) * 100}%`);

    const rx = ((y / rect.height) - 0.5) * -10;
    const ry = ((x / rect.width) - 0.5) * 12;

    el.style.transform =
      `perspective(900px) rotateX(${clamp(rx, -12, 12)}deg) rotateY(${clamp(ry, -14, 14)}deg) translateY(-2px)`;
  });

  el.addEventListener("mouseleave", () => {
    el.style.transform = `perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
    el.style.setProperty("--mx", "50%");
    el.style.setProperty("--my", "40%");
  });
}

document.querySelectorAll("[data-tilt]").forEach(tilt);

// Parallax blobs
const blobs = document.querySelectorAll(".blob");
window.addEventListener("mousemove", (e) => {
  const x = (e.clientX / window.innerWidth - 0.5);
  const y = (e.clientY / window.innerHeight - 0.5);
  blobs.forEach((b, i) => {
    const depth = (i + 1) * 16;
    b.style.transform = `translate3d(${x * depth}px, ${y * depth}px, 0)`;
  });
});

// Animated canvas background (stars)
const canvas = document.getElementById("bg");
const ctx = canvas?.getContext("2d");
let W = 0, H = 0;

function resize() {
  if (!canvas) return;
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

const stars = [];
function initStars() {
  stars.length = 0;
  const count = Math.floor((W * H) / 14000);
  for (let i = 0; i < count; i++) {
    stars.push({
      x: Math.random() * W,
      y: Math.random() * H,
      z: Math.random() * 0.9 + 0.1,
      r: Math.random() * 1.2 + 0.2,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15
    });
  }
}
initStars();
window.addEventListener("resize", initStars);

function draw() {
  if (!ctx) return;
  ctx.clearRect(0, 0, W, H);

  for (const s of stars) {
    s.x += s.vx * (1 / s.z);
    s.y += s.vy * (1 / s.z);

    if (s.x < -20) s.x = W + 20;
    if (s.x > W + 20) s.x = -20;
    if (s.y < -20) s.y = H + 20;
    if (s.y > H + 20) s.y = -20;

    ctx.beginPath();
    ctx.fillStyle = `rgba(255,255,255,${0.25 + (1 - s.z) * 0.35})`;
    ctx.arc(s.x, s.y, s.r * (1 / s.z), 0, Math.PI * 2);
    ctx.fill();
  }
  requestAnimationFrame(draw);
}
draw();

// Demo contact form
function fakeSubmit(e) {
  e.preventDefault();
  const note = document.getElementById("note");
  if (note) note.textContent = "Thank you. This form can be connected to EmailJS / Formspree for real submissions.";
  return false;
}
window.fakeSubmit = fakeSubmit;

// Footer year
const year = document.getElementById("year");
if (year) year.textContent = String(new Date().getFullYear());
