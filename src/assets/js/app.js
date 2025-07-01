/**
 * Main Application JavaScript
 * Coordinates all components and initializes the application
 */

class App {
  constructor() {
    this.components = {};
    this.init();
  }

  init() {
    // Wait for DOM to be ready
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () =>
        this.initializeComponents()
      );
    } else {
      this.initializeComponents();
    }
  }

  /**
   * Initialize all components
   */
  initializeComponents() {
    try {
      // Initialize theme component first
      if (window["ThemeComponent"]) {
        this.components.theme = new window["ThemeComponent"]();
        window["themeInstance"] = this.components.theme;
      }

      // Initialize navigation component
      if (window["NavigationComponent"]) {
        this.components.navigation = new window["NavigationComponent"]();
        window["navigationInstance"] = this.components.navigation;
      }

      // Initialize button component
      if (window["ButtonComponent"]) {
        this.components.buttons = new window["ButtonComponent"]();
        window["buttonInstance"] = this.components.buttons;
      }

      console.log("All components initialized successfully");
    } catch (error) {
      console.error("Error initializing components:", error);
    }
  }

  /**
   * Get a specific component instance
   */
  getComponent(name) {
    return this.components[name];
  }

  /**
   * Get all component instances
   */
  getAllComponents() {
    return this.components;
  }
}

// Initialize the application
const app = new App();

// Make app available globally for debugging
if (typeof window !== "undefined") {
  window["app"] = app;
}
