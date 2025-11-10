/**
 * Inline script to prevent theme flash
 * Returns the script content as a string to be embedded in layout head
 */
export function getThemeScript() {
  return `
    (function() {
      try {
        const theme = localStorage.getItem('app-theme') || 'system';
        const isDark = theme === 'dark' || 
          (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
        
        if (isDark) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      } catch (e) {
        // Fallback to system preference
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
          document.documentElement.classList.add('dark');
        }
      }
    })();
  `;
}
