export const toggleTheme = (): 'light' | 'dark' => {
  const current = localStorage.getItem('theme') as 'light' | 'dark' | null;
  const next = current === 'dark' ? 'light' : 'dark';
  localStorage.setItem('theme', next);
  return next;
};

export const setTheme = (mode: 'light' | 'dark') => {
  localStorage.setItem('theme', mode);
  applyTheme(mode);
};

const applyTheme = (mode: 'light' | 'dark') => {
  document.body.className = mode;
  document.documentElement.setAttribute('data-theme', mode);
};
