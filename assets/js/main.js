// ================= SMOOTH NAVBAR HIGHLIGHT =================

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;

        if(window.scrollY >= sectionTop){
            current = section.getAttribute("id");
        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if(link.getAttribute("href") === `#${current}`){
            link.classList.add("active");
        }

    });

});


// ================= REVEAL ANIMATION =================

const revealElements = document.querySelectorAll(
    ".about-card, .skill-card, .project-card"
);

const observer = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){
            entry.target.classList.add("show");
        }

    });

},{
    threshold:0.2
});

revealElements.forEach(element=>{

    element.classList.add("hidden");

    observer.observe(element);

});


// ================= SCROLL TO TOP BUTTON =================

const scrollBtn = document.createElement("button");

scrollBtn.innerHTML = "↑";

scrollBtn.id = "scrollTopBtn";

document.body.appendChild(scrollBtn);

window.addEventListener("scroll", ()=>{

    if(window.scrollY > 300){
        scrollBtn.style.display = "block";
    }
    else{
        scrollBtn.style.display = "none";
    }

});

scrollBtn.addEventListener("click", ()=>{

    window.scrollTo({
        top:0,
        behavior:"smooth"
    });

});


// ================= CONSOLE MESSAGE =================

console.log("Krishna Portfolio Loaded Successfully");