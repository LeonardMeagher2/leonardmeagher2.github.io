/**
 * Theme Component JavaScript
 * Handles theme switching and persistence
 */

class ThemeComponent {
  constructor() {
    this.currentTheme = this.getInitialTheme();
    this.init();
  }

  init() {
    this.applyTheme(this.currentTheme);
    this.bindEvents();
  }

  /**
   * Get initial theme from localStorage or system preference
   */
  getInitialTheme() {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme;
    }

    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    return systemPrefersDark ? "dark" : "light";
  }

  /**
   * Apply theme to document
   */
  applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.style.colorScheme = theme;
    this.currentTheme = theme;
    localStorage.setItem("theme", theme);
  }

  /**
   * Toggle between light and dark themes
   */
  toggleTheme() {
    const newTheme = this.currentTheme === "light" ? "dark" : "light";
    this.applyTheme(newTheme);
    return newTheme;
  }

  /**
   * Get current theme
   */
  getCurrentTheme() {
    return this.currentTheme;
  }

  /**
   * Bind event listeners
   */
  bindEvents() {
    // Listen for system theme changes
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (e) => {
        // Only update if user hasn't manually set a preference
        if (!localStorage.getItem("theme")) {
          const newTheme = e.matches ? "dark" : "light";
          this.applyTheme(newTheme);
        }
      });
  }
}

// Export for use by other components
if (typeof window !== "undefined") {
  window["ThemeComponent"] = ThemeComponent;
}
