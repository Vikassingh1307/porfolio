// Init AOS
AOS.init({ duration: 900, once: true });

// Typed.js
new Typed('#typed', {
  strings: ["Full Stack Developer", "Python Developer", "C++ Developer", "Application Developer"],
  typeSpeed: 60,
  backSpeed: 35,
  backDelay: 1200,
  loop: true
});

// Mobile burger toggle
const burger = document.getElementById('burger');
burger.addEventListener('click', () => {
  const nav = document.getElementById('nav-links');
  if (!nav) return;
  if (nav.style.display === 'flex') {
    nav.style.display = 'none';
  } else {
    nav.style.display = 'flex';
    nav.style.flexDirection = 'column';
    nav.style.position = 'absolute';
    nav.style.right = '20px';
    nav.style.top = '72px';
    nav.style.background = 'rgba(11,17,28,0.95)';
    nav.style.padding = '14px';
    nav.style.borderRadius = '10px';
    nav.style.boxShadow = '0 8px 30px rgba(2,6,23,0.6)';
  }
});

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // close mobile nav
    const nav = document.getElementById('nav-links');
    if (nav && window.innerWidth < 860) nav.style.display = 'none';
  });
});

// Fetch public repos from GitHub (shows up to 6 latest updated public repos)
async function loadRepos(username = 'Vikassingh1307') {
  try {
    const res = await fetch(`https://api.github.com/users/${username}/repos?per_page=6&sort=updated`);
    if (!res.ok) throw new Error('GitHub fetch failed');
    const repos = await res.json();
    const list = document.getElementById('reposList');
    if (!repos || repos.length === 0) {
      list.innerHTML = '';
      return;
    }
    list.innerHTML = repos.map(r => `
      <div class="repo" data-aos="fade-up">
        <div>
          <a href="${r.html_url}" target="_blank" rel="noopener">${r.name}</a>
          <p>${r.description ? r.description : ''}</p>
        </div>
        <div style="text-align:right;color:var(--muted);font-size:13px">
          <div>${r.language ? r.language : ''}</div>
          <div style="margin-top:6px">${new Date(r.updated_at).toLocaleDateString()}</div>
        </div>
      </div>
    `).join('');
  } catch (e) {
    console.error(e);
  }
}

// call loadRepos with your GitHub username
loadRepos('Vikassingh1307');
