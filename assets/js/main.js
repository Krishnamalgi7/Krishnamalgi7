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
    async function fetchContributions() {
      try {
        const currentYear = new Date().getFullYear();
        const response = await fetch('https://api.github.com/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: `{
              user(login: "${username}") {
                contributionsCollection(from: "${currentYear}-01-01T00:00:00Z", to: "${currentYear}-12-31T23:59:59Z") {
                  totalContributions
                }
              }
            }`
          })
        });

        const data = await response.json();
        if (data.data?.user?.contributionsCollection?.totalContributions !== undefined) {
          const count = data.data.user.contributionsCollection.totalContributions;
          contributionCount.textContent = count;
          contributionYear.textContent = currentYear;
        }
      } catch (error) {
        // Fallback to default value if API fetch fails
      }
    }

    viewStatsLink.addEventListener('click', function(e) {
      e.preventDefault();
      fetchContributions();
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