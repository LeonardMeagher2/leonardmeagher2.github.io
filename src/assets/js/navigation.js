/**
 * Navigation Component JavaScript
 * Handles folder tree navigation with session persistence
 */

class NavigationComponent {
  constructor() {
    this.expandableLabels = document.querySelectorAll(".nav-label.expandable");
    this.navToggle = document.querySelector(".nav-toggle");
    this.navContent = document.querySelector(".nav-content");

    this.init();
  }

  init() {
    this.setupFolderIdentifiers();
    this.loadExpandedFolders();
    this.bindEvents();
    this.autoExpandCurrentPath();
    this.updateToggleButton();
  }

  /**
   * Load expanded folders from sessionStorage
   */
  loadExpandedFolders() {
    const expandedFolders = JSON.parse(
      sessionStorage.getItem("expandedFolders") || "[]"
    );
    expandedFolders.forEach((folderPath) => {
      const navItem = document.querySelector(
        `[data-folder-path="${folderPath}"]`
      );
      if (navItem) {
        navItem.classList.add("expanded");
      }
    });
  }

  /**
   * Save expanded folders to sessionStorage
   */
  saveExpandedFolders() {
    const expandedFolders = [];
    document.querySelectorAll(".nav-item.expanded").forEach((navItem) => {
      const folderPath = navItem.getAttribute("data-folder-path");
      if (folderPath) {
        expandedFolders.push(folderPath);
      }
    });
    sessionStorage.setItem("expandedFolders", JSON.stringify(expandedFolders));
  }

  /**
   * Add unique identifiers to folders for session storage
   */
  setupFolderIdentifiers() {
    this.expandableLabels.forEach((header, index) => {
      const folder = header.parentElement;
      const folderNameElement = header.querySelector(".folder-name");
      if (folder && folderNameElement) {
        const folderName = folderNameElement.textContent || "";
        const folderPath =
          folderName.toLowerCase().replace(/\s+/g, "-") + "-" + index;
        folder.setAttribute("data-folder-path", folderPath);
      }
    });
  }

  /**
   * Bind event listeners
   */
  bindEvents() {
    // Toggle folders
    this.expandableLabels.forEach((label) => {
      label.addEventListener("click", (e) => {
        // Don't toggle if clicking on a link
        if (
          e.target &&
          e.target instanceof HTMLElement &&
          e.target.tagName === "A"
        ) {
          return;
        }

        const navItem = label.parentElement;
        if (!navItem) return;

        const isExpanded = navItem.classList.contains("expanded");

        if (isExpanded) {
          navItem.classList.remove("expanded");
        } else {
          navItem.classList.add("expanded");
        }

        // Save the current state to sessionStorage
        this.saveExpandedFolders();

        // Update toggle button
        this.updateToggleButton();
      });
    });

    // Toggle all button
    const toggleAllBtn = document.querySelector(".toggle-all-btn");
    if (toggleAllBtn) {
      toggleAllBtn.addEventListener("click", () => {
        this.toggleAllFolders();
      });
    }

    // Mobile navigation toggle
    if (this.navToggle && this.navContent) {
      this.navToggle.addEventListener("click", () => {
        if (this.navContent) {
          this.navContent.classList.toggle("active");
        }
      });
    }
  }

  /**
   * Auto-expand folders containing current page
   */
  autoExpandCurrentPath() {
    // Auto-expand folders containing current page
    const currentPageLink = document.querySelector(".page-link.current");
    if (currentPageLink) {
      let parent = currentPageLink.parentElement;
      while (parent) {
        if (parent.classList.contains("folder")) {
          parent.classList.add("expanded");
        }
        parent = parent.parentElement;
      }
      // Save auto-expanded folders to session
      this.saveExpandedFolders();
    }

    // Auto-expand folders for current section
    const currentPath = window.location.pathname;
    const pathParts = currentPath.split("/").filter((part) => part);

    // Expand folders based on current path
    this.expandableLabels.forEach((header) => {
      const folderNameElement = header.querySelector(".folder-name");
      if (!folderNameElement || !folderNameElement.textContent) return;

      const folderName = folderNameElement.textContent.toLowerCase();
      if (pathParts.some((part) => part.toLowerCase().includes(folderName))) {
        const folder = header.parentElement;
        if (folder) {
          folder.classList.add("expanded");
        }
      }
    });

    // Save auto-expanded folders to session after path-based expansion
    this.saveExpandedFolders();
  }

  /**
   * Expand all folders
   */
  expandAll() {
    const folders = document.querySelectorAll(".folder");
    folders.forEach((folder) => {
      folder.classList.add("expanded");
    });
    this.saveExpandedFolders();
  }

  /**
   * Collapse all folders
   */
  collapseAll() {
    const folders = document.querySelectorAll(".folder");
    folders.forEach((folder) => {
      folder.classList.remove("expanded");
    });
    this.saveExpandedFolders();
  }

  /**
   * Toggle all folders between expanded and collapsed
   */
  toggleAllFolders() {
    const expandableItems = document.querySelectorAll(
      ".nav-item:has(.nav-label.expandable)"
    );
    const expandedItems = document.querySelectorAll(".nav-item.expanded");

    if (expandedItems.length > 0) {
      // Collapse all
      expandedItems.forEach((item) => {
        item.classList.remove("expanded");
      });
    } else {
      // Expand all
      expandableItems.forEach((item) => {
        item.classList.add("expanded");
      });
    }

    this.saveExpandedFolders();
    this.updateToggleButton();
  }

  /**
   * Update the toggle button text based on current state
   */
  updateToggleButton() {
    const toggleBtn = document.querySelector(".toggle-all-btn");
    if (!toggleBtn) return;

    const expandedItems = document.querySelectorAll(".nav-item.expanded");

    if (expandedItems.length > 0) {
      toggleBtn.textContent = "-";
      toggleBtn.setAttribute("title", "Collapse All");
    } else {
      toggleBtn.textContent = "+";
      toggleBtn.setAttribute("title", "Expand All");
    }
  }
}

// Export for use by other components
if (typeof window !== "undefined") {
  window["NavigationComponent"] = NavigationComponent;
}
