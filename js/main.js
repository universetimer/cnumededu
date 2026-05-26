// ===== Mobile Nav Toggle =====
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.mobile-toggle');
  const nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => nav.classList.toggle('open'));
  }

  // ===== Tab switcher (curriculum) =====
  document.querySelectorAll('[data-tabs]').forEach(group => {
    const buttons = group.querySelectorAll('.tab-btn');
    const contents = group.querySelectorAll('.tab-content');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.tab;
        buttons.forEach(b => b.classList.toggle('active', b === btn));
        contents.forEach(c => c.classList.toggle('active', c.dataset.tab === target));
      });
    });
  });

  // ===== Board filter =====
  document.querySelectorAll('[data-board]').forEach(group => {
    const tabs = group.querySelectorAll('.board-tab');
    const rows = group.querySelectorAll('tbody tr');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const filter = tab.dataset.filter;
        tabs.forEach(t => t.classList.toggle('active', t === tab));
        rows.forEach(row => {
          if (filter === 'all' || row.dataset.cat === filter) {
            row.style.display = '';
          } else {
            row.style.display = 'none';
          }
        });
      });
    });
  });

  // ===== Set active nav link based on current page =====
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.main-nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) link.classList.add('active');
  });
});
