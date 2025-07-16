(function() {
  // List of script names to block (case-insensitive)
  const scriptsToBlock = ['ads.js', 'pagead.js', '8b1bdd48.js', '98eefed2636036c3bdb8377b11ff28fe.min.js', 'pr_advertising_ads_banner.gif', 'pr_advertising_ads_banner.png', 'testing.gif'];

  // List of CSS selectors to remove
  const selectorsToBlock = [
    '.adbox.banner_ads.adsbox',
    '.textads'
  ];

  // Function to remove elements matching the selectors
  function removeElements() {
    selectorsToBlock.forEach(selector => {
      document.querySelectorAll(selector).forEach(element => {
        element.remove();
        console.log(`Removed element: ${selector}`);
      });
    });
  }

  // Run immediately to remove existing elements
  document.addEventListener('DOMContentLoaded', removeElements);

  // Create a MutationObserver to watch for script tags and blocked elements
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        // Check for script tags
        if (node.tagName && node.tagName.toLowerCase() === 'script' && node.src) {
          const src = node.src.toLowerCase();
          if (scriptsToBlock.some(script => src.includes(script))) {
            node.remove();
            console.log(`Blocked script: ${node.src}`);
          }
        }
        // Check for elements matching blocked selectors
        if (node.nodeType === Node.ELEMENT_NODE) {
          selectorsToBlock.forEach(selector => {
            if (node.matches(selector)) {
              node.remove();
              console.log(`Removed element: ${selector}`);
            }
            node.querySelectorAll(selector).forEach(element => {
              element.remove();
              console.log(`Removed element: ${selector}`);
            });
          });
        }
      });
    });
  });

  // Start observing the document for changes
  observer.observe(document, {
    childList: true,
    subtree: true
  });
})();