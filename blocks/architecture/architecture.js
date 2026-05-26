/**
 * Architecture Block - Context Studio Lab
 * Decorates the architecture block with custom styling
 * @param {Element} block The architecture block element
 */
export default function decorate(block) {
  // Create section header
  const header = document.createElement('div');
  header.className = 'section-header';
  
  const title = document.createElement('h2');
  title.className = 'section-title';
  title.textContent = 'System Architecture';
  
  const subtitle = document.createElement('p');
  subtitle.className = 'section-subtitle';
  subtitle.textContent = 'Built on modern web technologies for maximum performance';
  
  header.appendChild(title);
  header.appendChild(subtitle);
  
  // Create architecture content container
  const content = document.createElement('div');
  content.className = 'architecture-content';
  
  // Create diagram section
  const diagram = document.createElement('div');
  diagram.className = 'architecture-diagram';
  
  // Create stats section
  const stats = document.createElement('div');
  stats.className = 'architecture-stats';
  
  // Process rows
  const rows = Array.from(block.children);
  let layerCount = 0;
  
  rows.forEach((row, index) => {
    const cells = Array.from(row.children);
    
    if (cells.length === 2) {
      // Layer row
      layerCount++;
      const layer = document.createElement('div');
      layer.className = 'arch-layer';
      layer.setAttribute('data-aos', 'fade-right');
      layer.setAttribute('data-aos-delay', (layerCount * 100).toString());
      
      const number = document.createElement('div');
      number.className = 'layer-number';
      number.textContent = layerCount.toString();
      
      const layerContent = document.createElement('div');
      layerContent.className = 'layer-content';
      
      const h4 = document.createElement('h4');
      h4.textContent = cells[0].textContent.trim();
      
      const p = document.createElement('p');
      p.textContent = cells[1].textContent.trim();
      
      layerContent.appendChild(h4);
      layerContent.appendChild(p);
      
      layer.appendChild(number);
      layer.appendChild(layerContent);
      
      diagram.appendChild(layer);
    } else if (cells.length === 1) {
      // Stat card
      const card = document.createElement('div');
      card.className = 'stat-card';
      card.setAttribute('data-aos', 'zoom-in');
      card.setAttribute('data-aos-delay', ((index - 5) * 100).toString());
      
      const content = cells[0].innerHTML;
      const lines = content.split('<br>').filter(line => line.trim());
      
      if (lines.length > 0) {
        const h3 = document.createElement('h3');
        h3.innerHTML = lines[0];
        card.appendChild(h3);
        
        if (lines.length > 1) {
          const ul = document.createElement('ul');
          lines.slice(1).forEach(line => {
            const li = document.createElement('li');
            li.innerHTML = line.trim();
            ul.appendChild(li);
          });
          card.appendChild(ul);
        }
      }
      
      stats.appendChild(card);
    }
  });
  
  content.appendChild(diagram);
  content.appendChild(stats);
  
  // Clear block and add new structure
  block.innerHTML = '';
  block.appendChild(header);
  block.appendChild(content);
}

// Made with Bob
