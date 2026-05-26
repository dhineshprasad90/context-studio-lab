/**
 * Hero Block - Context Studio Lab
 * Decorates the hero block with custom Context Studio Lab styling
 * @param {Element} block The hero block element
 */
export default function decorate(block) {
  // Add hero background
  const heroBackground = document.createElement('div');
  heroBackground.className = 'hero-background';
  block.prepend(heroBackground);

  // Get the content
  const content = block.querySelector('div');
  if (!content) return;

  content.className = 'hero-content';

  // Process the content
  const children = Array.from(content.children);
  
  // First element is the title
  if (children[0]) {
    const title = children[0].querySelector('h1, h2, h3, p');
    if (title) {
      title.className = 'hero-title';
      const span = document.createElement('span');
      span.className = 'gradient-text';
      span.textContent = title.textContent;
      title.textContent = '';
      title.appendChild(span);
    }
  }

  // Second element is the subtitle
  if (children[1]) {
    const subtitle = children[1].querySelector('p');
    if (subtitle) {
      subtitle.className = 'hero-subtitle';
    }
  }

  // Third element contains stats (if present)
  if (children[2]) {
    const statsText = children[2].textContent.trim();
    if (statsText.includes('|')) {
      const stats = statsText.split('|').map(s => s.trim());
      const statsContainer = document.createElement('div');
      statsContainer.className = 'hero-stats';
      
      stats.forEach(stat => {
        const parts = stat.split(' ');
        const value = parts[0];
        const label = parts.slice(1).join(' ');
        
        const statItem = document.createElement('div');
        statItem.className = 'stat-item';
        statItem.innerHTML = `
          <span class="stat-value">${value}</span>
          <span class="stat-label">${label}</span>
        `;
        statsContainer.appendChild(statItem);
      });
      
      children[2].replaceWith(statsContainer);
    }
  }

  // Process buttons (CTA)
  const buttons = content.querySelectorAll('.button-container');
  if (buttons.length > 0) {
    const ctaContainer = document.createElement('div');
    ctaContainer.className = 'hero-cta';
    buttons.forEach(btn => {
      ctaContainer.appendChild(btn);
    });
    content.appendChild(ctaContainer);
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
