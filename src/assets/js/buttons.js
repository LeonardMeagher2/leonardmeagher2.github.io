/**
 * Button Component JavaScript
 * Handles button interactions and initialization
 */

class ButtonComponent {
  constructor() {
    this.expandAllBtn = document.querySelector(".expand-all-btn");
    this.collapseAllBtn = document.querySelector(".collapse-all-btn");

    this.init();
  }

  init() {
    this.bindEvents();
  }

  /**
   * Bind event listeners to buttons
   */
  bindEvents() {
    // Expand All functionality
    if (this.expandAllBtn) {
      this.expandAllBtn.addEventListener("click", () => {
        this.expandAll();
      });
    }

    // Collapse All functionality
    if (this.collapseAllBtn) {
      this.collapseAllBtn.addEventListener("click", () => {
        this.collapseAll();
      });
    }
  }

  /**
   * Expand all folders
   */
  expandAll() {
    // Use navigation component if available
    if (window["NavigationComponent"] && window["navigationInstance"]) {
      window["navigationInstance"].expandAll();
    } else {
      // Fallback method
      const folders = document.querySelectorAll(".folder");
      folders.forEach((folder) => {
        folder.classList.add("expanded");
      });
    }
  }

  /**
   * Collapse all folders
   */
  collapseAll() {
    // Use navigation component if available
    if (window["NavigationComponent"] && window["navigationInstance"]) {
      window["navigationInstance"].collapseAll();
    } else {
      // Fallback method
      const folders = document.querySelectorAll(".folder");
      folders.forEach((folder) => {
        folder.classList.remove("expanded");
      });
    }
  }
}

// Export for use by other components
if (typeof window !== "undefined") {
  window["ButtonComponent"] = ButtonComponent;
}
