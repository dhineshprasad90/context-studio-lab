export default function decorate(block) {
  const heroContent = block.querySelector('div');
  
  // Add hero background
  const heroBackground = document.createElement('div');
  heroBackground.className = 'hero-background';
  block.prepend(heroBackground);
  
  // Wrap content
  if (heroContent) {
    heroContent.className = 'hero-content';
    
    // Find and style the title
    const title = heroContent.querySelector('h1');
    if (title) {
      title.className = 'hero-title';
      const span = document.createElement('span');
      span.className = 'gradient-text';
      span.textContent = title.textContent;
      title.textContent = '';
      title.appendChild(span);
    }
    
    // Style subtitle
    const subtitle = heroContent.querySelector('p');
    if (subtitle) {
      subtitle.className = 'hero-subtitle';
    }
    
    // Style buttons
    const buttons = heroContent.querySelectorAll('.button-container');
    if (buttons.length > 0) {
      const ctaContainer = document.createElement('div');
      ctaContainer.className = 'hero-cta';
      buttons.forEach(btn => {
        ctaContainer.appendChild(btn);
      });
      heroContent.appendChild(ctaContainer);
    }
  }
  
  // Add scroll indicator
  const scrollIndicator = document.createElement('div');
  scrollIndicator.className = 'scroll-indicator';
  scrollIndicator.innerHTML = `
    <span>Scroll to explore</span>
    <div class="scroll-arrow"></div>
  `;
  block.appendChild(scrollIndicator);
}

// Made with Bob
