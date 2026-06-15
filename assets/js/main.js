// ================= NAVBAR SHADOW =================

window.addEventListener("scroll", () => {

    const navbar = document.querySelector("nav");

    if(window.scrollY > 50){
        navbar.style.boxShadow = "0 5px 15px rgba(0,0,0,0.15)";
    }
    else{
        navbar.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";
    }

});


// ================= ACTIVE NAV LINK =================

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav ul li a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;

        if(window.scrollY >= sectionTop){
            current = section.getAttribute("id");
        }

    });

    navLinks.forEach(link => {

        link.style.color = "#222";

        if(link.getAttribute("href") === `#${current}`){
            link.style.color = "#2563eb";
        }

    });

});


// ================= FADE ANIMATION =================

const cards = document.querySelectorAll(
    ".about-card, .skill-card, .project-card"
);

const observer = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";

        }

    });

},{
    threshold:0.2
});

cards.forEach(card=>{

    card.style.opacity = "0";
    card.style.transform = "translateY(40px)";
    card.style.transition = "0.6s";

    observer.observe(card);

});


// ================= HERO BUTTON CLICK =================

const projectBtn = document.querySelector(".hero-buttons a");

projectBtn.addEventListener("click", ()=>{

    console.log("Projects button clicked");

});


// ================= CONSOLE MESSAGE =================

console.log("Portfolio Loaded Successfully");