const nav = document.getElementById("nav");

if (nav) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  });
}

const burger = document.getElementById("burger");
const navLinks = document.getElementById("navLinks");

if (burger && navLinks) {
  burger.addEventListener("click", () => {
    burger.classList.toggle("open");
    navLinks.classList.toggle("open");
  });

  document.querySelectorAll(".nav__links a").forEach((link) => {
    link.addEventListener("click", () => {
      burger.classList.remove("open");
      navLinks.classList.remove("open");
    });
  });
}

const revealElements = document.querySelectorAll(".js-reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15
  }
);

revealElements.forEach((element) => {
  observer.observe(element);
});

const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav__links a");

window.addEventListener("scroll", () => {
  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 150;
    const sectionHeight = section.offsetHeight;

    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      currentSection = section.getAttribute("id");
    }
  });

  navItems.forEach((link) => {
    link.style.color = "";

    if (link.getAttribute("href") === `#${currentSection}`) {
      link.style.color = "#1F7A8C";
    }
  });
});

window.addEventListener("load", () => {
  document.body.style.opacity = "1";

  const viewStatsLink = document.querySelector('a[href="#github"]');
  const contributionPopup = document.getElementById('contributionPopup');
  const contributionCount = document.getElementById('contributionCount');
  const contributionYear = document.getElementById('contributionYear');
  const username = contributionPopup.getAttribute('data-username');

  if (viewStatsLink && contributionPopup) {
 
    const currentYear = new Date().getFullYear();
    contributionYear.textContent = "the last year";
    contributionCount.textContent = "...";

    
    async function fetchContributions(retryCount = 1) {
      try {
        
        const response = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}`);
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        
        
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
        
        const count = data.contributions
          .filter(c => new Date(c.date) >= oneYearAgo)
          .reduce((sum, c) => sum + c.count, 0);
        
       
        contributionCount.textContent = count;
        contributionYear.textContent = "the last year";
      } catch (error) {
        
        if (retryCount > 0) {
          
          console.warn(`Fetch failed, retrying... (${retryCount} retries left)`);
          await fetchContributions(retryCount - 1);
        } else {
          
          console.error("Failed to fetch GitHub contributions:", error);
          contributionCount.textContent = "--";
        }
      }
    }

    
    fetchContributions();

    
    viewStatsLink.addEventListener('click', function(e) {
      e.preventDefault();
     
      contributionPopup.classList.add('active');
      
      setTimeout(function() {
        contributionPopup.classList.remove('active');
      }, 3000);
      
      setTimeout(function() {
        window.location.hash = '#github';
      }, 3000);
    });
  }
});