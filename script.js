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