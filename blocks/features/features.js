/**
 * Features Block - Context Studio Lab
 * Decorates the features block with custom styling
 * @param {Element} block The features block element
 */
export default function decorate(block) {
  // Create section header
  const header = document.createElement('div');
  header.className = 'section-header';
  
  const title = document.createElement('h2');
  title.className = 'section-title';
  title.textContent = 'Core Capabilities';
  
  const subtitle = document.createElement('p');
  subtitle.className = 'section-subtitle';
  subtitle.textContent = 'Enterprise-grade tools for modern EDS development';
  
  header.appendChild(title);
  header.appendChild(subtitle);
  
  // Create features grid
  const grid = document.createElement('div');
  grid.className = 'features-grid';
  
  // Process each row as a feature card
  const rows = Array.from(block.children);
  rows.forEach((row) => {
    const card = document.createElement('div');
    card.className = 'feature-card';
    
    const cells = Array.from(row.children);
    
    // First cell: icon and title
    if (cells[0]) {
      const content = cells[0].innerHTML;
      const iconMatch = content.match(/([🔥🤖⚙️⚡🎯🔄])/);
      const icon = iconMatch ? iconMatch[1] : '⚡';
      
      const iconEl = document.createElement('span');
      iconEl.className = 'feature-icon';
      iconEl.textContent = icon;
      card.appendChild(iconEl);
      
      const titleEl = document.createElement('h3');
      titleEl.className = 'feature-title';
      titleEl.textContent = cells[0].textContent.replace(icon, '').trim();
      card.appendChild(titleEl);
    }
    
    // Second cell: description
    if (cells[1]) {
      const desc = document.createElement('p');
      desc.className = 'feature-description';
      desc.textContent = cells[1].textContent;
      card.appendChild(desc);
    }
    
    // Third cell: list items
    if (cells[2]) {
      const list = document.createElement('ul');
      list.className = 'feature-list';
      
      const items = cells[2].textContent.split('\n').filter(item => item.trim());
      items.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item.trim().replace(/^[-•]\s*/, '');
        list.appendChild(li);
      });
      
      card.appendChild(list);
      
      // Add learn more link
      const link = document.createElement('a');
      link.className = 'feature-link';
      link.href = '#';
      link.textContent = 'Learn more';
      card.appendChild(link);
    }
    
    grid.appendChild(card);
  });
  
  // Clear block and add new structure
  block.innerHTML = '';
  block.appendChild(header);
  block.appendChild(grid);
}

// Made with Bob
