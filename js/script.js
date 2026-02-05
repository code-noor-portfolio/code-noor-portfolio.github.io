(function(){
  const burger = document.querySelector('[data-burger]');
  const menu = document.querySelector('[data-mobile-menu]');

  if(!burger || !menu) return;

  burger.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    burger.setAttribute('aria-expanded', String(isOpen));
  });

  // Close menu on link click (mobile)
  menu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      menu.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    });
  });
})();


(function () {
  const buttons = document.querySelectorAll('.lang-btn');
  if (!buttons.length) return;

  // Detect current language from path: /fr/... or /en/...
  const path = window.location.pathname;
  const isFR = path.includes('/fr/');
  const current = isFR ? 'fr' : 'en';

  // UI active state
  buttons.forEach((btn) => {
    const active = btn.dataset.lang === current;
    btn.classList.toggle('is-active', active);
    btn.setAttribute('aria-pressed', active ? 'true' : 'false');
  });

  function switchTo(target) {
    localStorage.setItem('codeNoorLang', target);

    // Keep the same page path when switching language:
    // /en/about.html -> /fr/about.html
    // /fr/within_legal.html -> /en/within_legal.html
    let newPath = path;

    if (newPath.includes('/fr/')) newPath = newPath.replace('/fr/', '/en/');
    if (newPath.includes('/en/')) newPath = newPath.replace('/en/', '/fr/');

    // If you're not in /fr/ or /en/ (edge case), go to index
    if (!newPath.includes('/fr/') && !newPath.includes('/en/')) {
      newPath = `/${target}/index.html`;
    }

    // Ensure we switched to requested target (in case of weird path)
    newPath = newPath.replace('/fr/', `/${target}/`).replace('/en/', `/${target}/`);

    window.location.href = newPath + window.location.search + window.location.hash;
  }

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.lang;
      if (target === current) return;
      switchTo(target);
    });
  });
})();