/**
 * Demo Block - Context Studio Lab
 * Decorates the demo block with custom styling
 * @param {Element} block The demo block element
 */
export default function decorate(block) {
  // Create section header
  const header = document.createElement('div');
  header.className = 'section-header';
  
  const title = document.createElement('h2');
  title.className = 'section-title';
  title.textContent = 'See It In Action';
  
  const subtitle = document.createElement('p');
  subtitle.className = 'section-subtitle';
  subtitle.textContent = 'Experience the power of Context Studio Lab';
  
  header.appendChild(title);
  header.appendChild(subtitle);
  
  // Create demo content
  const content = document.createElement('div');
  content.className = 'demo-content';
  
  // Create video section
  const videoSection = document.createElement('div');
  videoSection.className = 'demo-video';
  videoSection.setAttribute('data-aos', 'fade-right');
  
  const videoPlaceholder = document.createElement('div');
  videoPlaceholder.className = 'video-placeholder';
  videoPlaceholder.innerHTML = `
    <div class="play-button">▶</div>
    <p>Interactive Demo Coming Soon</p>
  `;
  
  videoSection.appendChild(videoPlaceholder);
  
  // Create features section
  const featuresSection = document.createElement('div');
  featuresSection.className = 'demo-features';
  
  const rows = Array.from(block.children);
  rows.forEach((row, index) => {
    const cells = Array.from(row.children);
    if (cells.length >= 2) {
      const feature = document.createElement('div');
      feature.className = 'demo-feature';
      feature.setAttribute('data-aos', 'fade-left');
      feature.setAttribute('data-aos-delay', (index * 100).toString());
      
      const icon = document.createElement('div');
      icon.className = 'demo-icon';
      const iconMatch = cells[0].textContent.match(/([⚡🎯🔄])/);
      icon.textContent = iconMatch ? iconMatch[1] : '⚡';
      
      const text = document.createElement('div');
      text.className = 'demo-text';
      
      const h4 = document.createElement('h4');
      h4.textContent = cells[0].textContent.replace(/[⚡🎯🔄]/, '').trim();
      
      const p = document.createElement('p');
      p.textContent = cells[1].textContent.trim();
      
      text.appendChild(h4);
      text.appendChild(p);
      
      feature.appendChild(icon);
      feature.appendChild(text);
      
      featuresSection.appendChild(feature);
    }
  });
  
  content.appendChild(videoSection);
  content.appendChild(featuresSection);
  
  // Clear block and add new structure
  block.innerHTML = '';
  block.appendChild(header);
  block.appendChild(content);
}

// Made with Bob
