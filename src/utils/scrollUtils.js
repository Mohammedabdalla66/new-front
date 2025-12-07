/**
 * Smoothly scrolls to an element with the given ID
 * @param {string} id - The ID of the element to scroll to
 * @param {object} options - Scroll options (offset, behavior, etc.)
 */
export const scrollToSection = (id, options = {}) => {
  const {
    offset = 0, // Offset from top (useful for fixed headers)
    behavior = 'smooth', // 'smooth' or 'auto'
    block = 'start', // 'start', 'center', 'end', or 'nearest'
  } = options;

  // Remove '#' if present
  const cleanId = id.startsWith('#') ? id.slice(1) : id;

  // Find the element
  const element = document.getElementById(cleanId);

  if (element) {
    // Calculate scroll position with offset
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - offset;

    // Scroll to the element
    window.scrollTo({
      top: offsetPosition,
      behavior: behavior,
    });
  } else {
    console.warn(`Element with id "${cleanId}" not found`);
  }
};

/**
 * Handles click events for footer links
 * Determines if it's a hash link (same page) or route link (different page)
 * @param {Event} e - Click event
 * @param {string} href - The href value from the link
 * @param {function} navigate - React Router navigate function (optional)
 */
export const handleFooterLinkClick = (e, href, navigate = null) => {
  // Check if it's a hash link (starts with #)
  if (href.startsWith('#')) {
    e.preventDefault();
    const sectionId = href;
    
    // Small delay to ensure any route changes complete first
    setTimeout(() => {
      scrollToSection(sectionId, {
        offset: 80, // Adjust for fixed header height
        behavior: 'smooth',
      });
    }, 100);
  } else if (navigate && href.startsWith('/')) {
    // It's a route link, let React Router handle it
    // Don't prevent default, let Link component handle navigation
    // But we can add custom logic here if needed
  }
  // External links or other hrefs are handled normally
};
