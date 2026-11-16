// Przełącznik motywu według Lab 5: wybór użytkownika w localStorage ma pierwszeństwo przed systemem.
(function () {
  const storageKey = 'theme';
  const toggle = document.querySelector('.theme-toggle');
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)');

  function currentTheme() {
    return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
  }

  function savedTheme() {
    try {
      const value = localStorage.getItem(storageKey);
      return value === 'light' || value === 'dark' ? value : null;
    } catch (error) {
      return null;
    }
  }

  function sync() {
    if (!toggle) return;
    const isDark = currentTheme() === 'dark';
    toggle.setAttribute('aria-pressed', String(isDark));
    toggle.setAttribute('aria-label', isDark ? 'Włącz jasny motyw' : 'Włącz ciemny motyw');
  }

  function setTheme(theme, remember) {
    document.documentElement.dataset.theme = theme;
    if (remember) {
      try {
        localStorage.setItem(storageKey, theme);
      } catch (error) {
        // Motyw nadal działa w bieżącym dokumencie.
      }
    }
    sync();
  }

  toggle?.addEventListener('click', () => {
    setTheme(currentTheme() === 'dark' ? 'light' : 'dark', true);
  });

  systemDark.addEventListener('change', (event) => {
    if (savedTheme() !== null) return;
    setTheme(event.matches ? 'dark' : 'light', false);
  });

  sync();
})();
